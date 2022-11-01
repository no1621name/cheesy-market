<template>
  <article class="product-card">
    <header class="mb-3">
      <h4 class="product-card__title">
        {{ product.name }}
      </h4>
      <Rating v-model="productRating" inline />
      <span class="ms-2">
        <ReviewsSvg class="me-1" />
        <a
          class="product-card__link_reviews"
          @click="() => {
            tabPaneActiveKey = 3;
            reviewsElement!.scrollIntoView();
          }"
        >
          {{ reviews.length }}
          Отзывов
        </a>
      </span>
    </header>
    <CRow :xs="{gutterX: 0}" class="justify-content-between">
      <CCol
        xl="4"
        lg="12"
        :class="[product.isInStock ? '' : 'product-item__img_disabled']"
      >
        <template v-if="product.isInStock && product.type === 'goods'">
          <Swiper
            :modules="[Thumbs]"
            :thumbs="{ swiper: thumbsSwiper }"
            grab-cursor
          >
            <SwiperSlide
              v-for="(image, index) in product.images"
              :key="index"
              :virtual-index="index"
              class="d-flex justify-content-center align-items-center"
            >
              <NuxtImg
                width="320"
                height="280"
                provider="cloudinary"
                :src="`/products/${image}.png`"
              />
            </SwiperSlide>
          </Swiper>
          <ClientOnly>
            <Swiper
              :modules="[Thumbs]"
              :slides-per-view="5"
              watch-slides-progress
              :breakpoints="{
                1400: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 3
                }
              }"
              @swiper="setThumbsSwiper"
            >
              <SwiperSlide
                v-for="(image, index) in product.images"
                :key="index"
                :virtual-index="index"
                class="swiper-slide-thumb d-flex align-items-center justify-content-center"
              >
                <NuxtImg
                  class="rounded-2"
                  width="64"
                  height="64"
                  provider="cloudinary"
                  :src="`/products/${image}.png`"
                />
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
        </template>
        <NuxtImg
          v-else
          width="320"
          height="280"
          provider="cloudinary"
          :src="`/products/${product.images[0]}.png`"
        />
      </CCol>
      <CCol
        xl="8"
        class="ps-xl-5 pe-0"
        :class="[
          product.isInStock ? '' :
          'd-flex flex-column justify-content-center'
        ]"
      >
        <span
          v-if="product.isInStock"
          class="in-stock "
        >
          <span class="in-stock__mark" />
          В наличии
        </span>
        <CRow
          :xl="{gutter: 0}"
          class="justify-content-between mb-3"
        >
          <CCol lg="4" class="d-felx flex-column align-items-start">
            <h6 class="product-card__price_current highlighted m-0" :class="{darkened: !product.isInStock}">
              {{ price }} руб.
              <sup
                v-if="product.discount"
                class="product-card__price_old
                  text-decoration-line-through"
              >
                {{ product.price }} руб.
              </sup>
            </h6>
            <Bonuses v-if="product.isInStock" :bonuses="product.bonuses">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis labore, est sint modi perspiciatis asperiores.
            </Bonuses>
          </CCol>
          <CCol lg="3" class="d-flex align-items-center">
            <FollowButton :id="product._id" />
          </CCol>
        </CRow>
        <CRow :xl="{gutterX: 0}" class="my-2">
          <p>
            Артикул: <span class="darkened">{{ product.vendor }}</span>
          </p>
          <p v-if="product.type === 'set'">
            Краткое описание: <span class="darkened">{{ product.shortDescription }}</span>
          </p>
          <p v-else>
            Производитель: <span class="darkened">{{ brandName }}</span>
          </p>
        </CRow>
        <CRow :xl="{gutterX: 0}" class="justify-content-between">
          <template v-if="product.isInStock">
            <CCol
              lg="4"
              class="product-card__change-amount ps-0
              d-flex align-items-center justify-content-between border rounded-2"
            >
              <CButton class="product-card__button_amount" @click="amountToAdd > 1 ? amountToAdd-- : ''">
                -
              </CButton>
              <span class="product-card__amount">
                {{ amountToAdd }}
              </span>
              <CButton class="product-card__button_amount" @click="amountToAdd < product.quantityInStock ? amountToAdd++ : ''">
                +
              </CButton>
            </CCol>
            <CCol
              xl="7"
              lg="8"
              class="pe-0"
            >
              <CButton
                class="button_success w-100"
                @click="addToCart"
                @click.once="getSpecialProducts"
              >
                В корзину
              </CButton>
            </CCol>
          </template>
          <CCol v-else xl="12">
            <CButton class="button_danger">
              Товар закончился
            </CButton>
          </CCol>
        </CRow>
        <CRow v-if="product.isInStock" :xl="{ gutterX: 0 }">
          <CCol
            xl="12"
            class="product-card__delivery
            d-flex flex-column align-items-center px-4 py-3 rounded-2 mt-3"
          >
            <span class="product-card__delivery__title w-100">
              Выберите регион для рассчета стоимости доставки:
            </span>
            <CDropdown class="product-card__select_subject w-100 mt-3">
              <CDropdownToggle
                class="product-card__select_subject__toggler d-flex
                  justify-content-between align-items-center"
                @click.once="getSubjectsList"
              >
                {{ selectedSubject || 'Выберите регион' }}
              </CDropdownToggle>
              <CDropdownMenu class="product-card__select_subject__menu w-100">
                <template v-if="subjects.length">
                  <CDropdownItem
                    v-for="subject in subjects"
                    :key="subject._id"
                    class="product-card__select_subject__item text-center rounded-2"
                    @click="() => changeSubject(subject.name, subject._id)"
                  >
                    {{ subject.name }}
                  </CDropdownItem>
                </template>
                <CDropdownItem v-else class="text-center">
                  Загрузка...
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CRow :xl="{ gutterX: 0 }">
              <CCol
                v-for="delivery in deliveryList"
                :key="delivery._id"
                xl="12"
                class="d-flex align-items-center mt-3"
              >
                <NuxtImg
                  class="d-block me-2"
                  provider="cloudinary"
                  :src="`/delivery/${delivery.logo}.png`"
                />
                <p class="d-flex w-100 justify-content-between m-0">
                  {{ delivery.name }}
                  <span class="darkened">{{ delivery.priceList[0].value }} руб.</span>
                </p>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
    <div ref="reviewsElement" class="mt-5 row">
      <CNav
        variant="tabs"
        class="p-0"
      >
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            :active="tabPaneActiveKey === 1"
            @click="() => {tabPaneActiveKey = 1}"
          >
            Описание
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            :active="tabPaneActiveKey === 2"
            @click="() => {tabPaneActiveKey = 2}"
          >
            Доставка и оплата
          </CNavLink>
        </CNavItem>
        <CNavItem v-if="haveReviews">
          <CNavLink
            href="javascript:void(0);"
            :active="tabPaneActiveKey === 3"
            @click="() => {tabPaneActiveKey = 3}"
          >
            Отзывы ({{ reviews.length }})
          </CNavLink>
        </CNavItem>
        <CTabContent>
          <CTabPane :visible="tabPaneActiveKey === 1">
            <CRow>
              <CCol
                v-if="product.type === 'goods'"
                xl="12"
              >
                <p>
                  {{ product.description }}
                </p>
              </CCol>
              <CRow v-for="(parameter, index) in product.parameters" :key="index">
                <CCol xl="3">
                  <b>{{ parameter.name }}</b>
                </CCol>
                <CCol :key="index" xl="9">
                  <p>{{ parameter.value }}</p>
                </CCol>
              </CRow>
            </CRow>
          </CTabPane>
          <CTabPane :visible="tabPaneActiveKey === 2">
            <CRow>
              <CCol class="mb-4">
                <h6 class="product-card-nav__title fw-bold">
                  Для Вашего удобства мы предусмотрели все возможные способы оплаты заказа:
                </h6>
              </CCol>
              <CRow v-for="i in 5" :key="i">
                <CCol xl="3">
                  <b>Example</b>
                </CCol>
                <CCol :key="i" xl="9">
                  <p class="fw-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat qui eligendi deleniti modi, fuga, vel itaque minima commodi,
                    dicta exercitationem dolorem excepturi autem quo! Iusto
                    eligendi cupiditate rem autem consectetur.
                  </p>
                </CCol>
              </CRow>
            </CRow>
          </CTabPane>
          <CTabPane v-if="haveReviews" :visible="tabPaneActiveKey === 3">
            <CRow :lg="{ gutterY: 4 }">
              <!--
                TODO
              <template v-if="isAuth">
                <CCol xs="12" class="mb-3">
                  <ReviewForm
                    :product-id="product._id"
                    @added="async (rating) => {
                      productRating = rating;
                      await getReviews();
                    }"
                  />
                </CCol>
              </template> -->
              <template v-if="reviews.length">
                <Review
                  v-for="review in reviews"
                  :key="review._id"
                  :review="review"
                />
              </template>
              <CCol v-else class="d-flex justify-content-center">
                <NotFound />
              </CCol>
            </CRow>
          </CTabPane>
        </CTabContent>
      </CNav>
    </div>
    <ProductCardModal
      :show="isVisibleModal"
      :special-products="specialProducts"
      :name="product.name"
      :src="product.images[0]"
      :bonuses="product.bonuses"
      :amount-to-add="amountToAdd"
      @close="toggleModal"
    />
  </article>
</template>

<script lang="ts" setup>
import ReviewsSvg from '@/assets/images/icons/reviews.svg?component';

import { Thumbs, Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import Rating from '@/components/UI/Rating.vue';
import NotFound from '@/components/UI/NotFound.vue';
import FollowButton from '@/components/UI/FollowButton.vue';
// import ReviewForm from '@/components/Reviews/Form.vue';
import Review from '@/components/Reviews/Item.vue';
import Bonuses from './Bonuses.vue';
import ProductCardModal from './Modal.vue';

import { useViewedStore } from '@/store/viewed';
import { useCartStore } from '@/store/cart';
// import { useUserStore } from '@/store/user';
// import { storeToRefs } from 'pinia';

const props = defineProps<{ product: Product}>();

const { product } = toRefs(props);

const viewedStore = useViewedStore();
// const userStore = useUserStore();
const { addProduct } = useCartStore();

// const { isAuth } = storeToRefs(userStore);

const thumbsSwiper = ref<SwiperInstance>();

const brandName = ref('');
const selectedSubject = ref('');
const tabPaneActiveKey = ref(1);
const amountToAdd = ref<number>(1);
const productRating = ref(product.value.rating);
const price = useGetPriceWithDiscount(product.value.price,  product.value.discount);
const { bool: isVisibleModal, toggleBool: toggleModal } = useGetToggledBoolean();
const reviewsElement = ref<any>(null);

const category = ref<number[]>([]);
const specialProducts = ref<ShortProduct[]>([]);
const reviews = ref<Review[]>([]);
const subjects = ref<Subject[]>([]);
const deliveryList = ref<Delivery[]>([]);

const haveReviews = ref(false);

onMounted(() => {
  window.scroll({
    top: 0,
  });
});

viewedStore.$subscribe((_, { viewedList }) => {
  if (Array.isArray(viewedList) && viewedList[0] !== product.value._id) {
    viewedStore.viewProduct(product.value._id);
  }
});

if (product.value?.type === 'goods' && product.value.brand_id && product.value.categories) {
  const brandId = product.value.brand_id;
  category.value = product.value.categories;

  const brandRequest = await useApiFetch<ServerResponseI<'name', string>>(`/products/brands/${brandId}`);
  brandName.value = useValidateResponse(brandRequest)?.data.name || '';
}

const setThumbsSwiper = (swiper: SwiperInstance) => {
  thumbsSwiper.value = swiper;
};

const getSpecialProducts = async () => {
  const specialProductsResponse = await useApiAsyncData<ServerResponseI<'products', ShortProduct[]>>(
    `specialProductsFor${product.value._id}`, '/products', {
      params: {
        category: [1, 2],
        discount: 1
      }
    }
  );

  specialProducts.value = useValidateResponse(specialProductsResponse)?.data.products || [];
};

const getReviews = async () => {
  await $fetchApi<ServerResponseI<'reviews', Review[]>>(
    '/reviews', {
      params: {
        id: product.value._id
      },
      async onResponse({ response }) {
        reviews.value = response._data.data.reviews;
        haveReviews.value = response._data.data.reviews.length;
      }
    }
  );
};

await getReviews();

const getSubjectsList = async () => {
  const subjectsResponse = await useApiAsyncData<ServerResponseI<'subjects', Subject[]>>(`subjectsFor${product.value._id}`, '/subjects');

  subjects.value = useValidateResponse(subjectsResponse)?.data.subjects || [];
};

const changeSubject = async (name: string, id: number) => {
  selectedSubject.value = name;

  await $fetchApi<ServerResponseI<'priceList', Delivery[]>>('/orders/delivery/price-list', {
    params: {
      subject: id,
    },
    async onResponse({ response }) {
      deliveryList.value = response._data.data.priceList;
    }
  });
};

const addToCart = async () => {
  toggleModal();
  for (let i = 1; i <= amountToAdd.value; i++) {
    await addProduct(product.value._id);
  }
};
</script>

<style lang="scss">
.swiper-thumbs .swiper-wrapper{
  justify-content: space-evenly;
}
</style>

<style lang="scss" scoped>
.product-card{
  @include CirceRounded16();
  margin: 0;
  header{
    .product-card__title{
      @include Heading1();
      font-weight: 700;
      color: $brown;
    }
    .product-card__link_reviews{
      color: $brown;
      cursor: pointer;
    }
  }
  .swiper-slide-thumb{
    img {
      cursor: pointer;
      border: 1px solid $lightGrey;
      transition: .3s all linear;
    }
    &.swiper-slide-thumb-active img{
      border: 1px solid rgba($color: $darkGrey, $alpha: .3);
    }
  }
  .product-item__img_disabled{
    filter: grayscale(1);
    position: relative;
    &::after{
      content: 'Распродан';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #B4B4B4;
      color: $white;
      border-radius: 8px;
      font-size: 1.125rem;
      line-height: 1.75rem;
      padding: 10px 20px;
      margin: 0 auto;
    }
  }
  .product-card__price_current{
    @include Heading1();
    .product-card__price_old {
      font-size: .875rem;
      color: $darkGrey;
    }
  }
  .product-card__button_favourite{
    color: $darkGrey;
    transition: color .2s linear;
    &:hover {
      color: $darkGrey;
    }
    > svg{
      margin-right: 6px;
    }
  }
  .product-card__button_amount, .product-card__amount{
    font-size: 1.1rem;
  }
  .product-card__button_amount{
    padding: 6px 15px;
  }
  .product-card__change-amount{
    max-width: 140px;
  }
  .product-card__delivery{
    background: #FCF7E3;
    border: 1px solid #F2EFE2;
    .product-card__delivery__title{
      font-weight: 700;
    }
    .product-card__select_subject__toggler{
      border: 1px solid rgba(128, 128, 128, 0.2) !important;
      &::after{
        display: block !important;
      }
    }
    .product-card__select_subject__menu {
      padding: 0;
      .product-card__select_subject__item{
        font-size: 1.1rem;
        &:hover{
          color: $orange;
        }
      }
    }
  }
  .nav.nav-tabs{
    .nav-item .nav-link{
      font-size: 1.125rem;
      border-radius: 0;
      color: $brown !important;
      padding: 16px 40px;
      box-sizing: border-box;
      border: 0 !important;
      border-bottom: 2px solid $white !important;
      transition: all .25s linear;
      &.active{
        border-bottom-color: $orange !important;
        color: $orange !important;
      }
      &:not(.active):hover{
        border-bottom-color: $darkGrey !important;
      }
    }
    .tab-content{
      padding: 20px 0;
      width: 100%;
      .tab-pane{
        width: 100%;
      }
    }
    .product-card-nav__title{
      color: $brown;
      font-size: 1.125rem;
      padding-left: 12px;
    }
  }
}
</style>

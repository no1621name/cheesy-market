<template>
  <div class="article">
    <ClientOnly>
      <template #default>
        <div
          ref="articleContent"
          class="article__content"
          v-html="articleLayout"
        />
      </template>
      <template #placeholder>
        <div
          v-c-placeholder="{animation: 'glow'}"
          aria-hidden="true"
          class="article__content d-flex flex-column"
        >
          <CPlaceholder :xs="4" style="height: 25px" />
          <CPlaceholder
            :xs="8"
            class="mt-4"
            color="secondary"
          />
          <CPlaceholder
            :xs="6"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="12"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="5"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="3"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="11"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="12"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="5"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="8"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="11"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="6"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="12"
            style="height: 300px"
            class="mt-4"
            color="secondary"
          />
          <CPlaceholder
            :xs="12"
            class="mt-4"
            color="secondary"
          />
          <CPlaceholder
            :xs="5"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="8"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="6"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="11"
            class="mt-2"
            color="secondary"
          />
          <CPlaceholder
            :xs="4"
            class="mt-2"
            color="secondary"
          />
        </div>
      </template>
    </ClientOnly>
    <Modal
      :show="isVisibleModal"
      @close="toggleIsVisibleModal"
    >
      <CCol :lg="3">
        <header class="d-flex justify-content-between align-items-center">
          <h6 class="m-0 brown fs-5 fw-bold">
            Выберите производителя
          </h6>
          <CCloseButton @click="toggleIsVisibleModal" />
        </header>
        <article>
          <CRow :lg="{gutter: 2}" class="justify-content-center mt-3">
            <Spinner v-if="!productsNotFound && !productsList.length" medium />
            <CCol v-else-if="productsNotFound" class="d-flex justify-content-center">
              <p class="text-danger fw-bold">
                Продуктов не нашлось... Попробуйте позже...
              </p>
            </CCol>
            <CCol
              v-for="product in productsList"
              v-else
              :key="product._id"
              :lg="12"
            >
              <ProductItem
                :product="product"
                :rating="true"
                class="article-modal__item"
                @add="() => {
                  toggleIsVisibleModal();
                  addProduct(product._id);
                }"
                @error="addServerError"
              />
            </CCol>
          </CRow>
        </article>
      </CCol>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import ShoppingCart2Svg from '@/assets/images/icons/shopping-cart-2.svg?raw';
import DropdownArrow1Svg from '@/assets/images/icons/dropdown-arrow-1.svg?raw';

import Modal from '@/components/UI/Modal.vue';
import Spinner from '@/components/UI/Spinner.vue';
import ProductItem from '@/components/Products/Item.vue';

import parseArticle from 'cheesy-api-article-parser';
import { useBreadCrumbsStore } from '@/store/breadCrumbs';
import { useCartStore } from '@/store/cart';
import { useNotifierStore } from '@/store/notifier';

const props = defineProps<{
  article: Article,
  categoryName: 'Рецепты' | 'Статьи про сыроделие',
  href: '/recipes' | '/blogs'
}>();

const { addBreadCrumb } = useBreadCrumbsStore();
const { addProduct } = useCartStore();
const { addServerError } = useNotifierStore();

const { categoryName, href, article } = toRefs(props);
addBreadCrumb({ name: categoryName.value, href: href.value });
addBreadCrumb({ name: article.value.title, href: useRoute().fullPath });

const { bool: isVisibleModal, toggleBool: toggleIsVisibleModal } = useGetToggledBoolean();
const articleContent = ref<HTMLElement>();
const articleLayout = ref('');
const productsNotFound = ref(false);
const productsList = ref<ShortProduct[]>([]);

watch<HTMLElement | undefined>(articleContent, (newArticleContent: HTMLElement | undefined) => {
  if (newArticleContent) {
    newArticleContent.addEventListener('click', async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.classList.contains('article__product-list__item__button')) {
        toggleIsVisibleModal();
        getProducts(Number(target.dataset.categoryId));
      }
    });
  }
});

onMounted(() => {
  articleLayout.value = parseArticle(
    article.value,
    {
      images: {
        src: `${useRuntimeConfig().public.cloudinaryUrl}${href.value}/content`,
        extension: '.png'
      },
      addProductButtonContent: `${ShoppingCart2Svg} В корзину`,
      accordionsButtonsContent: [`Рекомендации по рецептам: ${DropdownArrow1Svg}`]
    }
  );
});

async function getProducts(categoryId: number) {
  productsNotFound.value = false;
  productsList.value = [];

  await $fetchApi<ServerResponseI<'products', ShortProduct[]>>('/products', {
    query: {
      category: categoryId || 1,
      limit: 3,
    },
    async onResponse({ response }) {
      if (!response._data.data.products.length) {
        productsNotFound.value = true;
      }
      productsList.value = response._data.data.products;
    }
  });
}

</script>

<style lang="scss">
.article {
  .article__content {
    @include CirceRounded16();
    h2, h3{
      color: $brown;
      @include Heading2();
    }
    .article__images-list{
      display: flex;
      justify-content: space-evenly;
      margin: 14px 0 30px 0;
    }
    .article__product-list__container{
      border: 1px solid #F8EABF;
      border-radius: 5px;
      background: #FFF5D6;
      margin: 30px 0;
      padding: 24px 30px;
      h3{
        font-size: 1rem;
        margin-bottom: 16px;
      }
      .article__product-list{
        list-style-type: none;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        .article__product-list__item{
          padding: 8px 0;
          height: 60px;
          border-top: 1px dashed #E7DFC6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .article__product-list__item__button{
            @include Button(0, 8px);
            svg{
              margin-right: 10px;
            }
            &:hover{
              background: $orange;
              color: $white !important;
            }
          }
        }
      }
    }
    .article__numbered-list{
      margin: 0;
      padding: 0;
      list-style-type: none;
      counter-reset: li;
      .article__numbered-list__item{
        counter-increment: li;
        padding: 30px 40px 30px 70px;
        position: relative;
        &::before{
          content: counter(li);
          @include CirceRounded16();
          position: absolute;
          left: 5px;
          font-weight: 700;
          font-size: 44px;
          line-height: 24px;
          color: $orange;
        }
        &:nth-child(-n+9)::before{
          content: "0"counter(li);
        }
      }
    }
    .article__product-list__container + .article__product-list__container{
      margin-top: 0;
    }
    .article__accordion{
      button{
        font-size: 1.25rem;
        color: $brown;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 20px 0;
        border: 0;
        border-top: 1px solid $lightGrey;
      }
    }
  }
}
 .article-modal__item{
  min-height: auto !important;
  flex-direction: row;
  a{
    display: grid;
    align-self: center;
  }
  .vue-star-rating {
    margin-top: 8px;
  }
}
</style>

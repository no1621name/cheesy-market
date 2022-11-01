<template>
  <Card
    class="product-item"
    :url="productUrl"
    :img="false"
  >
    <template #beforeMain>
      <slot name="beforeMain" />
    </template>
    <template #img>
      <template v-if="product.isInStock">
        <Swiper
          v-if="slider && product.images.length > 1"
          :pagination="{ clickable: true }"
          :modules="[ Pagination ]"
          class="w-100"
        >
          <SwiperSlide
            v-for="(image, index) in product.images"
            :key="index"
            :virtual-index="index"
          >
            <NuxtLink
              :to="productUrl"
              class="text-decoration-none"
            >
              <NuxtImg
                class="product-item__img"
                provider="cloudinary"
                :src="`/products/${image}.png`"
              />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <NuxtLink
          v-else
          :to="productUrl"
          class="text-decoration-none"
        >
          <NuxtImg
            class="product-item__img"
            provider="cloudinary"
            :src="`/products/${product.images[0] || 'placeholder'}.png`"
          />
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink
          :to="productUrl"
          class="text-decoration-none"
        >
          <NuxtImg
            class="product-item__img"
            provider="cloudinary"
            :src="`/products/${product.images[0] || 'placeholder'}.png`"
          />
        </NuxtLink>
      </template>
    </template>
    <template v-if="product.isInStock">
      <CCardTitle class="product-item__title">
        <NuxtLink
          :to="productUrl"
          class="text-decoration-none"
        >
          {{ product.name }}
        </NuxtLink>
      </CCardTitle>
      <div class="d-flex align-items-center justify-content-between flex-wrap">
        <p class="d-flex flex-column align-items-start m-0">
          <span class="product-item__current-price">{{ price }}₽/ <small>1 шт.</small></span>
          <span v-if="product.discount" class="product-item__old-price">{{ product.price }}₽</span>
        </p>
        <CButton
          v-if="addButton"
          class="button_success py-2 px-3"
          @click="addProduct"
        >
          Добаить
        </CButton>
      </div>
      <Rating
        v-if="rating"
        v-model="product.rating"
        :inline="false"
      />
    </template>
    <template v-else>
      <CCardTitle class="product-item__title">
        <NuxtLink
          :to="productUrl"
          class="text-decoration-none"
        >
          {{ product.name }}
        </NuxtLink>
      </CCardTitle>
      <NuxtLink
        :to="productUrl"
        class="btn button_disabled"
      >
        Подробнее
      </NuxtLink>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import Rating from '@/components/UI/Rating.vue';
import Card from '@/components/UI/Card.vue';

import { Pagination } from 'swiper';

const props = withDefaults(defineProps<{
  product: ShortProduct,
  slider?: boolean,
  rating?: boolean,
  addButton?: boolean
}>(), {
  slider: false,
  rating: false,
  addButton: true
});

const emit = defineEmits(['add', 'error']);

const { product } = toRefs(props);

const productUrl = `/products/${product.value._id}`;
const price = useGetPriceWithDiscount(product.value.price, product.value.discount);

const addProduct = async () => {
  try {
    emit('add', product.value._id);
  } catch {
    emit('error');
  }
};

</script>

<style lang="scss">
.product-item .card-body {
  padding: 15px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<style lang="scss" scoped>
.product-item{
  min-height: 270px;
  height: 100%;
  border: 1px solid var(--cui-gray-200);
  @include CirceRounded16();
  .product-item__img{
    width: 100%;
    cursor: pointer;
  }
  .product-item__title{
    cursor: pointer;
    line-height: 1.25rem;
    font-size: 1.25rem;
  }
  .product-item__current-price{
    line-height: 1.25rem;
  }
  .product-item__old-price{
    line-height: 1rem;
    font-size: .8125rem;
    color: $red;
    text-decoration: line-through;
  }
}
</style>

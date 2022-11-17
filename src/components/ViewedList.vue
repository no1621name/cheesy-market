<template>
  <div class="overflow-hidden viewed-list">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="title">
        Просмотренные товары:
      </h2>
      <div class="d-flex justify-conetnt-between align-items-center">
        <button ref="prev" class="viewed-list__naviagation-arrow">
          <ArrowSvg />
        </button>
        <button ref="next" class="viewed-list__naviagation-arrow">
          <ArrowSvg />
        </button>
      </div>
    </div>
    <ClientOnly>
      <Spinner
        v-if="pending"
        class="d-block mx-auto"
        medium
      />
      <div v-else-if="!viewedProducts.length || viewedProducts.length !== viewedIds.length">
        <Info>
          <h3>Вы ещё не просмотрели ни одного продукта</h3>
        </Info>
      </div>
      <Swiper
        v-else
        :modules="[Navigation]"
        :space-between="20"
        :slides-per-view="5"
        :auto-height="true"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
        :breakpoints="{
          320: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          992: {
            slidesPerView: 4
          },
          1024: {
            slidesPerView: 5
          },
        }"
      >
        <SwiperSlide
          v-for="product in viewedProducts"
          :key="product._id"
          :virtual-index="product._id"
          class="h-100"
        >
          <ProductItem
            :product="product"
            @add="(id) => addProduct(id)"
          />
        </SwiperSlide>
      </Swiper>
      <template #fallback>
        <Spinner class="d-block mx-auto" medium />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import ArrowSvg from '@/assets/images/icons/dropdown-arrow-4.svg?component';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useViewedStore } from '@/store/viewed';
import { useCartStore } from '@/store/cart';
import { storeToRefs } from 'pinia';
import Info from '@/components/UI/Info.vue';
import ProductItem from '@/components/Products/Item.vue';
import Spinner from '@/components/UI/Spinner.vue';

const viewedStore = useViewedStore();
const { addProduct } = useCartStore();
const { viewedList: viewedIds } = storeToRefs(viewedStore);
const prev = ref(null);
const next = ref(null);

const viewedProducts = ref<ShortProduct[]>([]);
const pending = ref(true);

onMounted(async () => {
  await $fetchApi<ServerResponseI<'products', ShortProduct[]>>('/products', {
    query: {
      ids: viewedIds.value || [],
      short: 1,
    },
    async onResponse({ response }) {
      if (response.ok) {
        viewedProducts.value = response._data.data.products;
        pending.value = false;
      }
    }
  });
});
</script>

<style lang="scss">
.viewed-list {
  .swiper-wrapper{
    height: 340px;
  }
  .viewed-list__naviagation-arrow{
    display: flex;
    align-items: center;
    border: 0;
    &.swiper-button-disabled{
      opacity: .5;
    }
    &:first-of-type{
      transform: rotate(180deg);
    }
  }
}
</style>

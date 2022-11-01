<template>
  <Modal :show="show" @close="$emit('close')">
    <CCol
      lg="6"
      xxl="4"
      class="product-modal-content"
    >
      <header class="d-flex justify-content-between align-items-center">
        <h6 class="product-modal__title m-0 brown">
          Добавлено в корзину
        </h6>
        <CCloseButton @click="$emit('close')" />
      </header>
      <article
        class="d-flex align-items-center
          justify-content-between  w-100 mt-3"
      >
        <NuxtImg
          width="96"
          height="96"
          provider="cloudinary"
          class="product-item__img"
          :src="`/products/${src}.png`"
        />
        <div class="d-flex flex-column align-items-start w-75">
          <h6 class="d-flex justify-content-between align-items-start w-100">
            {{ name }} <span class="darkened">{{ amountToAdd }} шт.</span>
          </h6>
          <Bonuses :bonuses="bonuses">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Bonuses>
        </div>
      </article>
      <CRow class=" mt-3" :xl="{gutterY: 2}">
        <CCol xxl="6" xl="12">
          <CButton class="product-modal__button_skip" @click="$emit('close')">
            Продолжить покупки
          </CButton>
        </CCol>
        <CCol xxl="6" xl="12">
          <NuxtLink to="/" class="product-modal__button_cart">
            Просмотр корзины
          </NuxtLink>
        </CCol>
      </CRow>
      <h6 class="product-modal__title_sub mt-3 mb-2">
        Специальные предложения
      </h6>
      <Swiper
        v-if="specialProducts.length"
        :modules="[Navigation]"
        :space-between="5"
        :breakpoints="{
          768: {
            slidesPerView: 2
          },
          1600: {
            slidesPerView: 3
          },
        }"
        navigation
        grab-cursor
        class="w-100"
      >
        <SwiperSlide
          v-for="specialProduct in specialProducts"
          :key="specialProduct._id"
          :virtual-index="specialProduct._id"
          class="h-auto"
        >
          <ProductItem
            :product="specialProduct"
            :rating="true"
            :add-button="false"
            class="h-100"
          />
        </SwiperSlide>
      </Swiper>
      <CCol v-else class="d-flex justify-content-center">
        <Spinner medium />
      </CCol>
    </CCol>
  </Modal>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';
import Modal from '@/components/UI/Modal.vue';
import Spinner from '@/components/UI/Spinner.vue';
import Bonuses from './Bonuses.vue';
import ProductItem from '@/components/Products/Item.vue';

defineProps<{
  show: boolean,
  specialProducts: ShortProduct[],
  amountToAdd: number,
  name: string,
  src: string,
  bonuses: number
}>();

defineEmits(['close']);
</script>

<style lang="scss" scoped>
.product-modal-content {
  .product-modal__title{
    @include CirceRounded16();
    font-size: 1.25rem;
  }
  .product-modal__title_sub {
    @include CirceRounded16();
    font-weight: 700;
  }
  .product-modal__button_skip, .product-modal__button_cart {
    @include Button(1);
    padding-right: 16px;
    box-sizing: border-box;
    padding-left: 16px;
  }
  .product-modal__button_skip {
    border: 1px solid $white !important;
    background: $white;
    color: $brown;
    &:hover{
      border: 1px solid $orange !important;
      background: $white;
      color: $brown;
    }
  }
}
</style>

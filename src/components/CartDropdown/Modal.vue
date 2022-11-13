<template>
  <CContainer sm class="cart-modal">
    <CRow v-if="list.length" :xs="{gutterX: 0, gutterY: 3}">
      <CCol sm="12">
        <h5 class="cart-modal__title">
          Корзина ({{ amount }})
        </h5>
      </CCol>
      <CCol sm="12">
        <div class="cart-modal__list">
          <CartDropdownItem
            v-for="product in list"
            :key="product._id"
            :product="product"
            @plus="changeProductCount(product._id, 1)"
            @minus="changeProductCount(product._id, -1)"
            @remove="removeProduct(product._id)"
          />
        </div>
      </CCol>
      <CCol sm="12">
        <div class="cart-modal__additional-info">
          <p>
            Товаров в корзине:
            <span>{{ amount }} шт.</span>
          </p>
          <p>
            Общая стоимость:
            <span>{{ cost }} руб.</span>
          </p>
        </div>
      </CCol>
      <CCol sm="12">
        <NuxtLink
          to="/order"
          class="cart-modal__button_order"
          @click="() => saveUserData(false)"
        >
          Оформить заказ
        </NuxtLink>
      </CCol>
    </CRow>
    <CRow v-else>
      <CCol sm="12">
        <h5 class="cart-modal__title">
          Корзина пуста
        </h5>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script lang="ts" setup>
import CartDropdownItem from './Item.vue';

import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';

defineProps<{
  amount: number,
  cost: number,
  list: WithAmount<ShortProduct>[],
}>();

const cartStore = useCartStore();
const userStore = useUserStore();

const { saveUserData } = userStore;
const { removeProduct, changeProductCount } = cartStore;
</script>

<style lang="scss" scoped>
.cart-modal{
  position: absolute;
  top: 100%;
  right: 0;
  background: $white;
  z-index: 3;
  width: 460px;
  padding: 30px;
  border-radius: 6px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  @include CirceRounded16();
  .col-sm-12:first-child{
    margin-top: 0;
  }
  .cart-modal__title{
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 1.3125rem;
    color: $brown;
    margin: 0;
  }
  .cart-modal__list{
    max-height: 284px;
    overflow: auto;
    .cart-modal__product-link{
      text-decoration: none;
      .cart-modal__item:not(:last-of-type){
        border-bottom: 1px solid rgba(128, 128, 128, 0.3);
      }
    }
  }
  .cart-modal__additional-info{
    font-weight: 700;
    font-size: 1.15rem;
    line-height: 2rem;
    p{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .cart-modal__button_order{
    @include Button();
  }
}

@media (max-width: 600px){
  .cart-modal{
    width: 90vw;
    padding: 15px;
    // right: -55px;
  }
}

// @media (max-width: 525px){
//   .cart-modal{
//     // right: -10px;
//   }
// }
</style>

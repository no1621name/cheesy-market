<template>
  <article
    v-click-outside="() => { isVisibleCart = false; }"
    class="cart-dropdown"
  >
    <header class="cart-dropdown__header">
      <p class="cart-dropdown__title">
        Ваша корзина <br>
        <span class="cart-dropdown__total-price highlighted fw-bold">{{ cost }} руб.</span>
      </p>
      <CButton class="cart-dropdown__button_toggle" @click="toggleCart">
        <ShoppingCartSvg />
        <span class="cart-dropdown__amount">{{ amount }}</span>
      </CButton>
    </header>
    <Transition name="main-transition">
      <CartDropdownModal
        v-if="isVisibleCart"
        :cost="cost"
        :amount="amount"
        :list="cartList"
      />
    </Transition>
  </article>
</template>

<script lang="ts" setup>
import ShoppingCartSvg from '@/assets/images/icons/shopping-cart.svg?component';

import CartDropdownModal from './Modal.vue';

import { useCartStore } from '@/store/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();

const { cost, amount, cartList } = storeToRefs(cartStore);
const { bool: isVisibleCart, toggleBool: toggleCart } = useGetToggledBoolean();
</script>

<style lang="scss" scoped>
.cart-dropdown{
  position: relative;
  .cart-dropdown__header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .cart-dropdown__title{
      @include Roboto14();
      text-align: right;
      margin-bottom: 0;
      margin-right: 8px;
    }
    .cart-dropdown__button_toggle{
      border: none;
      position: relative;
      .cart-dropdown__amount{
        position: absolute;
        top: 2px;
        right: 4px;
        background: $orange;
        color: $white;
        @include CirceRounded16();
        font-size: 0.75rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 16px;
        padding: 0 5px;
      }
    }
  }
}

@media (max-width: 1023px) {
  .cart-dropdown{
    .cart-dropdown__header{
      border-left: none;
      .cart-dropdown__button_toggle{
        .cart-dropdown__amount{
          top: 6px;
          right: 12px;
        }
        svg{
          transform: scale(.6);
        }
      }
      .cart-dropdown__title{
        display: none !important;
      }
    }
  }
}
</style>

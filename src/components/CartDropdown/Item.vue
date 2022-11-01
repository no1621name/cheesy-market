<template>
  <CCard class="cart-dropdown-item border-0">
    <CRow
      class="cart-dropdown-item__wrapper justify-content-between"
      :xs="{gutter: 0}"
    >
      <CCol xs="3">
        <NuxtLink :to="`/products/${product._id}`" class="text-decoration-none">
          <NuxtImg
            provider="cloudinary"
            class="cart-dropdown-item__img"
            :src="`/products/${product.images[0] || 'placeholder'}.png`"
          />
        </NuxtLink>
      </CCol>
      <CCol
        class="cart-dropdown-item__content d-flex
        justify-content-between flex-column"
        xs="8"
      >
        <div
          class="cart-dropdown-item__heading d-flex
          justify-content-between align-items-center"
        >
          <NuxtLink :to="`/products/${product._id}`" class="text-decoration-none">
            <h6 class="cart-dropdown-item__title m-0">
              {{ product.name }}
            </h6>
          </NuxtLink>
          <CCloseButton class="ms-4" @click="$emit('remove')" />
        </div>
        <div
          class="cart-dropdown-item__bottom d-flex
          justify-content-between align-items-center"
        >
          <Counter
            :value="product.amount"
            :max="product.quantityInStock"
            @plus="$emit('plus')"
            @minus="$emit('minus')"
          />
          <span class="cart-dropdown-item__price">
            {{ price }} руб.
          </span>
        </div>
      </CCol>
    </CRow>
  </CCard>
</template>

<script lang="ts" setup>
import Counter from './Counter.vue';

const props = defineProps<{
  product: WithAmount<ShortProduct>,
}>();

const { product } = toRefs(props);
const price = useGetPriceWithDiscount(product.value.price, product.value.discount);
</script>

<style lang="scss" scoped>
.cart-dropdown-item{
  padding: 10px 0;
  .cart-dropdown-item__wrapper{
    .cart-dropdown-item__img{
      cursor: pointer;
      width: 90px;
      height: 90px;
      display: block;
      border: 1px solid rgba(128, 128, 128, 0.3);
      border-radius: 6px;
      margin-right: 15px;
    }
    .cart-dropdown-item__content{
      .cart-dropdown-item__heading{
        .cart-dropdown-item__title{
          cursor: pointer;
          @include CirceRounded16();
        }

      }
      .cart-dropdown-item__bottom{
        .cart-dropdown-item__price{
          @include CirceRounded16();
          font-weight: 700;
          line-height: 2.25rem;
        }
      }
    }
  }
}

@media (max-width: 767px){
  .cart-dropdown-item .cart-dropdown-item__wrapper{
    flex-direction: column;
    align-items: center;
    .cart-dropdown-item__content{
      margin-top: 10px;
      max-width: 100%;
    }
  }
}
</style>

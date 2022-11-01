<template>
  <CCard class="search__item">
    <NuxtLink :to="`/products/${product._id}`" class="text-decoration-none">
      <CRow :xs="{gutterX: 0}">
        <CCol class="search__item-img-wrapper" xs="4">
          <NuxtImg
            provider="cloudinary"
            class="search__item-img"
            :src="`products/${product.images[0] || 'placeholder'}.png`"
          />
        </CCol>
        <CCol xs="8">
          <CCardBody class="search__item-content">
            <CCardTitle class="search__item-name">
              {{ product.name }}
            </CCardTitle>
            <CCardText class="search__item-price">
              <span class="search__item-price_current">{{ price }} ₽</span> <br>
              <span v-if="product.discount" class="search__item-price_old">{{ product.price }} ₽</span>
            </CCardText>
          </CCardBody>
        </CCol>
      </CRow>
    </NuxtLink>
  </CCard>
</template>

<script lang="ts" setup>
const props = defineProps<{
  product: ShortProduct
}>();

const { product } = toRefs(props);

const price = useGetPriceWithDiscount(product.value.price, product.value.discount);
</script>

<style lang="scss" scoped>
.search__item{
  box-sizing: border-box;
  cursor: pointer;
  border-right: none;
  border-left: none;
  border-radius: 0;
  &:first-child{
    border-top: 1px solid $white;
  }
  &:last-child {
    border-bottom: 1px solid $white;
  }
  .search__item-img-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    .search__item-img{
      width: 140px;
      height: 100px;
    }
  }
  .search__item-content{
    text-align: center;
    .search__item-name{
      @include CirceRounded16();
      font-size: 1.3rem;
    }
      .search__item-price{
        margin: 0;
        .search__item-price_current{
          @include CirceRounded16();
          font-size: 1.25rem;
        }
        .search__item-price_old{
          @include CirceRounded16();
          color: $red;
          text-decoration: line-through;
        }
      }
  }
  &:hover{
    border-top: 1px solid $orange;
    border-bottom: 1px solid $orange;
  }
}
</style>

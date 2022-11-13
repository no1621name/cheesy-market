<template>
  <NuxtLayout name="main">
    <template #default>
      <ProductCard :product="product" />
    </template>
    <template #afterMain>
      <section class="similar-products">
        <h4 class="similar-products__title mb-3">
          Похожие товары
        </h4>
        <CRow class="justify-content-center">
          <CCol
            v-for="(similarProduct, index) in similarProducts"
            :key="similarProduct._id"
            xs="3"
            :class="{
              'ps-0': index === 0,
              'pe-0': index === similarProducts!.length - 1
            }"
          >
            <ProductsItem
              :product="similarProduct"
            />
          </CCol>
        </CRow>
      </section>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import ProductCard from '@/components/ProductCard/index.vue';
import ProductsItem from '@/components/Products/Item.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: false,
});

const { addCategory, addBreadCrumb } = useBreadCrumbsStore();

const router = useRoute();
const productId = router.params.id;

const product = ref<Product>({} as Product);
const similarProducts = ref<ShortProduct[]>();

const productResponse = await useApiAsyncData<ServerResponseI<'product', Product>>(`product${productId}`, `/products/${productId}`);
const productData = useValidateResponse(productResponse, true)?.data;

product.value = productData!.product;

const similarProductParams: { limit: number, category?: number | number[], type?: string } = {
  limit: 4,
};

if (product.value?.type === 'goods' && product.value.categories) {
  similarProductParams.category = product.value.categories[1];
  await addCategory(product.value.categories[1]);
  if (product.value.categories[2]) { await addCategory(product.value.categories[2]); }
} else {
  similarProductParams.type = 'set';
  addBreadCrumb({ name: 'Наборы для сыра', href: '/sets' });
}

addBreadCrumb({ name: product.value.name, href: router.path });

const similarProductsResponse = await useApiFetch<ServerResponseI<'products', ShortProduct[]>>('/products', {
  params: similarProductParams,
});

similarProducts.value = useValidateResponse(similarProductsResponse)?.data.products;
</script>

<style lang="scss" scoped>
.product-item {
  height: 100% !important;
}
.similar-products__title{
  color: $brown;
  @include Heading1();
}
</style>

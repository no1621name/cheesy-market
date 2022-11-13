<template>
  <CRow class="brand" :xs="{gutterX: 0, gutterY: 5}">
    <CCol :xs="12" class="mt-0">
      <h3 class="brand__title brown">
        <NuxtImg
          class="product-item__img"
          provider="cloudinary"
          :src="`/brands/${brand.logo || 'placeholder'}.png`"
        />
        {{ brand.name }}
      </h3>
    </CCol>
    <CCol :xs="12">
      <ProductsList
        :filters-toggler="true"
        :allow-brands="false"
        :options="{
          brand: [brandId],
          category: [1],
          limit: 8
        }"
        :title="`${CheeseSvg} <span class=\&quot;ms-2\&quot;>Ингредиенты</span>`"
      />
    </CCol>
    <CCol :xs="12">
      <ProductsList
        :filters-toggler="true"
        :allow-brands="false"
        :options="{
          brand: [brandId],
          category: [2],
          limit: 8
        }"
        :title="`${EquipmentSvg} <span class=\&quot;ms-2\&quot;>Оборудование</span>`"
      />
    </CCol>
  </CRow>
</template>

<script lang="ts" setup>
import EquipmentSvg from '@/assets/images/icons/enquipment.svg?raw';
import CheeseSvg from '@/assets/images/icons/cheese.svg?raw';

import ProductsList from '@/components/Products/List.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main',
});

const { addBreadCrumb } = useBreadCrumbsStore();

addBreadCrumb({ name: 'Бренды', href: '/brands' });

const brandId = +useRoute().params.id;
const brandRequest = await useApiAsyncData<ServerResponseI<'brand', Brand>>(`brand${brandId}`, `/products/brands/${brandId}`);
const brand = useValidateResponse(brandRequest, true)!.data.brand;
addBreadCrumb({ name: brand.name || 'Бренд', href: `/brands/${brandId}` });
</script>

<style lang="scss" scoped>
.brand__title{
  @include Heading1();
}
</style>

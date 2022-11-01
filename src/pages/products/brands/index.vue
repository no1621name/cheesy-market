<template>
  <div class="brands">
    <Spinner
      v-if="!Object.keys(brandsList).length"
      class="mx-auto d-block"
      large
    />
    <CRow v-else :lg="{gutterY: 3, gutterX: 0}">
      <CCol :xs="12" class="mt-0">
        <h3 class="brands__title brown">
          Производители
        </h3>
      </CCol>
      <CCol
        v-for="(brands, letter) in brandsList"
        :key="letter"
        :lg="3"
        :md="4"
        :xs="6"
      >
        <CRow class="brands__brand-list">
          <CCol :lg="3">
            <h4 class="brands__brand-list__letter">
              {{ letter }}
            </h4>
          </CCol>
          <CCol :lg="6" class="d-flex flex-column justify-content-between">
            <NuxtLink
              v-for="brand in brands"
              :key="brand._id"
              class="brands__brand-list__link"
              :to="`/products/brands/${brand._id}`"
            >
              {{ brand.name }}
            </NuxtLink>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>

<script lang="ts" setup>
import Spinner from '@/components/UI/Spinner.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main',
});

useBreadCrumbsStore().addBreadCrumb({ name: 'Бренды', href: '/brands' });

const brandsList = ref<BrandsList>({});
const brandsRequest = await useApiAsyncData<ServerResponseI<'brands', Brand[]>>('productsBrands', '/products/brands');

brandsList.value = useValidateResponse(brandsRequest)?.data.brands.reduce((list: BrandsList, curr: Brand) => {
  const letter = curr.name[0].toLocaleUpperCase();

  if (list[letter]) {
    list[letter].push(curr);
  } else {
    list[letter] = [curr];
  }

  return list;
}, {}) || {};
</script>

<style lang="scss" scoped>
.brands {
  @include CirceRounded16();
  .brands__title {
    @include Heading2();
  }
  .brands__brand-list__letter{
    font-size: 1.75rem;
    line-height: 1.875rem;
    font-weight: bold;
  }
  .brands__brand-list__link{
    color: $darkGrey;
  }
}
</style>

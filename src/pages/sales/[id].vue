<template>
  <ProductsList
    :title="sale?.name || 'Акция'"
    :pagination="true"
    :options="{
      short: 1,
      ids: sale?.products_ids,
      limit: 8,
    }"
  />
</template>

<script lang="ts" setup>
import ProductsList from '@/components/Products/List.vue';
import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main',
});

const { addBreadCrumb } = useBreadCrumbsStore();

const id = useRoute().params.id;
const saleRequest = await useApiAsyncData<ServerResponseI<'sale', Sale>>(`sale${id}`, `/sales/${id}`);
const sale = useValidateResponse(saleRequest, true)!.data.sale;

addBreadCrumb({ name: 'Акции', href: '/sales' });
addBreadCrumb({ name: sale.name, href: `/sales/${sale._id}` });
</script>

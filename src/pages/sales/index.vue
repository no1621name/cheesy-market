<template>
  <div>
    <h2 class="title">
      Акции
    </h2>
    <Info v-if="!sales.length">
      <h3>Ничего не нашлось!</h3>
      <p>На данный момент в нашем магазине не проводится никаких акций</p>
    </Info>
    <CRow v-else>
      <CCol :lg="4">
        <SaleItem
          v-for="sale in sales"
          :key="sale._id"
          :sale="sale"
        />
      </CCol>
    </CRow>
  </div>
</template>

<script lang="ts" setup>
import SaleItem from '@/components/SaleItem.vue';
import Info from '@/components/UI/Info.vue';
import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main',
});

const { addBreadCrumb } = useBreadCrumbsStore();
addBreadCrumb({ name: 'Акции', href: '/sales' });

const sales = ref<Sale[]>([]);
const salesRequest = await useApiAsyncData<ServerResponseI<'sales', Sale[]>>('sales', '/sales');
sales.value = useValidateResponse(salesRequest)?.data.sales || [];
</script>

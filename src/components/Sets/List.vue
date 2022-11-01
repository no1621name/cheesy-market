<template>
  <List title="Наборы для сыра" :not-found="!setsList.length">
    <template #main>
      <CCol
        v-for="set in setsList"
        :key="set._id"
        lg="6"
      >
        <ClientOnly>
          <SetItem
            :set="set"
            @add="(id: number) => addProduct(id)"
          />
          <template #placeholder>
            <SetItem :set="set" />
          </template>
        </ClientOnly>
      </CCol>
    </template>
    <template #afterMain>
      <CCol class="d-flex justify-content-center" xs="12">
        <Pagination
          :active-page="activePage"
          :total-pages="totalPages"
          :per-page="pagination.limit"
          @change="getStets"
        />
      </CCol>
    </template>
  </List>
</template>

<script lang="ts" setup>
import List from '@/components/UI/List.vue';
import Pagination from '@/components/Pagination.vue';
import SetItem from './Item.vue';

import { useCartStore } from '@/store/cart';

const { addProduct } = useCartStore();

const setsList = ref<ShortProduct[]>([]);
const { pagination, activePage, totalPages } = usePagination();

const getStets = async (offset?: 0) => {
  const setsRequest = await useApiFetch<ServerResponseI<'products', ShortProduct[]>>('/products', {
    params: {
      type: 'set',
      offset,
      limit: pagination.value.limit,
    }
  });

  const setsData = useValidateResponse(setsRequest)?.data || {
    products: [],
    pagination: {
      total: 1,
      next: 0,
      current: 0,
      prev: 0,
      limit: 1
    }
  };

  setsList.value = setsData.products;
  pagination.value = setsData.pagination;
};

await getStets();
</script>

<style lang="scss" scoped>
</style>

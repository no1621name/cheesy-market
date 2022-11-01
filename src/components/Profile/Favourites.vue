<template>
  <List
    :title="`<span class=\&quot;d-flex flex-column align-items-start\&quot;>
      Избранные товары <p class=\&quot;darkened fw-normal fs-6 mb-0\&quot;>Товары,
      которые вы добавили в список будуших покупок</p>
    </span>`"
    :not-found="!favouriteProductsList.length"
    class="mt-4"
  >
    <template #notFound>
      <Info>
        <h4>Вы ещё не добавили ни одного товара в избранные</h4>
      </Info>
    </template>
    <template #main>
      <CCol
        v-if="favouriteProductsList.length !== (favouriteList ? favouriteList.length : 90)"
        :xs="12"
        class="d-flex justify-content-center"
      >
        <Spinner />
      </CCol>
      <CCol
        v-for="favProduct in favouriteProductsList"
        v-else
        :key="favProduct._id"
        :lg="3"
      >
        <ProductItem :product="favProduct">
          <template #beforeMain>
            <CRow class="pt-2 justify-content-between">
              <CCol :xs="5">
                <span :class="['in-stock', `${favProduct.isInStock ? '' : 'out-of-stock'}`]">
                  <span class="in-stock__mark" />
                  {{ favProduct.isInStock ? 'В наличии' : 'Не в наличии' }}
                </span>
              </CCol>
              <CCol :xs="3">
                <FollowButton
                  :id="favProduct._id"
                  :short="true"
                  :followed="true"
                />
              </CCol>
            </CRow>
          </template>
        </ProductItem>
      </CCol>
    </template>
  </List>
</template>

<script lang="ts" setup>
import List from '@/components/UI/List.vue';
import Info from '@/components/UI/Info.vue';
import Spinner from '@/components/UI/Spinner.vue';
import FollowButton from '@/components/UI/FollowButton.vue';
import ProductItem from '@/components/Products/Item.vue';

import { useFavouritesStore } from '@/store/favourites';
import { storeToRefs } from 'pinia';

const favouritesStore = useFavouritesStore();

const { favouriteList } = storeToRefs(favouritesStore);
const favouriteProductsList = ref<ShortProduct[]>([]);

favouritesStore.$subscribe(async (_, { favouriteList }) => {
  await $fetchApi<ServerResponseI<'products', ShortProduct[]>>('/products/list', {
    query: {
      ids: favouriteList,
      short: 1,
    },
    async onResponse({ response }) {
      favouriteProductsList.value = response._data.data.products;
    }
  });
});
</script>

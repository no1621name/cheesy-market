<template>
  <NuxtLayout name="default">
    <template #beforeMain>
      <Promo />
    </template>
    <template #default>
      <ProductsList
        title="Ингредиенты"
        :options="{
          type: 'goods',
          category: [1, 2],
          limit: 3,
        }"
        :filters-toggler="true"
        :slider="true"
      />
    </template>
    <template #afterMain>
      <ViewedList />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Promo from '@/components/Content/Homepage/Promo.vue';
import ProductsList from '@/components/Products/List.vue';
import ViewedList from '@/components/ViewedList.vue';

definePageMeta({
  layout: false,
});

</script>

<style lang="scss">
</style>

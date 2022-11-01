<template>
  <ProductsList
    :title="`Результаты ${$route.params.search_q ? `по запросу \&quot;${$route.params.search_q}\&quot` : ''}`"
    :options="{
      search_q: $route.params.search_q as string,
    }"
  />
</template>

<script lang="ts" setup>
import ProductsList from '@/components/Products/List.vue';
</script>

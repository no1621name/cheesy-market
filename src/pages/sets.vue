<template>
  <SetsList />
</template>

<script lang="ts" setup>
import SetsList from '@/components/Sets/List.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';
definePageMeta({
  layout: 'main'
});

const { addBreadCrumb } = useBreadCrumbsStore();

const title = 'Наборы для сыра';
onMounted(() => {
  addBreadCrumb({ name: title, href: '/sets' });
});
</script>

<style lang="scss" scoped>
</style>

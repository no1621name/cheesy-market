<template>
  <NuxtLayout name="default">
    <template #beforeMain>
      <BreadCrumbs />
    </template>
    <template #default>
      <slot />
    </template>
    <template #afterMain>
      <slot name="afterMain" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import BreadCrumbs from '@/components/UI/BreadCrumbs.vue';

definePageMeta({
  layout: false
});
</script>

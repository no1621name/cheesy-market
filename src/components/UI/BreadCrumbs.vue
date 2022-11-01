<template>
  <CBreadcrumb v-if="!isMobile">
    <CBreadcrumbItem
      v-for="(breadCrumb, index) in breadCrumbsList"
      :key="index"
      :active="index === breadCrumbsList.length-1 && index !== 0"
      :href="breadCrumb.href"
    >
      {{ breadCrumb.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>

<script lang="ts" setup>
import { useBreadCrumbsStore } from '@/store/breadCrumbs';
import { storeToRefs } from 'pinia';

const breadCrumbsStore = useBreadCrumbsStore();
const { breadCrumbsList } = storeToRefs(breadCrumbsStore);
const { isMobile } = useGetWidowWidth();
</script>

<style lang="scss">
.breadcrumb .breadcrumb-item {
  a{
    @include CirceRounded16();
    color: $darkGrey;
  }
  &.active a{
    text-decoration: none;
    color: $orange;
  }
}
</style>

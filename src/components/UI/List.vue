<template>
  <section class="main-list">
    <CRow :xs="{gutterY: 4}">
      <CCol xs="12" class="mt-0">
        <header class="main-list__header d-flex align-items-center justify-content-between">
          <h3 class="main-list__title m-0 brown d-flex align-items-center" v-html="title" />
          <slot name="header" />
        </header>
      </CCol>
      <CCol v-if="notFound" xs="12">
        <slot name="notFound">
          <NotFound />
        </slot>
      </CCol>
      <template v-else>
        <slot name="beforeMain" />

        <CRow :xs="{ gutterY: 4 }" class="p-0">
          <slot name="main" />
        </CRow>
        <slot name="afterMain" />
      </template>
    </CRow>
  </section>
</template>

<script lang="ts" setup>
import NotFound from '@/components/UI/NotFound.vue';

withDefaults(defineProps<{
  title: string,
  notFound?: boolean
}>(), {
  notFound: false
});
</script>

<style lang="scss">
.main-list .main-list__header{
  .main-list__title{
    @include Heading2();
    text-transform: none;
    p{
      font-family: 'Roboto';
    }
  }
}
</style>

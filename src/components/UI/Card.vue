<template>
  <CCard>
    <slot name="beforeMain" />
    <NuxtLink
      v-if="img"
      :to="url"
      class="card-link text-decoration-none"
    >
      <NuxtImg
        class="w-100 h-100"
        provider="cloudinary"
        :src="src"
      />
    </NuxtLink>
    <slot name="img" />
    <CCardBody class="p-0">
      <slot name="default" />
    </CCardBody>
  </CCard>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    url?: string,
    src?: string,
    img?: boolean
  }>(), {
  url: '/404',
  src: '/products/placeholder.png',
  img: true
});
</script>

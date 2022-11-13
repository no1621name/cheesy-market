<template>
  <CCard
    class="bg-card"
    :style="{'background-image': `url(${src})`}"
  >
    <CCardBody class="d-flex flex-column align-items-start justify-content-end px-3 py-2">
      <CCardTitle class="bg-card__title fw-bold mb-0">
        <slot />
      </CCardTitle>
      <NuxtLink class="bg-card__link" :to="href">
        Смотреть
        <DropdownArrow3Svg />
      </NuxtLink>
    </CCardBody>
  </CCard>
</template>

<script lang="ts" setup>
import DropdownArrow3Svg from '@/assets/images/icons/dropdown-arrow-3.svg?component';

defineProps<{ href: string, src: string }>();
</script>

<style lang="scss">
.bg-card{
  background-repeat: no-repeat;
  background-size: cover;
  height: 140px;
  @include CirceRounded16();
  .bg-card__title{
    color: $white;
    font-size: 1.25rem;
  }
  .bg-card__link{
    text-decoration: none;
    color: $orange;
    font-size: .875rem;
    svg{
      margin-left: 6px;
    }
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>

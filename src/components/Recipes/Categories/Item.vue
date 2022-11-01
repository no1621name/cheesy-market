<template>
  <CCard
    class="reciepes-categories-item"
    :style="{'background-image': `url(${useRuntimeConfig().public.cloudinaryUrl}/recipes/categories/${category.preview}.png)`}"
  >
    <CCardBody class="d-flex flex-column align-items-start justify-content-end px-3 py-2">
      <CCardTitle class="reciepes-categories-item__title fw-bold mb-0">
        {{ category.name }}
      </CCardTitle>
      <NuxtLink class="reciepes-categories-item__link" :to="`/recipes/categories/${category._id}`">
        Смотреть
        <DropdownArrow3Svg />
      </NuxtLink>
    </CCardBody>
  </CCard>
</template>

<script lang="ts" setup>
import DropdownArrow3Svg from '@/assets/images/icons/dropdown-arrow-3.svg?component';

defineProps<{ category: RecipeCategory }>();
</script>

<style lang="scss" scoped>
.reciepes-categories-item{
  background-repeat: no-repeat;
  background-size: cover;
  height: 140px;
  @include CirceRounded16();
  .reciepes-categories-item__title{
    color: $white;
    font-size: 1.25rem;
  }
  .reciepes-categories-item__link{
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

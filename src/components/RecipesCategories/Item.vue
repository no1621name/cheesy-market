<template>
  <BgCard :href="`/recipes/categories/${category._id}`" :src="`${useRuntimeConfig().public.cloudinaryUrl}/recipes/categories/${category.preview}.png`">
    {{ category.name }}
  </BgCard>
</template>

<script lang="ts" setup>
import BgCard from '@/components/UI/BgCard.vue';

defineProps<{ category: RecipeCategory }>();
</script>

<template>
  <div>
    <RecipesCategoriesList />
    <ArticlesList
      class="mt-5"
      title="Последние добавенные"
      sort="date.asc"
      type="recipes"
    />
  </div>
</template>

<script lang="ts" setup>
import RecipesCategoriesList from '@/components/Recipes/Categories/List.vue';
import ArticlesList from '@/components/Articles/List.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main',
});

useBreadCrumbsStore().addBreadCrumb({ name: 'Рецепты сыра', href: '/recipes' });
</script>

<template>
  <ArticlesList
    :category="categoryId"
    :title="name"
    type="recipes"
  />
</template>

<script lang="ts" setup>
import ArticlesList from '@/components/Articles/List.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main'
});

const { addBreadCrumb } = useBreadCrumbsStore();
addBreadCrumb({ name: 'Рецепты для сыра', href: '/recipes' });

const categoryId = +useRoute().params.id;

const recipeCategoryRequset = await useApiAsyncData<ServerResponseI<'recipeCategory', RecipeCategory>>(
  `recipeCategory${categoryId}`, `/recipes/categories/${categoryId}`
);
const { name } = useValidateResponse(recipeCategoryRequset)?.data.recipeCategory || { name: 'Рецепты' };

addBreadCrumb({ name, href: `/recipes/categories/${categoryId}` });
</script>

<template>
  <NuxtLayout name="main">
    <template #default>
      <Article
        :article="recipe"
        category-name="Рецепты"
        href="/recipes"
      />
    </template>
    <template #afterMain>
      <ArticlesList
        class="mt-5"
        type="recipes"
        title="Популярные рецепты"
        sort="_id.desc"
        :limit="3"
        :more-button="false"
      />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Article from '@/components/Articles/Article.vue';
import ArticlesList from '@/components/Articles/List.vue';

definePageMeta({
  layout: false
});

const id = useRoute().params.id;
const recipeRequest = await useApiAsyncData<ServerResponseI<'recipe', Article>>(`recipe${id}`, `/recipes/${id}`);
const recipe = useValidateResponse(recipeRequest, true)!.data.recipe;
</script>

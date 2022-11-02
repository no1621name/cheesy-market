<template>
  <List
    class="recipes-categories-list"
    title="Категории рецептов сыров"
    :not-found="!recipesCategories.length"
  >
    <template #main>
      <CCol
        v-for="recipeCategory in recipesCategories"
        :key="recipeCategory._id"
        lg="4"
      >
        <RecipesCategoriesItem
          :category="recipeCategory"
        />
      </CCol>
    </template>
  </List>
</template>

<script lang="ts" setup>
import List from '@/components/UI/List.vue';
import RecipesCategoriesItem from './Item.vue';

const recipesCategories = ref<RecipeCategory[]>([]);
const recipesCategoriesRequest = await useApiFetch<ServerResponseI<'categories', RecipeCategory[]>>('/recipes/categories');
recipesCategories.value = useValidateResponse(recipesCategoriesRequest)?.data.categories || [];
</script>

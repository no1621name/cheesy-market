<template>
  <ProductsList
    :title="title"
    :options="{
      category: [categoryId]
    }"
    :slider="true"
    :filters-toggler="true"
    :allow-subcategories="!!category?.children_ids.length"
  />
</template>

<script lang="ts" setup>
import ProductsList from '@/components/Products/List.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';
import { useUserStore } from '@/store/user';

definePageMeta({
  layout: 'main'
});

const router = useRoute();
const categoryId = +router.params.id;

const userStore = useUserStore();
const { addBreadCrumb } = useBreadCrumbsStore();

userStore.$subscribe((_, { userInfo }) => {
  if (!userInfo.viewedCategories.includes(categoryId)) {
    userInfo.viewedCategories.push(categoryId);
  }
});

const title = ref('');

const categoryResponse = await useApiAsyncData<ServerResponseI<'category' | 'parent', Category | Category>>(`category${categoryId}`, `/products/categories/${categoryId}`);
const { category, parent } = useValidateResponse(categoryResponse)?.data || {};

title.value = category?.name || 'Категория';

if (parent) {
  addBreadCrumb({ name: parent.name, href: `/products/categories/${parent?._id || 0}` });
}
addBreadCrumb({ name: category?.name || 'Категория', href: `/products/categories/${category?._id || 0}` });
</script>

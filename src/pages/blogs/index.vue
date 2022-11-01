<template>
  <ArticlesList type="blogs" title="Статьи про сыроделие" />
</template>

<script lang="ts" setup>
import ArticlesList from '@/components/Articles/List.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: 'main'
});

useBreadCrumbsStore().addBreadCrumb({ name: 'Статьи про сыроделие', href: '/blogs' });
</script>

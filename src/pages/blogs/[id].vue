<template>
  <NuxtLayout name="main">
    <template #default>
      <Article
        :article="blog"
        category-name="Статьи про сыроделие"
        href="/blogs"
      />
    </template>
    <template #afterMain>
      <ArticlesList
        class="mt-5"
        type="blogs"
        title="Популярные статьи"
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
const blogRequest = await useApiAsyncData<ServerResponseI<'blog', Article>>(`blog${id}`, `/blogs/${id}`);
const blog = useValidateResponse(blogRequest, true)!.data.blog;
</script>

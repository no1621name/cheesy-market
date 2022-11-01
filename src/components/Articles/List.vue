<template>
  <List
    class="articles-list"
    :title="title"
    :not-found="!articlesList.length"
  >
    <template #main>
      <CCol
        v-for="article in articlesList"
        :key="article._id"
        lg="4"
      >
        <ArticleItem :article="article" :type="type" />
      </CCol>
    </template>
    <template #afterMain>
      <CButton
        v-if="moreButton && articlesList.length !== pagination.total"
        class="button_success mx-auto"
        @click="getArticles()"
      >
        Загрузить еще
      </CButton>
    </template>
  </List>
</template>

<script lang="ts" setup>
import List from '@/components/UI/List.vue';
import ArticleItem from '@/components/Articles/Item.vue';

const props = withDefaults(defineProps<{
  title?: string,
  category?: number,
  limit?: number,
  offset?: number,
  moreButton?: boolean,
  sort?: `${'date'|'_id'}.${'asc' | 'desc'}`,
  type: 'blogs' | 'recipes',
}>(), {
  title: 'Рецепты',
  category: 0,
  limit: 6,
  offset: 0,
  sort: 'date.desc',
  moreButton: true
});

const { category, limit, offset, sort, type } = toRefs(props);

const pagination = ref<Partial<Pagination>>({
  current: offset.value,
});
const articlesList = ref<Article[]>([]);

const getArticles = async () => {
  const query: { category?: number, [key:string]: any } =  {
    offset: pagination.value.next || pagination.value.current,
    limit: limit.value,
    sort: sort.value,
  };

  if (type.value === 'recipes') {
    query.category = category.value;
  }

  await $fetchApi<ServerResponseI<'blogs'|'recipes', Article[]>>(`/${type.value}`, {
    query,
    async onResponse({ response }) {
      pagination.value = response._data.data.pagination;
      articlesList.value = [...articlesList.value, ...(response._data.data[type.value] || [])];
    }
  });
};

await getArticles();
</script>

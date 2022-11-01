<template>
  <Card
    :class="[`${type}-item`, 'articles-item']"
    :url="articleUrl"
    :src="`/${type}/previews/${article.preview}.png`"
  >
    <CCardTitle class="brown fw-bold text-uppercase">
      {{ article.title }}
    </CCardTitle>
    <p class="darkened">
      {{ article.description }}
    </p>
    <NuxtLink :to="articleUrl" class="highlighted">
      Читать дальше <DropdownArrow3Svg style="transform: scale(1.5);" />
    </NuxtLink>
  </Card>
</template>

<script lang="ts" setup>
import DropdownArrow3Svg from '@/assets/images/icons/dropdown-arrow-3.svg?component';
import Card from '@/components/UI/Card.vue';

const props = defineProps<{
  article: Article,
  type: 'blogs' | 'recipes',
}>();

const { article, type } = toRefs(props);
const articleUrl = `/${type.value}/${article.value._id}`;
</script>

<style lang="scss">
.articles-item {
  height: 100% !important;
  img {
    height: 175px !important;
  }
  .card-body{
    padding: 20px !important;
    a svg{
      margin-right: 5px;
    }
  }
}
</style>

<style lang="scss" scoped>
.articles-item{
  @include CirceRounded16();
  border: none;
}
</style>

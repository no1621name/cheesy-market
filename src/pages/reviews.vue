<template>
  <List title="Отзывы покупателей" :not-found="!reviewsList.length">
    <template #header>
      <p v-if="!userStore.isAuth" class="mb-0 reviews__link  d-inline-flex align-items-center justify-content-beetween">
        Чтобы оставить отзыв необходимо
        <NuxtLink to="/auth" class="highlighted text-decoration-none ms-2 d-inline-flex align-items-center">
          <User2Svg class="me-2" /> Авторизоваться
        </NuxtLink>
      </p>
      <CButton
        v-else
        class="button_success"
        @click="toggleVisibleForm"
      >
        Написать отзыв
      </CButton>
    </template>
    <template #beforeMain>
      <Transition name="main-transition">
        <ReviewForm v-if="userStore.isAuth && isVisibleForm" @added="getReviews" />
      </Transition>
    </template>
    <template #main>
      <Review
        v-for="review in reviewsList"
        :key="review._id"
        :review="review"
      />
    </template>
    <template #afterMain>
      <CButton
        v-if="reviewsList.length !== total"
        class="button_success mx-auto "
        @click="getReviews()"
      >
        Загрузить еще
      </CButton>
    </template>
  </List>
</template>

<script lang="ts" setup>
import User2Svg from '@/assets/images/icons/user-2.svg?component';

import List from '@/components/UI/List.vue';
import Review from '@/components/Reviews/Item.vue';
import ReviewForm from '@/components/Reviews/Form.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';
import { useUserStore } from '@/store/user';
definePageMeta({
  layout: 'main'
});

const userStore = useUserStore();
useBreadCrumbsStore().addBreadCrumb({ name: 'Отзывы наших покупателей', href: '/reviews' });

const { bool: isVisibleForm, toggleBool: toggleVisibleForm } = useGetToggledBoolean();
const reviewsList = ref<Review[]>([]);
const nextOffset = ref(0);
const total = ref(0);

const getReviews = async () => {
  await $fetchApi<ServerResponseI<'reviews', Review[]>>('/reviews', {
    query: {
      limit: 2,
      offset: nextOffset.value,
      id: 0,
    },
    async onResponse({ response }) {
      reviewsList.value = [...reviewsList.value, ...(response._data.data.reviews || [])];
      nextOffset.value = response._data.data.pagination.next;
      total.value = response._data.data.pagination.total;
    }
  });
};

await getReviews();
</script>

<style lang="scss" scoped>
.reviews__link{
  @include CirceRounded16();
}
</style>

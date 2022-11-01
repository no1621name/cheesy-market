<template>
  <CCol xs="6" class="review">
    <header class="d-flex justify-content-between">
      <div class="d-flex flex-column align-items-start">
        <h5 class="review__title mb-1 fw-bold">
          {{ review.fullname }}
        </h5>
        <span class="darkened">г. {{ review.city }}</span>
      </div>
      <Rating v-model="review.score" inline />
    </header>
    <div class="d-flex flex-column align-items-start justify-content-between mt-3">
      <p class="fw-light m-0">
        {{ review.text }}
      </p>
      <CRow class="mt-3" :xs="{ gutterX: 0 }">
        <CCol
          v-for="(image, index) in review.images"
          :key="index"
          :xs="2"
        >
          <NuxtImg
            provider="cloudinary"
            :src="`/reviews/${image}.png`"
          />
        </CCol>
      </CRow>
      <span class="darkened mt-3">
        {{ date[0] }}
        {{ monthDictionary[date[1] as keyof typeof monthDictionary] }}
        {{ date[2] }}
      </span>
    </div>
  </CCol>
</template>

<script lang="ts" setup>
import Rating from '@/components/UI/Rating.vue';

const props = defineProps<{ review: Review }>();
const { review } = toRefs(props);
const date = new Date(review.value.date).toLocaleDateString().split('.');
</script>

<style lang="scss" scoped>
.review{
  @include CirceRounded16();
  .review__title{
    color: $brown;
  }
}
</style>

<template>
  <Form class="reviews-form" @submit.prevent="sendReview">
    <template #header>
      <h5>Оставить отзыв:</h5>
    </template>
    <template #default>
      <CCol xs="5">
        <fieldset id="fieldsetReviewsFiles" class="form__form-group">
          <CFormLabel class="form__label" for="reviewsComment">
            Комменарий <span class="highlighted">*</span>:
          </CFormLabel>
          <CFormTextarea
            id="reviewsComment"
            v-model.trim="reviewText"
            maxlength="500"
            minlength="15"
            @input="() => invalidMessage = ''"
          />
        </fieldset>
      </CCol>
      <CCol xs="6">
        <fieldset id="fieldsetReviewsFiles" class="form__form-group">
          <CFormLabel class="form__label" for="reviewsFileInput">
            Фото:
          </CFormLabel>
          <CFormInput
            id="reviewsFileInput"
            ref="filesInput"
            type="file"
            accept="image/png"
            multiple
            @change="handleFiles"
          />
        </fieldset>
        <CRow :xs="{gutterY: 3, gutterX: 0}">
          <CCol xs="6" class="d-flex align-items-center">
            <Rating
              v-model="reviewRating"
              :readonly="false"
              :increment="0.5"
            />
          </CCol>
          <CCol xs="6" class="d-flex justify-content-end">
            <CButton class="button_success" :disabled="!!invalidMessage.length">
              Отправить
            </CButton>
          </CCol>
        </CRow>
      </CCol>
      <CCol v-if="invalidMessage" xs="12">
        <p class="reviews-form__alert">
          {{ invalidMessage }}
        </p>
      </CCol>
    </template>
  </Form>
</template>

<script lang="ts" setup>
import Form from '@/components/UI/Form.vue';
import Rating from '@/components/UI/Rating.vue';

import { useNotifierStore } from '@/store/notifier';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['added']);
const props = withDefaults(defineProps<{ productId?: number }>(), {
  productId: 0,
});

const { addServerError } = useNotifierStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const { productId } = toRefs(props);
const selectedFiles = ref<string[]>([]);
const reviewRating = ref(0);
const reviewText = ref('');
const invalidMessage = ref('');

const sendReview = async () => {
  invalidMessage.value = '';

  if (!reviewRating.value) {
    invalidMessage.value = 'Вы должны поставить оценку выше нуля';
    return;
  }

  await $fetchApi<ServerResponseI<'message' | 'rating', string | number>>('/reviews', {
    method: 'post',
    body: {
      fullname: userInfo.value.fullname,
      score: reviewRating.value,
      text: reviewText.value,
      images: selectedFiles.value,
      city: userInfo.value.address.city,
      product_id: productId.value,
    },
    async onResponse({ response }) {
      emit('added', response._data.data.rating);
    }
  });
};

const handleFiles = (e: InputEvent) => {
  selectedFiles.value = [];
  invalidMessage.value = '';

  const target = e.target as HTMLInputElement;
  const files = target.files;

  if (!target || !files) {
    addServerError();
    return;
  } else if (files.length > 5) {
    invalidMessage.value = 'Вы не можете прикрепить более 5 фотографий';
  }

  Object.keys(files).forEach((index) => {
    const file = files[+index];

    if (!file.type.includes('image/png')) {
      invalidMessage.value = 'Вы можете прикрепить только фотографии формата png';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e:ProgressEvent<FileReader>) => {
      selectedFiles.value.push(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};
</script>

<style lang="scss" scoped>
.reviews-form{
  @include CirceRounded16();
  .reviews-form__alert {
    color: $red;
  }
}
</style>
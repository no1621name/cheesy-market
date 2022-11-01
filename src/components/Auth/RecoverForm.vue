<template>
  <Form :header="header" @submit.prevent="sendRecoverRequest">
    <template #header>
      <CRow>
        <CCol xs="9" class="form__header-col">
          <h5 class="form__title">
            Восстановить пароль
          </h5>
        </CCol>
        <CCol xs="1" class="form__header-col">
          <CCloseButton
            class="form__button_close"
            @click="closeModal"
          />
        </CCol>
      </CRow>
    </template>
    <template #default>
      <CCol xs="12">
        <fieldset id="fieldsetRecoverEmail" class="form__form-group">
          <CFormLabel for="recoverEmailInput">
            Email :
          </CFormLabel>
          <CFormInput
            id="recoverEmailInput"
            v-model.trim="recoverEmail"
            class="form__input"
            placeholder="yourname@mail.com"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <CButton class="button_success w-100">
          Отправить
        </CButton>
      </CCol>
      <CCol xs="12">
        <p v-if="isInvalid" class="form__warning">
          Такого пользователя не существует или почта введена неверно.
        </p>
      </CCol>
      <CCol xs="12">
        <span class="form__change-form">
          У вас нет профиля?
          <CButton
            class="form__button_link"
            color="link"
            type="button"
            @click="$emit('changeForm', 'regist')"
          >
            Создайте аккаунт
          </CButton>
        </span>
      </CCol>
    </template>
  </Form>
</template>

<script lang="ts" setup>
import Form from '@/components/UI/Form.vue';

withDefaults(defineProps<{
  header?: boolean
}>(), {
  header: true
});

const emit = defineEmits(['changeForm']);

const recoverEmail = ref('');
const isInvalid = ref(false);

const closeModal = () => { emit('changeForm', 'close'); };

const sendRecoverRequest = async () => {
  if (!useValidateEmail(recoverEmail.value)) {
    isInvalid.value = true;
    return;
  }

  await $fetchApi<ServerResponseI<'', ''>>('/users/recover', {
    method: 'PATCH',
    body: {
      email: recoverEmail.value,
    },
    async onResponse({ response }) {
      if (response.ok) {
        closeModal();
      }
    },
    async onResponseError() {
      isInvalid.value = true;
    }
  });
};
</script>

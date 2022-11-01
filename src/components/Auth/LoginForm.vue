<template>
  <Form :header="header" @submit="() => { $emit('submit'); sendLoginRequest();}">
    <template #header>
      <CRow>
        <CCol xs="9" class="form__header-col">
          <h5 class="form__title">
            Вход в аккаунт
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
        <fieldset id="fieldsetLoginEmail" class="form__form-group">
          <CFormLabel class="form__label" for="loginEmailInput">
            Email:
          </CFormLabel>
          <CFormInput
            id="loginEmailInput"
            v-model.trim="loginEmail"
            class="form__input"
            placeholder="yourname@mail.com"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <fieldset id="fieldsetLoginPassword" class="form__form-group">
          <CFormLabel class="form__label" for="loginEmailInput">
            Пароль:
          </CFormLabel>
          <CFormInput
            id="loginPasswordInput"
            v-model.trim="loginPassword"
            type="password"
            autocomplete="on"
            class="form__input"
            placeholder="Ваш пароль"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <CButton class="button_success w-100" type="submit">
          Войти
        </CButton>
      </CCol>
      <CCol xs="12">
        <CButton
          class="form__button_link"
          color="link"
          @click="$emit('changeForm', 'recover')"
        >
          Забыли пароль?
        </CButton>
      </CCol>
      <CCol xs="12">
        <p v-if="isInvalid" class="form__warning">
          Почта и/или пароль неверные. Попробуйте ещё раз.
        </p>
      </CCol>
      <CCol v-if="tip" xs="12">
        <span class="form__change-form">
          У вас нет профиля?
          <CButton
            class="form__button_link"
            color="link"
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

import { useUserStore } from '@/store/user';

withDefaults(defineProps<{
  header?: boolean
  tip?: boolean,
}>(), {
  header: true,
  tip: true
});

const userStore = useUserStore();
const { updateUserInfo } = userStore;

const emit = defineEmits(['close', 'changeForm']);

const loginEmail = ref('');
const loginPassword = ref('');

const isInvalid = ref(false);

const closeModal = () => { emit('changeForm', 'close'); };

const sendLoginRequest = async () => {
  if (!useValidateEmail(loginEmail.value)) {
    isInvalid.value = true;
    return;
  }

  await $fetchApi<ServerResponseI<'user', User>>('/auth/login', {
    method: 'post',
    body: {
      email: loginEmail.value,
      password: loginPassword.value,
    },
    async onResponse({ response }) {
      if (response.ok) {
        await updateUserInfo();
        closeModal();
        isInvalid.value = false;
      }
    },
    async onResponseError() {
      isInvalid.value = true;
    }
  });
};
</script>

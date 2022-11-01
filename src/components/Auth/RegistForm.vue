<template>
  <From :header="header" @submit="() => { sendRegistRequest();}">
    <template #header>
      <CRow>
        <CCol xs="9" class="form__header-col">
          <h5 class="form__title">
            Регистрация
          </h5>
        </CCol>
        <CCol xs="1" class="form__header-col">
          <CCloseButton class="form__button_close" @click="closeModal" />
        </CCol>
      </CRow>
    </template>
    <template #default>
      <CCol xs="12">
        <fieldset id="fieldsetRegistFullname" class="form__form-group">
          <CFormLabel for="registPasswordConfirmInput">
            Ваше имя и фамилия:
          </CFormLabel>
          <CFormInput
            id="registFullnameInput"
            v-model.trim="registFullname"
            class="form__input"
            placeholder="Владимир Иванов"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <fieldset id="fieldsetRegistEmail" class="form__form-group">
          <CFormLabel for="registPasswordConfirmInput">
            Email:
          </CFormLabel>
          <CFormInput
            id="registEmailInput"
            v-model.trim="registEmail"
            class="form__input"
            placeholder="yourname@mail.com"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <fieldset id="fieldsetRegistPassword" class="form__form-group">
          <CFormLabel for="registPasswordConfirmInput">
            Ваш пароль для входа:
          </CFormLabel>
          <CFormInput
            id="registPasswordInput"
            v-model.trim="registPassword"
            type="password"
            autocomplete="on"
            class="form__input"
            placeholder="Содержит 8 и более символов"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <fieldset id="fieldsetRegistPasswordConfirm" class="form__form-group">
          <CFormLabel for="registPasswordConfirmInput">
            Подтвердите пароль
          </CFormLabel>
          <CFormInput
            id="registPasswordConfirmInput"
            v-model.trim="registPasswordConfirm"
            type="password"
            autocomplete="off"
            class="form__input"
            placeholder="Повторите ваш пароль"
          />
        </fieldset>
      </CCol>
      <CCol xs="12">
        <CButton class="button_success w-100" type="submit">
          Создать аккаунт
        </CButton>
      </CCol>
      <CCol xs="12">
        <Checkbox v-model="lettersAccepted">
          Получать письма с новостями и акциями
        </Checkbox>
        <Checkbox v-model="termsConfirmed">
          Я прочитал и соглашаюсь с условиями
          <NuxtLink
            class="form__button_link"
            to="terms"
          >
            Политики конфиденциальности
          </NuxtLink>
        </Checkbox>
      </CCol>
      <CCol xs="12">
        <p v-if="isInvalid" class="form__warning">
          Введённые данные невалидны. Попробуйте ещё раз.
        </p>
      </CCol>
      <CCol xs="12">
        <span class="form__change-form">
          У вас есть профиль?
          <CButton
            class="form__button_link"
            color="link"
            @click="$emit('changeForm', 'login')"
          >
            Войти в аккаунт
          </CButton>
        </span>
      </CCol>
    </template>
  </From>
</template>

<script lang="ts" setup>
import From from '@/components/UI/Form.vue';
import Checkbox from '@/components/UI/Checkbox.vue';

import { useUserStore } from '@/store/user';

withDefaults(defineProps<{
  header?: boolean
}>(), {
  header: true
});

const userStore = useUserStore();
const { updateUserInfo } = userStore;

const emit = defineEmits(['changeForm']);

const registFullname = ref('');
const registEmail = ref('');
const registPassword = ref('');
const registPasswordConfirm = ref('');
const lettersAccepted = ref(false);
const termsConfirmed = ref(false);

const isInvalid = ref(false);

const closeModal = () => { emit('changeForm', 'close'); };

const sendRegistRequest = async () => {
  if (!(
    registFullname.value !== '' &&
    useValidateEmail(registEmail.value) &&
    useValidatePassword(registPassword.value) &&
    (registPasswordConfirm.value === registPassword.value && registPasswordConfirm.value !== '') &&
    termsConfirmed.value)
  ) {
    isInvalid.value = true;
    return;
  }

  await $fetchApi<ServerResponseI<'', ''>>('/auth/regist', {
    method: 'post',
    body: {
      email: registEmail.value,
      password: registPassword.value,
      fullname: registFullname.value
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

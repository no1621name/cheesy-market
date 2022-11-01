<template>
  <div class="p-5">
    <h3 class="change-password__title">
      Сменить пароль <p>После смены пароля мы пришлем подтверждение на ваш электронный адрес</p>
    </h3>
    <Form :header="false" class="w-50">
      <CCol :xs="6" class="pe-3">
        <fieldset id="fieldsetOldPassword" class="form__form-group">
          <CFormLabel class="form__label" for="oldPasswordInput">
            Старый пароль:
          </CFormLabel>
          <CFormInput
            id="oldPasswordInput"
            v-model.trim="oldPassword"
            type="password"
            class="form__input"
            placeholder="Введите старый пароль"
          />
        </fieldset>
      </CCol>
      <CCol :xs="6">
        <fieldset id="fieldsetNewPassword" class="form__form-group">
          <CFormLabel class="form__label" for="newPasswordInput">
            Новый пароль:
          </CFormLabel>
          <CFormInput
            id="newPasswordInput"
            v-model.trim="newPassword"
            type="password"
            class="form__input"
            placeholder="Введите старый пароль"
          />
        </fieldset>
      </CCol>
      <CCol v-if="errorMsg" :xs="12">
        <p class="form__warning">
          {{ errorMsg }}
        </p>
      </CCol>
      <CCol :xs="4">
        <CButton class="button_success w-100" @click.prevent="sendChangePasswordRequest">
          Подтвердить
        </CButton>
      </CCol>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import Form from '@/components/UI/Form.vue';

import { useNotifierStore } from '@/store/notifier';

const oldPassword = ref('');
const newPassword = ref('');
const errorMsg = ref('');

const { addNotification } = useNotifierStore();

const sendChangePasswordRequest = async () => {
  if (!useValidatePassword(newPassword.value)) {
    errorMsg.value = 'Введите новый пароль корректно';
  }

  await $fetchApi('/users/reset', {
    method: 'PATCH',
    body: {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    },
    async onResponse({ response }) {
      if (response.ok) {
        addNotification({
          title: 'Вы успешно сменили пароль!',
          body: 'Проверьте почту',
          autohide: false,
          variant: 'success'
        });
      }
    },
    async onResponseError() {
      errorMsg.value = 'Вы неверно ввели свой текущий пароль';
    }
  }, false);
};
</script>

<style lang="scss" scoped>
.change-password__title {
  @include Heading2();
  color: $brown;
  text-transform: none;
  p{
    color: $darkGrey;
    font-size: 1rem;
    font-weight: normal;
    font-family: 'Roboto';
  }
}
</style>

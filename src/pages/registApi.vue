<template>
  <CContainer fluid class="d-flex justify-content-center pt-3">
    <CCol xs="5">
      <CForm>
        <h2>Hi, developer!</h2>
        <p>Thanks for using my api. If you want get full access, you need to get an api key. Then, you have to send it with header <em>'x-api-key'</em> with <b>every</b> request. For get an key just enter your email and submit form. Letter with key will be sended on entered email. Daily requests limit - 200 (if you need more, text me <a href="https://t.me/georges1621" class="text-info">in telegram</a>).</p>
        <fieldset>
          <CFormLabel>
            Your email:
          </CFormLabel>
          <CFormInput
            v-model.trim="email"
            placeholder="yourname@mail.com"
            @focus="msg = ''"
          />
        </fieldset>
        <p class="mt-3" :class="[success ? 'text-success' : 'text-danger']">
          {{ msg }}
        </p>
        <CCol
          v-if="pending"
          xs="12"
          class="d-flex justify-content-start my-3"
        >
          <Spinner small />
        </CCol>
        <CButton
          class="mt-2 p-3"
          :disabled="pending"
          @click.prevent="() => sendApiKeyReq('regist')"
        >
          Submit the form
        </CButton>
        <CButton
          class="mt-2 ms-3 p-3"
          :disabled="pending"
          @click.prevent="() => sendApiKeyReq('refresh')"
        >
          Refresh your token
        </CButton>
      </CForm>
    </CCol>
  </CContainer>
</template>

<script lang="ts" setup>
// this page is for registration in my open api - cheesyAPI

import Spinner from '@/components/UI/Spinner.vue';

definePageMeta({
  layout: false,
});

const email = ref('');
const msg = ref('');
const success = ref(false);
const pending = ref(false);

const sendApiKeyReq = async (type: 'regist' | 'refresh') => {
  if (useValidateEmail(email.value)) {
    pending.value = true;
    await $fetchApi(`/${type}`, {
      method: type === 'regist' ? 'post' : 'PATCH',
      body: {
        email: email.value
      },
      async onResponse({ response }) {
        msg.value = response._data.message;
        success.value = true;
        pending.value = false;
      },
      async onResponseError({ response }) {
        success.value = false;
        msg.value = response._data.message;
        pending.value = false;
      }
    });
  } else {
    msg.value = 'Please, enter a valid email';
  }
};
</script>

<style lang="scss" scoped>
input:focus{
  border-color: #6f42c1;
  box-shadow: 0 0 0 0.25rem rgba($color: #6f42c1, $alpha: .25);
}
button{
  background-color: #6f42c1;
  color: #fff;
  transition: .3s all linear;
  &:hover, &:focus{
    background-color: #fff !important;
    color: #6f42c1 !important;
    border: 1px solid #6f42c1 !important;
  }
}
</style>

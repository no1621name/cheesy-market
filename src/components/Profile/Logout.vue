<template>
  <div class="p-5">
    <CButton class="button_success" @click="sendLogoutRequest">
      Выйти из аккаунта
    </CButton>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';

const sendLogoutRequest = async () => {
  await $fetchApi('/users/logout', {
    method: 'POST',
    async onResponse() {
      await navigateTo('/');
      useUserStore().$state.isAuth = '';
    }
  });
};
</script>

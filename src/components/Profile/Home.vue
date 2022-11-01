<template>
  <div class="p-4">
    <ClientOnly>
      <template #default>
        <CRow class="justify-content-between align-items-start">
          <CCol :lg="8">
            <template v-if="forChange">
              <UserForm />
            </template>
            <template v-else>
              <CCol :xs="5">
                <h4 class="fw-bold brown m-0">
                  {{ userInfo.fullname }}
                </h4>
              </CCol>
              <CRow :xs="{gutterX: 0}">
                <CCol :lg="2" class="d-flex flex-column align-items-start">
                  <span class="darkened">
                    Телефон:
                  </span>
                  <span class="darkened">
                    Email:
                  </span>
                  <span class="darkened">
                    Адрес доставки:
                  </span>
                </CCol>
                <CCol :lg="4" class="d-flex flex-column align-items-start">
                  <span>
                    {{ userInfo.phoneNumber || 'Номер телефона не указан' }}
                  </span>
                  <span>
                    {{ userInfo.email }}
                  </span>
                  <span>
                    {{ `${userInfo.address.postcode}, Россия, ${userInfo.address.subject}, ${userInfo.address.city}, ${userInfo.address.apartment}` }}
                  </span>
                </CCol>
              </CRow>
            </template>
          </CCol>
          <CCol :lg="4" class="text-end">
            <CButton
              class="text-decoration-underline highlighted"
              @click="async () => {
                if(forChange) {
                  await userStore.saveUserData();
                }
                forChange = !forChange
              }"
            >
              {{ forChange ? 'Вернуться' : 'Редактировать информацию' }}
            </CButton>
          </CCol>
        </CRow>
      </template>
      <template #placeholder>
        <Spinner class="d-block mx-auto mt-3" />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import Spinner from '@/components/UI/Spinner.vue';
import UserForm from './UserFrom.vue';

import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const forChange = ref(false);
</script>

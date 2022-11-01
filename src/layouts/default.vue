<template>
  <NuxtLayout name="min">
    <template #beforeMain>
      <slot name="beforeMain" />
    </template>
    <template #default>
      <CRow :xl="{gutterX: 0}" :lg="{gutterX: 3}">
        <template #default>
          <CCol md="3" class="ps-0 pe-xl-3">
            <Suspense>
              <CategoriesList />
              <template #fallback>
                <CCol
                  lg="12"
                  class="d-flex justify-content-center pt-3"
                >
                  <Spinner large />
                </CCol>
              </template>
            </Suspense>
          </CCol>
          <CCol md="9" class="pe-0">
            <Suspense>
              <slot />
              <template #fallback>
                <CCol
                  lg="12"
                  class="d-flex justify-content-center pt-3"
                >
                  <p>Ждём доставки данных с сервера... (Он старается, не ругайтесь)</p>
                </CCol>
              </template>
            </Suspense>
          </CCol>
        </template>
      </CRow>
    </template>
    <template #afterMain>
      <slot name="afterMain" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
// import Notification from '@/components/Notification.vue';
import CategoriesList from '@/components/CategoriesList.vue';
import Spinner from '@/components/UI/Spinner.vue';
</script>

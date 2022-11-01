<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <Teleport to="body">
    <ClientOnly>
      <CToaster
        class="notification__list"
        placement="bottom-end"
      >
        <CToast
          v-for="(toast, index) in stack"
          :key="index"
          :class="['notification__item', toast.variant ? toast.variant === 'danger' ? 'bg-danger' : 'bg-success' : '']"
          :autohide="toast.autohide"
        >
          <CToastHeader
            class="notification__heading justify-content-between border-bottom"
            close-button
          >
            <h6 class="notification__title m-0">
              {{ toast.title }}
            </h6>
          </CToastHeader>
          <CToastBody class="notification__body" v-html="toast.body" />
        </CToast>
      </CToaster>
    </ClientOnly>
  </Teleport>
</template>

<script lang="ts" setup>
import { useNotifierStore } from '@/store/notifier';
import { storeToRefs } from 'pinia';

const notifier = useNotifierStore();
const { stack } = storeToRefs(notifier);

onBeforeUnmount(() => {
  notifier.clearNotifications();
});
</script>

<style lang="scss" scoped>
.notification__list .notification__item{
  position: relative;
  z-index: 10 !important;
  @include Roboto16();
  .notification__body {
    background-color: #FFFBED;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease, transform .5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

</style>

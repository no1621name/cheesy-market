<template>
  <div class="main-layout">
    <Header />
    <CContainer md class="p-0">
      <slot name="beforeMain" />
      <main class="main-layout__content d-flex align-items-center mb-3">
        <slot name="default" />
      </main>
      <slot name="afterMain" />
      <Footer />
    </CContainer>
    <Notification />
  </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
import Notification from '@/components/Notification.vue';

const worker = ref<Worker>();

const handleUnload = async (e: any) => {
  e.preventDefault();

  worker.value?.postMessage({
    userData: JSON.parse(localStorage.getItem('user') || '{}'),
    apiUrl: config.public.baseApiUrl,
    apiKey: config.public.apiKey,
  });

  worker.value?.addEventListener('message', (msgE: MessageEvent<{ ok: boolean }>) => {
    if (!msgE.data.ok) {
      throw new Error('Server error! Contact the creator');
    }
  });
};

const config = useRuntimeConfig();

onMounted(() => {
  worker.value = new Worker(new URL('../assets/workers/saveOnReload.ts', import.meta.url), { type: 'module' });

  window.addEventListener('beforeunload', handleUnload, { capture: true });
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleUnload);
});
</script>

<style lang="scss" scoped>
body{}
</style>

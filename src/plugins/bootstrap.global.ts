import BootstrapVue from '@coreui/bootstrap-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BootstrapVue);
});

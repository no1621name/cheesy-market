import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import { useNotifierStore } from '@/store/notifier';
let notifierStore;

export default <T, ET, >(response: _AsyncData<T, ET>, notFoundFallback = false, errorCallback: () => void = () => {
  if (process.client) {
    notifierStore = useNotifierStore();
    notifierStore.addServerError();
  }
}) => {
  if (response.error.value) {
    if (notFoundFallback) {
      errorCallback = async () => { await navigateTo('/404'); };
    }
    errorCallback();
  } else if (response.data.value) {
    return response.data.value;
  }
};

import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import { useNotifierStore } from '@/store/notifier';
let notifierStore;

export default <T, ET>(response: _AsyncData<T, ET>, errorCallback: () => void = () => {
  if (process.client) {
    notifierStore = useNotifierStore();
    notifierStore.addServerError();
  }
}) => {
  if (response.error.value || !response.data.value) {
    // eslint-disable-next-line no-console
    // console.log(response);
    errorCallback();
  } else if (response.data.value) {
    return response.data.value;
  }
};

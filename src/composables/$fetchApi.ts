import { FetchOptions } from 'ohmyfetch';
import { useNotifierStore } from '@/store/notifier';
let notifierStore;

export default <T, >(url: string, options?: FetchOptions, defaultErr = true) =>
  $fetch<T>(`/api${url}`, useMergeDeep({ ...options }, {
    onResponseError: defaultErr
      ? async () => {
        if (process.client) {
          notifierStore = useNotifierStore();
          notifierStore.addServerError();
        }
      }
      // eslint-disable-next-line no-console
      : async () => { console.log('Error'); },
  }));

import { FetchOptions } from 'ohmyfetch';

export default <T, > (name: string, url: string, options?: FetchOptions, asyncDataOptions?: { lazy: boolean }) =>
  useAsyncData<T>(name, () => $fetch(`/api${url}`, useMergeDeep({ ...options }, {
    credentials: 'include',
  })), asyncDataOptions);

import { FetchOptions } from 'ohmyfetch';

export default <T, > (url: string, options?: FetchOptions & { lazy?: boolean }) =>
  useFetch<T>(`/api${url}`, useMergeDeep({ ...options }, {
    credentials: 'include'
  }));

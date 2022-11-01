import { FetchOptions } from 'ohmyfetch';

export default <T, > (name: string, url: string, options?: FetchOptions, asyncDataOptions?: { lazy: boolean }) => {
  const { baseApiUrl, apiKey } = useRuntimeConfig().public;

  return useAsyncData<T>(name, () => $fetch(`/api${url}`, useMergeDeep({ ...options }, {
    headers: {
      'x-api-key': apiKey,
    },
    baseURL: baseApiUrl,
    credentials: 'include',
  })), asyncDataOptions);
};

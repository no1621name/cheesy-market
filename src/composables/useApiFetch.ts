import { FetchOptions } from 'ohmyfetch';

export default <T, > (url: string, options?: FetchOptions) => {
  const { baseApiUrl, apiKey } = useRuntimeConfig().public;

  return useFetch<T>(`/api${url}`, useMergeDeep({ ...options }, {
    headers: {
      'x-api-key': apiKey,
    },
    baseURL: baseApiUrl,
    credentials: 'include'
  }));
};

import { FetchOptions } from 'ohmyfetch';

export default defineEventHandler(async (e: any) => {
  const { baseApiUrl, apiKey } = useRuntimeConfig();
  const isPost = e.req.method === 'POST' || e.req.method === 'PATCH';
  const options: FetchOptions = {
    ...e.req,
    headers: {
      'x-api-key': apiKey,
      ...(e.req.headers as HeadersInit)
    }
  };

  if (isPost) {
    options.body = await readBody(e);
    options.onResponse = async ({ response }) => {
      const cookies = response.headers.get('set-cookie');
      if (cookies) {
        // FIXME
        cookies.split(/SameSite=\w+,/).forEach(c => setHeader(e, 'set-cookie', c));
      }
    };
  }

  const res = await $fetch<object>(`${baseApiUrl}${e.req.url || '/'}`, options);

  return { ...res };
});

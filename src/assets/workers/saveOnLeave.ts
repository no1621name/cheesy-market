
onmessage =  async function (e: MessageEvent<{userData: User, apiUrl: string, apiKey: string}>) {
  const { data } = e;
  const { userData, apiUrl, apiKey } = data;
  if (userData._id && apiUrl && apiKey) {
    fetch(`${apiUrl}/api/users`, {
      method: 'PATCH',
      headers: {
        'x-api-key': apiKey
      },
      credentials: 'include',
      body: JSON.stringify({ newUserData: data.userData }),
    })
      .then((res) => {
        if (res.ok) {
          self.postMessage({ ok: true });
        }
      })
      .catch(() => {
        self.postMessage({ ok: false });
      });
  }
};

const fetcher = (method, url, data, headers = {}) => new Promise((resolve, reject) => {
  const headerList = Object.assign(headers, {
    'Content-Type': 'application/json',
  });
  const config = {
    method,
    headers: new Headers(headerList), // eslint-disable-line no-undef
  };

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(data);
  }

  if (method === 'DELETE') {
    return fetch(url, config).then( // eslint-disable-line no-undef
      (response) => {
        if (response.ok) {
          resolve({ headers: response.headers });
        }
      },
    ).catch((err) => {
      console.error('Error:', err);
    });
  }

  return fetch(url, config).then( // eslint-disable-line no-undef
    (response) => {
      if (response.ok) {
        response
          .json()
          .then((respJSON) => (respJSON.error
            ? reject(respJSON) : resolve({ headers: response.headers, data: respJSON })));
      } else {
        response
          .json()
          .then((respJSON) => reject(respJSON));
      }
    },
  ).catch((err) => {
    console.error('Error:', err);
  });
});

const fetchData = {
  get: (url, headers) => fetcher('GET', url, null, headers),
  post: (url, body, headers) => fetcher('POST', url, body, headers),
  delete: (url, headers) => fetcher('DELETE', url, null, headers),
  put: (url, body, headers) => fetcher('PUT', url, body, headers),
};

export default fetchData;

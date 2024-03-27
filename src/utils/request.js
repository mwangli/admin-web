const fetch = require("dva").fetch;

export async function request(url, options) {

  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...options.headers,
  }
  options.body = JSON.stringify(options.body);
  return await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

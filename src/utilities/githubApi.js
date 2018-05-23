import request from 'request';
import { promisify } from 'util';

const baseUrl = 'https://api.github.com';

const get = (path, account, token) =>
  new Promise((resolve, reject) => {
    const requestPost = promisify(request.get);

    requestPost(buildOptions(path, account, token))
      .then(validateResponse)
      .then(resolve)
      .catch(reject);
  });

const post = (path, account, token, body) =>
  new Promise((resolve, reject) => {
    const requestPost = promisify(request.post);

    requestPost(buildOptions(path, account, token, body))
      .then(validateResponse)
      .then(resolve)
      .catch(reject);
  });

const patch = (path, account, token, body) =>
  new Promise((resolve, reject) => {
    const requestPatch = promisify(request.patch);

    requestPatch(buildOptions(path, account, token, body))
      .then(validateResponse)
      .then(resolve)
      .catch(reject);
  });

const remove = (path, account, token) =>
  new Promise((resolve, reject) => {
    const requestRemove = promisify(request.delete);

    requestRemove(buildOptions(path, account, token))
      .then(validateResponse)
      .then(resolve)
      .catch(reject);
  });

const buildOptions = (path, account, token, body) => {
  let options = {
    url: `${baseUrl}${path}`,
    headers: {
      Authorization: `Basic ${new Buffer(`${account}:${token}`).toString(
        'base64'
      )}`,
      'User-Agent': account
    }
  };

  options = body
    ? Object.assign(options, { body: `{"body": "${body}"}` })
    : options;

  return options;
};

const validateResponse = ({ body, statusCode }) => {
  if (isBadResult(statusCode)) throw body;
  return body;
};

const isBadResult = code => !`${code}`.startsWith('2');

export default {
  post,
  get,
  patch,
  remove
};

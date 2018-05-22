import { promisify } from 'util';
import request from 'request';

const comment = ({ account, token, repository, commentId }) =>
  new Promise((resolve, reject) => {
    const removeCommentOptions = {
      url: `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`,
      headers: {
        Authorization: `Basic ${new Buffer(`${account}:${token}`).toString(
          'base64'
        )}`,
        'User-Agent': account
      }
    };

    const remove = promisify(request.delete);

    remove(removeCommentOptions)
      .then(({ body, statusCode }) => {
        if (isBadResult(statusCode)) throw body;
        return body;
      })
      .then(resolve)
      .catch(reject);
  });

const isBadResult = code => !`${code}`.startsWith('2');

export default {
  comment
};

import { promisify } from 'util';
import request from 'request';

const comment = ({ account, token, repository, commentId, updatedComment }) =>
  new Promise((resolve, reject) => {
    const patchCommentOptions = {
      url: `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`,
      headers: {
        Authorization: `Basic ${new Buffer(`${account}:${token}`).toString(
          'base64'
        )}`,
        'User-Agent': account
      },
      body: `{"body": "${updatedComment}"}`
    };

    const patch = promisify(request.patch);

    patch(patchCommentOptions)
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

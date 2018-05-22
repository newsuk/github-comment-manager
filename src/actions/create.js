import { promisify } from 'util';
import request from 'request';

const comment = ({ account, token, repository, comment, pullRequest }) =>
  new Promise((resolve, reject) => {
    const postCommentOptions = {
      url: `https://api.github.com/repos/${account}/${repository}/issues/${pullRequest}/comments`,
      headers: {
        Authorization: `Basic ${new Buffer(`${account}:${token}`).toString(
          'base64'
        )}`,
        'User-Agent': account
      },
      body: `{"body": "${comment}"}`
    };

    const post = promisify(request.post);

    post(postCommentOptions)
      .then(({ body, statusCode }) => {
        const statusCodeString = `${statusCode}`;
        if (!statusCodeString.startsWith('2')) reject(body);
        resolve();
      })
      .catch(reject);
  });

export default {
  comment
};

import request from 'request';

const comment = ({ account, token, commentId, repository }) =>
  new Promise((resolve, reject) => {
    const deleteOptions = {
      url: `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`,
      headers: {
        Authorization: `Basic ${new Buffer(`${account}:${token}`).toString(
          'base64'
        )}`,
        'User-Agent': account
      }
    };

    request.delete(deleteOptions, error => {
      if (error) reject(error);
      resolve();
    });
  });

export default {
  comment
};

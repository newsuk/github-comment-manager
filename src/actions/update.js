import request from 'request';

const comment = ({ account, token, commentId, repository, updatedComment }) =>
  new Promise((resolve, reject) => {
    const postCommentOptions = {
      url: `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`,
      headers: {
        Authorization: `Basic ${new Buffer(`${account}:${token}`).toString(
          'base64'
        )}`,
        'User-Agent': account
      },
      body: `{"body": "${updatedComment}"}`
    };

    request.patch(postCommentOptions, error => {
      if (error) reject(error);
      resolve();
    });
  });

export default {
  comment
};

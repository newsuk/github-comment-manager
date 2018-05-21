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

    request.post(postCommentOptions, (error, response, body) => {
      const statusCodeString = `${response.statusCode}`;
      if (!statusCodeString.startsWith('2')) reject(body);
      if (error) reject(error);
      resolve();
    });
  });

export default {
  comment
};

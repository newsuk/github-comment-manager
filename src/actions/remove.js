import githubApi from '../utilities/githubApi';

const comment = ({ account, token, repository, commentId }) =>
  githubApi.remove(
    `/repos/${account}/${repository}/issues/comments/${commentId}`,
    account,
    token
  );

export default {
  comment
};

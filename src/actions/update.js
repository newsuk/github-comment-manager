import githubApi from '../utilities/githubApi';

const comment = ({ account, token, repository, commentId, updatedComment }) =>
  githubApi.patch(
    `/repos/${account}/${repository}/issues/comments/${commentId}`,
    account,
    token,
    updatedComment
  );

export default {
  comment
};

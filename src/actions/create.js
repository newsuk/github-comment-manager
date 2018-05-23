import githubApi from '../utilities/githubApi';

const comment = ({ account, token, repository, comment, pullRequest }) =>
  githubApi.post(
    `/repos/${account}/${repository}/issues/${pullRequest}/comments`,
    account,
    token,
    comment
  );

export default {
  comment
};

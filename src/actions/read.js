import githubApi from '../utilities/githubApi';

const comments = ({ account, token, repository, pullRequest }) =>
  githubApi.get(
    `/repos/${account}/${repository}/issues/${pullRequest}/comments`,
    account,
    token
  );

export default {
  comments
};

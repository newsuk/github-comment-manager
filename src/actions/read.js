import { createApolloFetch } from 'apollo-fetch';

const apolloFetch = createApolloFetch({
  uri: 'https://api.github.com/graphql'
});

const comments = ({ account, token, repository, pullRequest }) => {
  setAuthentication(token);

  return apolloFetch({
    query: `query IssueCount($owner: String!, $repository: String!, $pullRequest: Int!) {
        repository(owner: $owner, name: $repository) {
          pullRequest(number: $pullRequest) {
            comments(first: 10) {
              edges {
                node {
                  body
                  author {
                    login
                  }
                  databaseId
                }
              }
            }
          }
        }
      }`,
    variables: {
      repository,
      pullRequest,
      owner: account
    }
  })
    .then(processAnyErrors)
    .then(processComments);
};

const setAuthentication = accountkey => {
  apolloFetch.use(({ options }, next) => {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = {
        authorization: `bearer ${accountkey}`
      };
    }
    next();
  });
};

const processAnyErrors = response => {
  if (response.errors) throw response.errors;
  return response;
};

const processComments = response =>
  response.data.repository.pullRequest.comments.edges.map(result => ({
    id: result.node.databaseId,
    comment: result.node.body,
    author: result.node.author
  }));

export default {
  comments
};

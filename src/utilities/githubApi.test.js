import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'request';
import githubApi from './githubApi';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('githubApi', () => {
  const expectedAccount = 'tools';
  const expectedToken = 'super-secret-token';
  const expectedBody = 'body content';
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  describe('post', () => {
    it('should post', async () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments';

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const postStub = sandbox
        .stub(request, 'post')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      githubApi.post(
        expectedPath,
        expectedAccount,
        expectedToken,
        expectedBody
      );

      // Verify.
      postStub.should.have.been.calledOnce;
      postStub.firstCall.args[0].url.should.equal(
        `https://api.github.com${expectedPath}`
      );
      postStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjcmV0LXRva2Vu'
      );
      postStub.firstCall.args[0].headers['User-Agent'].should.equal(
        expectedAccount
      );
      postStub.firstCall.args[0].body.should.equal(
        `{"body": "${expectedBody}"}`
      );
    });

    it('should reject with an error when a none 2xx status code is received', () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments';

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'post')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      const post = githubApi.post(
        expectedPath,
        expectedAccount,
        expectedToken,
        expectedBody
      );

      // Verify.
      return post.should.have.rejectedWith(responseBody);
    });
  });

  describe('get', () => {
    it('should get', async () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments';

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const getStub = sandbox
        .stub(request, 'get')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      githubApi.get(expectedPath, expectedAccount, expectedToken);

      // Verify.
      getStub.should.have.been.calledOnce;
      getStub.firstCall.args[0].url.should.equal(
        `https://api.github.com${expectedPath}`
      );
      getStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjcmV0LXRva2Vu'
      );
      getStub.firstCall.args[0].headers['User-Agent'].should.equal(
        expectedAccount
      );
    });

    it('should reject with an error when a none 2xx status code is received', () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments';

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'get')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      const patch = githubApi.get(
        expectedPath,
        expectedAccount,
        expectedToken,
        expectedBody
      );

      // Verify.
      return patch.should.have.rejectedWith(responseBody);
    });
  });

  describe('patch', () => {
    it('should patch', async () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments';

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const patchStub = sandbox
        .stub(request, 'patch')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      githubApi.patch(
        expectedPath,
        expectedAccount,
        expectedToken,
        expectedBody
      );

      // Verify.
      patchStub.should.have.been.calledOnce;
      patchStub.firstCall.args[0].url.should.equal(
        `https://api.github.com${expectedPath}`
      );
      patchStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjcmV0LXRva2Vu'
      );
      patchStub.firstCall.args[0].headers['User-Agent'].should.equal(
        expectedAccount
      );
      patchStub.firstCall.args[0].body.should.equal(
        `{"body": "${expectedBody}"}`
      );
    });

    it('should reject with an error when a none 2xx status code is received', () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments';

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'patch')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      const patch = githubApi.patch(
        expectedPath,
        expectedAccount,
        expectedToken,
        expectedBody
      );

      // Verify.
      return patch.should.have.rejectedWith(responseBody);
    });
  });

  describe('remove', () => {
    it('should remove', async () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments/10';

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const removeStub = sandbox
        .stub(request, 'delete')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      githubApi.remove(expectedPath, expectedAccount, expectedToken);

      // Verify.
      removeStub.should.have.been.calledOnce;
      removeStub.firstCall.args[0].url.should.equal(
        `https://api.github.com${expectedPath}`
      );
      removeStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjcmV0LXRva2Vu'
      );
      removeStub.firstCall.args[0].headers['User-Agent'].should.equal(
        expectedAccount
      );
    });

    it('should reject with an error when a none 2xx status code is received', () => {
      // Setup.
      const expectedPath =
        '/repos/newsuk/github-comment-manager/issues/3/comments/10';

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'delete')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      const patch = githubApi.remove(
        expectedPath,
        expectedAccount,
        expectedToken,
        expectedBody
      );

      // Verify.
      return patch.should.have.rejectedWith(responseBody);
    });
  });
});

import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'request';
import create from './create';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('create', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  describe('comment', () => {
    it('should create a comment', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const comment = 'I am a new comment';
      const pullRequest = 9000;

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const postStub = sandbox
        .stub(request, 'post')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      await create.comment({
        account,
        token,
        repository,
        comment,
        pullRequest
      });

      // Verify.
      postStub.should.have.been.calledOnce;
      postStub.firstCall.args[0].url.should.equal(
        `https://api.github.com/repos/tools/${repository}/issues/${pullRequest}/comments`
      );
      postStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjdXJlLXRva2Vu'
      );
      postStub.firstCall.args[0].headers['User-Agent'].should.equal(account);
      postStub.firstCall.args[0].body.should.equal(`{"body": "${comment}"}`);
    });

    it('should reject with an error when a none 2xx status code is received', () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const comment = 'I am a new comment';
      const pullRequest = 9000;

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'post')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      const createAction = create.comment({
        account,
        token,
        repository,
        comment,
        pullRequest
      });

      // Verify.
      return createAction.should.have.rejectedWith(responseBody);
    });
  });
});

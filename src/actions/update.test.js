import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'request';
import update from './update';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('update', () => {
  var sandbox;

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  describe('comment', () => {
    it('should update a comment', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const commentId = 123456789;
      const repository = 'github-comment-manager';
      const updatedComment = 'I am an updated comment';

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const patchStub = sandbox
        .stub(request, 'patch')
        .callsArgWith(1, error, response, responseBody);

      await update.comment({
        account,
        token,
        commentId,
        repository,
        updatedComment
      });

      // Verify.
      patchStub.should.have.been.calledOnce;
      patchStub.firstCall.args[0].url.should.equal(
        `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`
      );
      patchStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjdXJlLXRva2Vu'
      );
      patchStub.firstCall.args[0].headers['User-Agent'].should.equal(account);
      patchStub.firstCall.args[0].body.should.equal(
        `{"body": "${updatedComment}"}`
      );
    });

    it('should reject with an error when a none 2xx status code is received', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const commentId = 123456789;
      const repository = 'github-comment-manager';
      const updatedComment = 'I am an updated comment';

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'patch')
        .callsArgWith(1, error, response, responseBody);

      const updateAction = update.comment({
        account,
        token,
        commentId,
        repository,
        updatedComment
      });

      // Verify.
      return updateAction.should.have.rejectedWith(responseBody);
    });
  });
});

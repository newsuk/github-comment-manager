import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'request';
import deleteAction from './delete';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('delete', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  describe('comment', () => {
    it('should delete a comment', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const commentId = 123456789;

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const deleteStub = sandbox
        .stub(request, 'delete')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      await deleteAction.comment({
        account,
        token,
        repository,
        commentId
      });

      // Verify.
      deleteStub.should.have.been.calledOnce;
      deleteStub.firstCall.args[0].url.should.equal(
        `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`
      );
      deleteStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjdXJlLXRva2Vu'
      );
      deleteStub.firstCall.args[0].headers['User-Agent'].should.equal(account);
    });

    it('should reject with an error when a none 2xx status code is received', () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const commentId = 123456789;

      const error = null;
      const responseBody = 'Not Found';
      const response = { body: responseBody, statusCode: '404' };
      sandbox
        .stub(request, 'delete')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      const deleteCommentAction = deleteAction.comment({
        account,
        token,
        repository,
        commentId
      });

      // Verify.
      return deleteCommentAction.should.have.rejectedWith(responseBody);
    });
  });
});

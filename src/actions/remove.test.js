import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'request';
import remove from './remove';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('remove', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  describe('comment', () => {
    it('should remove a comment', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const commentId = 123456789;

      const error = null;
      const responseBody = 'success';
      const response = { body: responseBody, statusCode: '200' };
      const removeStub = sandbox
        .stub(request, 'delete')
        .callsArgWith(1, error, response, responseBody);

      // Exercise.
      await remove.comment({
        account,
        token,
        repository,
        commentId
      });

      // Verify.
      removeStub.should.have.been.calledOnce;
      removeStub.firstCall.args[0].url.should.equal(
        `https://api.github.com/repos/${account}/${repository}/issues/comments/${commentId}`
      );
      removeStub.firstCall.args[0].headers.Authorization.should.equal(
        'Basic dG9vbHM6c3VwZXItc2VjdXJlLXRva2Vu'
      );
      removeStub.firstCall.args[0].headers['User-Agent'].should.equal(account);
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
      const removeAction = remove.comment({
        account,
        token,
        repository,
        commentId
      });

      // Verify.
      return removeAction.should.have.rejectedWith(responseBody);
    });
  });
});

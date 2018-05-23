import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import remove from './remove';
import githubApi from '../utilities/githubApi';

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

      const apiStub = sandbox.stub(githubApi, 'remove').resolves();

      // Exercise.
      const removeAction = remove.comment({
        account,
        token,
        repository,
        commentId
      });

      // Verify.
      await removeAction.should.be.fulfilled;
      apiStub.should.have.been.calledOnce;
      apiStub.should.have.been.calledWith(
        `/repos/${account}/${repository}/issues/comments/${commentId}`,
        account,
        token
      );
    });

    it('should reject when there is an error', () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const commentId = 123456789;

      sandbox.stub(githubApi, 'remove').rejects();

      // Exercise.
      const removeAction = remove.comment({
        account,
        token,
        repository,
        commentId
      });

      // Verify.
      return removeAction.should.have.rejected;
    });
  });
});

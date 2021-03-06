import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import update from './update';
import githubApi from '../utilities/githubApi';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('update', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  describe('comment', () => {
    it('should update a comment', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const commentId = 123456789;
      const updatedComment = 'I am an updated comment';

      const apiStub = sandbox.stub(githubApi, 'patch').resolves();

      // Exercise.
      const updateAction = update.comment({
        account,
        token,
        repository,
        commentId,
        updatedComment
      });

      // Verify.
      await updateAction.should.be.fulfilled;
      apiStub.should.have.been.calledOnce;
      apiStub.should.have.been.calledWith(
        `/repos/${account}/${repository}/issues/comments/${commentId}`,
        account,
        token,
        updatedComment
      );
    });

    it('should reject when there is an error', () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const commentId = 123456789;
      const updatedComment = 'I am an updated comment';

      sandbox.stub(githubApi, 'patch').rejects();

      // Exercise.
      const updateAction = update.comment({
        account,
        token,
        repository,
        commentId,
        updatedComment
      });

      // Verify.
      return updateAction.should.have.rejected;
    });
  });
});

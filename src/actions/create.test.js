import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import create from './create';
import githubApi from '../utilities/githubApi';

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

      const apiStub = sandbox.stub(githubApi, 'post').resolves();

      // Exercise.
      const createAction = create.comment({
        account,
        token,
        repository,
        comment,
        pullRequest
      });

      // Verify.
      await createAction.should.be.fulfilled;
      apiStub.should.have.been.calledOnce;
      apiStub.should.have.been.calledWith(
        `/repos/${account}/${repository}/issues/${pullRequest}/comments`,
        account,
        token,
        comment
      );
    });

    it('should reject when there is an error', () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const comment = 'I am a new comment';
      const pullRequest = 9000;
      sandbox.stub(githubApi, 'post').rejects();

      // Exercise.
      const createAction = create.comment({
        account,
        token,
        repository,
        comment,
        pullRequest
      });

      // Verify.
      return createAction.should.have.rejected;
    });
  });
});

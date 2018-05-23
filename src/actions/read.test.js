import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import read from './read';
import githubApi from '../utilities/githubApi';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('read', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  describe('comment', () => {
    it('should read the PR comments', async () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const pullRequest = 9000;

      const apiStub = sandbox.stub(githubApi, 'get').resolves();

      // Exercise.
      const readAction = read.comments({
        account,
        token,
        repository,
        pullRequest
      });

      // Verify.
      await readAction.should.be.fulfilled;
      apiStub.should.have.been.calledOnce;
      apiStub.should.have.been.calledWith(
        `/repos/${account}/${repository}/issues/${pullRequest}/comments`,
        account,
        token
      );
    });

    it('should reject when there is an error', () => {
      // Setup.
      const account = 'tools';
      const token = 'super-secure-token';
      const repository = 'github-comment-manager';
      const pullRequest = 9000;
      sandbox.stub(githubApi, 'get').rejects();

      // Exercise.
      const readAction = read.comments({
        account,
        token,
        repository,
        pullRequest
      });

      // Verify.
      return readAction.should.have.rejected;
    });
  });
});

import GithubPage from '../pageobjects/github.page';
import {Reporter} from "../utils/Reporter";

describe('Navigate to Angles', () => {
    it('should see banner', async () => {
        await GithubPage.open();
        Reporter.info('Waiting to see banner')
        await expect(GithubPage.githubLink).toBeExisting();
    });
});


import GithubPage from '../pageobjects/github.page';
import {Reporter} from "../utils/Reporter";
import {ScreenshotRequest} from "../utils/ScreenshotRequest";

describe('Navigate to Angles', () => {

    it('should see banner', async () => {
        await GithubPage.open();
        Reporter.info('Waiting to see banner')
        await expect(GithubPage.githubLink).toBeExisting();
        let request = new ScreenshotRequest('view_1', ['wdio', 'chrome']);
        await Reporter.takeScreenshot(request);
    });

    it('should see banner 2', async () => {
        Reporter.info('Waiting to see banner')
        await expect(GithubPage.githubLink).toBeExisting();
        let request = new ScreenshotRequest('view_1', ['wdio', 'chrome']);
        await Reporter.takeScreenshot(request);
    });
});


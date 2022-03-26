import GithubPage from '../pageobjects/github.page';
import {Reporter} from "../utils/Reporter";
import {ScreenshotRequest} from "../utils/ScreenshotRequest";

describe('Navigate to Angles', async () => {

    it('Github page screenshot should match baseline', async () => {
        await GithubPage.open();
        await expect(GithubPage.githubLink).toBeExisting();
        let request = new ScreenshotRequest('view_1', ['wdio', 'chrome']);
        const screenshot = await Reporter.takeScreenshot(request);
        // expect no more than 1% difference (can be set to 0.01 for more accuracy).
        await Reporter.compareScreenshotAgainstBaseline(screenshot._id, 1.0);
    });
});


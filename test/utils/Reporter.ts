import anglesReporter from "angles-javascript-client";
import {BuildParameters} from "./BuildParameters";
import {ScreenshotRequest} from "./ScreenshotRequest";
import moment = require("moment");
import {Screenshot} from "angles-javascript-client/dist/lib/models/Screenshot";
import {ScreenshotPlatform} from "angles-javascript-client/dist/lib/models/requests/ScreenshotPlatform";

export class Reporter {

    static info(info: string) {
        if (BuildParameters.isAnglesEnabled) {
            try {
                anglesReporter.info(info);
            } catch (exception) {
                console.error(exception);
            }
        }
        console.info(info);
    }

    static addAction(action: string) {
        if (BuildParameters.isAnglesEnabled) {
            try {
                anglesReporter.addAction(action);
            } catch (exception) {
                console.error(exception);
            }
        }
        console.info(`Action: ${action}`);
    }

    static pass(step: string, expected: string, actual: string, info: string) {
        if (BuildParameters.isAnglesEnabled) {
            try {
                anglesReporter.pass(step, expected, actual, info);
            } catch (exception) {
                console.error(exception);
            }
        }
        console.info(`Pass: ${step}`);
    }

    static fail(step: string, expected: string, actual: string, info: string) {
        if (BuildParameters.isAnglesEnabled) {
            try {
                anglesReporter.fail(step, expected, actual, info);
            } catch (exception) {
                console.error(exception);
            }
        }
        console.warn(`Fail: ${step}`);
    }

    static async takeScreenshot() {
        const timeStamp:string = moment(new Date()).format('YYYY-MM-DD_HH-mm-ss-SSS');
        let fs = require('fs');
        let dir = './build/screenshots/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        const screenshotPath: string = `./build/screenshots/screenshot_${timeStamp}.png`;
        await browser.saveScreenshot(screenshotPath);

        if (BuildParameters.isAnglesEnabled) {
            let platform = new ScreenshotPlatform();
            // @ts-ignore
            const { platformName, platformVersion, browserName, browserVersion } = browser.capabilities;
            platform.platformName = platformName;
            if (platformVersion) {
                platform.platformVersion = platformVersion;
            }
            platform.browserName = browserName;
            platform.browserVersion = browserVersion;
            const screenshot: Screenshot = await anglesReporter.saveScreenshotWithPlatform(screenshotPath, '', [], platform);
            anglesReporter.infoWithScreenshot(`Took screenshot`, screenshot._id);
            return screenshot;
        }
    }

    static async takeScreenshotWithRequest(screenshotRequest: ScreenshotRequest): Promise<Screenshot> {
        const { view, tags } = screenshotRequest;
        const timeStamp:string = moment(new Date()).format('YYYY-MM-DD_HH-mm-ss-SSS');
        let fs = require('fs');
        let dir = './build/screenshots/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        const screenshotPath: string = `./build/screenshots/${view}_${timeStamp}.png`;
        await browser.saveScreenshot(screenshotPath);

        if (BuildParameters.isAnglesEnabled) {
            let platform = new ScreenshotPlatform();
            // @ts-ignore
            const { platformName, platformVersion, browserName, browserVersion } = browser.capabilities;
            platform.platformName = platformName;
            if (platformVersion) {
                platform.platformVersion = platformVersion;
            }
            platform.browserName = browserName;
            platform.browserVersion = browserVersion;
            const screenshot: Screenshot = await anglesReporter.saveScreenshotWithPlatform(screenshotPath, view, tags, platform);
            anglesReporter.infoWithScreenshot(`Took screenshot for view ${view} with tags [${tags}]`, screenshot._id);
            return screenshot;
        }
    }

    static async compareScreenshotAgainstBaseline(screenshotId: string, tolerance: number) {
        const result = await anglesReporter.compareScreenshotAgainstBaseline(screenshotId);
        if (result) {
            const { misMatchPercentage: mismatch } = result;
            let misMatchNumber = parseFloat(String(mismatch));
            if (misMatchNumber <= tolerance) {
                this.pass('Baseline compare', `Tolerance [${tolerance}] to be greater than mismatch [${misMatchNumber}]`, 'Tolerance is greater', `Comparison for image [${screenshotId}], details: ${JSON.stringify(result)}`)
            } else {
                this.fail('Baseline compare', `Tolerance [${tolerance}] to be greater than mismatch [${misMatchNumber}]`, 'Tolerance is smaller', `Comparison for image [${screenshotId}], details: ${JSON.stringify(result)}`)
                expect(misMatchNumber).toBeLessThan(tolerance);
            }
        } else {
            console.log("No baseline set.");
        }
    }
}

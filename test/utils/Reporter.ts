import anglesReporter from "angles-javascript-client";
import {BuildParameters} from "./BuildParameters";

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
}

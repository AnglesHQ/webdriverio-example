import {BuildParameters} from "../utils/BuildParameters";

class GithubPage {
    /**
     * define selectors using getter methods
     */
    get githubLink () { return $('#forkme_banner') }

    open () {
        return browser.url(BuildParameters.baseURL)
    }
}

export default new GithubPage();

var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-multi-browser',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.browserList=["chromeLatest","firefoxLatest"]
    createTestCombination(defaultCombination);
});

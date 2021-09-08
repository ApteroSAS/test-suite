var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-default',  () => {
    let defaultCombination = getDefaultCombination();
    createTestCombination(defaultCombination);
});

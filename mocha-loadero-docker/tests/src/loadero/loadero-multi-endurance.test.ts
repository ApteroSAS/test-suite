var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-multi-endurance',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.enduranceNumberList=[10];
    createTestCombination(defaultCombination);
});

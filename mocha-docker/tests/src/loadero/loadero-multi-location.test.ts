var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-multi-location',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.locationList=["us-west-2"]//TODO add SA
    createTestCombination(defaultCombination);
});

var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-simple',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.participantNumberList=[1]
    createTestCombination(defaultCombination);
});

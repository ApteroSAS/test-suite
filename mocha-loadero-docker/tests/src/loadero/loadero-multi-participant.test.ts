var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-multi-participant',  () => {
    let defaultCombination = getDefaultCombination();
    //defaultCombination.participantNumberList=[10,25,50,100,250,500];//TODO
    defaultCombination.participantNumberList=[10,25]
    createTestCombination(defaultCombination);
});

var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-multi-hardware',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.hardwareList=["g0.5","g1","g2","g4","g6"]
    createTestCombination(defaultCombination);
});

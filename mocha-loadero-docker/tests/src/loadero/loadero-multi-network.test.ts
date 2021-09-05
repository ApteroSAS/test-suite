var expect = require('chai').expect;
import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";


describe('loadero-multi-network',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.networkList=["default","4g","3g","5packet","50packet","100packet","asymmetric","jitter","latency","hsdpa"];
    createTestCombination(defaultCombination);
});

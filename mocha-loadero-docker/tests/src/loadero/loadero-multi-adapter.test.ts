var expect = require('chai').expect;

import {createTestCombination, getDefaultCombination} from "~/loadero/TFactory";

describe('loadero-multi-adapter',  () => {
    let defaultCombination = getDefaultCombination();
    defaultCombination.testNameList=["CI_test_twilio","CI_test_agora","CI_test_dialog","CI_test_none"]
    createTestCombination(defaultCombination);
});

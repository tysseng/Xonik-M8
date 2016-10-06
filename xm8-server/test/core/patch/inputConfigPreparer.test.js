import chai from 'chai';
import { expect } from 'chai';
import { prepareInputs } from '../../../core/patch/inputConfigPreparer';

import physicalInputs from './mockedInputs/physical-inputs-for-serialization';

chai.should();

describe('Input config preparation:', function() {

  describe('Options:', function () {

    let preparedInputs = prepareInputs(physicalInputs);

    it('should convert option values to a list', function () {
      let optionValues = preparedInputs.IN_OSC_1_TRIANGLE.optionValues;
      optionValues.length.should.equal(4);
      optionValues[3].should.equal(24576);
    });

    it('should convert option midi values to a list', function () {
      let optionValuesMidi = preparedInputs.IN_OSC_1_TRIANGLE.optionValuesMidi;
      optionValuesMidi.length.should.equal(4);
      optionValuesMidi[3].should.equal(96);
    });
  });
});

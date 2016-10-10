import chai from 'chai';
import { expect } from 'chai';
import { prepareInputs } from '../../../core/patch/inputConfigPreparer';
import { inputStepGenerationTypesById } from '../../../shared/inputs/InputStepsGenerationTypes';

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

    it('should add input generation mode hwId', function () {
      let hwId = preparedInputs.IN_OSC_1_TRIANGLE.stepGenerationModeHwId;
      hwId.should.equal(inputStepGenerationTypesById.OPTIONS.hwId);
    });

    it('should set min to 0 if not set', function () {
      let min = preparedInputs.IN_OSC_1_TRIANGLE.min;
      min.should.equal(0);
    });

    it('should set max to 32767 if not set', function () {
      let max = preparedInputs.IN_OSC_1_TRIANGLE.max;
      max.should.equal(32767);
    });

    it('should calculate interval if number of steps is set', function () {
      let stepInterval = preparedInputs.IN_OSC_1_SAW.stepInterval;
      stepInterval.should.equal(8191);
    });


    it('should set number of steps to 0 if not set', function () {
      let numberOfSteps = preparedInputs.IN_OSC_1_SQUARE.numberOfSteps;
      let stepInterval = preparedInputs.IN_OSC_1_SQUARE.stepInterval;

      numberOfSteps.should.equal(1);
      stepInterval.should.equal(32767);
    });
  });
});

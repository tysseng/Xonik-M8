import chai from 'chai';
import { expect } from 'chai';
import { prepareInputs } from '../../../core/patch/inputConfigPreparer';
import { inputStepGenerationTypesById } from '../../../shared/inputs/InputStepsGenerationTypes';

import physicalInputs from './mockedInputs/physical-inputs-for-serialization';
import { inputWithOptions, inputWithNumberOfSteps, inputWithNumberOfStepsNotSet, inputWithPredefinedStepInterval, inputWithContinousInterval } from './mockedInputs/physical-inputs-for-serialization';

chai.should();

describe('Input config preparation:', function() {

  let preparedInputs = prepareInputs(physicalInputs, 0);

  describe('Options:', function () {

    let withOptions = preparedInputs[inputWithOptions.id];

    it('should convert option values to a list', function () {
      let optionValues = withOptions.optionValues;
      optionValues.length.should.equal(4);
      optionValues[3].should.equal(24576);
    });

    it('should convert option midi values to a list', function () {
      let optionValuesMidi = withOptions.optionValuesMidi;
      optionValuesMidi.length.should.equal(4);
      optionValuesMidi[3].should.equal(96);
    });

    it('should set options length as stepGenerationValue', function () {
      let numberOfOptions = withOptions.stepGenerationValue;
      numberOfOptions.should.equal(4);
    });
  });

  describe('Range fields:', function () {

    let input = preparedInputs[inputWithOptions.id];

    it('should add input generation mode hwId', function () {
      let hwId = input.stepGenerationModeHwId;
      hwId.should.equal(inputStepGenerationTypesById.OPTIONS.hwId);
    });

    it('should set min to 0 if not set', function () {
      let min = input.min;
      min.should.equal(0);
    });

    it('should set max to 32767 if not set', function () {
      let max = input.max;
      max.should.equal(32767);
    });
  });

  describe('Other step generation fields:', function () {

    it('should calculate interval if number of steps is set', function () {
      let withNumberOfSteps = preparedInputs[inputWithNumberOfSteps.id];
      let stepInterval = withNumberOfSteps.stepGenerationValue;
      stepInterval.should.equal(8191);
    });

    it('should set number of steps to 1 if not set', function () {
      let withNumberOfStepsNotSet = preparedInputs[inputWithNumberOfStepsNotSet.id];
      let numberOfSteps = withNumberOfStepsNotSet.numberOfSteps;
      let stepInterval = withNumberOfStepsNotSet.stepGenerationValue;

      numberOfSteps.should.equal(1);
      stepInterval.should.equal(32767);
    });

    it('should set value to step interval if mode is predefined interval', function () {
      let withInterval = preparedInputs[inputWithPredefinedStepInterval.id];
      let stepInterval = withInterval.stepGenerationValue;
      stepInterval.should.equal(10000);
    });

    it('should set value to 1 if mode is continous', function () {
      let withContinous = preparedInputs[inputWithContinousInterval.id];
      let stepInterval = withContinous.stepGenerationValue;
      stepInterval.should.equal(1);
    });


  });
});

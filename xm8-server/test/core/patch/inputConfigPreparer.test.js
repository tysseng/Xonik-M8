import chai from 'chai';
import { expect } from 'chai';
import { prepareInputs } from '../../../core/patch/inputConfigPreparer';

import physicalInputs from './mockedInputs/physical-inputs-for-serialization';

chai.should();

describe('Input config preparation:', function() {

  describe('Options:', function () {

    let preparedInputs = prepareInputs(physicalInputs);

    it('should convert option values to a list', function () {
      console.log(preparedInputs)
    });

    it('should convert option midi values to a list', function () {

    });
  });
});

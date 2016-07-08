import chai from 'chai';

import { getStepPositions } from '../../../shared/matrix/Inputs';

chai.should();

describe('Inputs - getStepPositions', function() {
  describe('getStepPositions', function() {

    it('should split into four', function() {
      let positions = getStepPositions({numberOfSteps: 4});
      positions[0].value.should.equal(0);
      positions[1].value.should.equal(8192);
      positions[2].value.should.equal(16384);
      positions[3].value.should.equal(24576);
    });

    it('should split into four, centered', function() {
      let positions = getStepPositions({numberOfSteps: 4, centered: true});
      positions[0].value.should.equal(4096);
      positions[1].value.should.equal(12288);
      positions[2].value.should.equal(20480);
      positions[3].value.should.equal(28672);
    });     

    it('should use min and max when calculating', function() {
      let positions = getStepPositions({numberOfSteps: 4, min: -32768, max: 0});
      positions[0].value.should.equal(-32768);
      positions[1].value.should.equal(-24576);
      positions[2].value.should.equal(-16384);
      positions[3].value.should.equal(-8192);
    });  

    it('centered should work with negative values', function() {
      let positions = getStepPositions({numberOfSteps: 4, centered: true, min: -32768, max: 0});
      positions[0].value.should.equal(-28672);
      positions[1].value.should.equal(-20480);
      positions[2].value.should.equal(-12288);
      positions[3].value.should.equal(-4096);
    }); 

    it('should handle both negative and positive values', function() {
      let positions = getStepPositions({numberOfSteps: 4, min: -16384, max: 16384});
      positions[0].value.should.equal(-16384);
      positions[1].value.should.equal(-8192);
      positions[2].value.should.equal(0);
      positions[3].value.should.equal(8192);
    });   

    it('should use full scale when end to end is true', function() {
      let positions = getStepPositions({numberOfSteps: 4, min: 0, max: 32768, endToEnd: true});
      positions[0].value.should.equal(0);
      positions[1].value.should.equal(10922);
      positions[2].value.should.equal(21845);
      positions[3].value.should.equal(32768);
    });      

    it('end to end should work with negative numbers', function() {
      let positions = getStepPositions({numberOfSteps: 4, min: -32768, max: 32768, endToEnd: true});
      positions[0].value.should.equal(-32768);
      positions[1].value.should.equal(-10923);
      positions[2].value.should.equal(10922);
      positions[3].value.should.equal(32768);
    });       
  });

});
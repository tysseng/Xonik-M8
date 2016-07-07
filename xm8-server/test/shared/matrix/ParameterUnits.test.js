import chai from 'chai';

import {unitsById} from '../../../shared/matrix/ParameterUnits';

chai.should();

describe('ParameterUnits', function() {
  describe('convert to fraction', function() {

    it('should convert to fraction', function() {
      let unit = unitsById.FRACTION;
      let converted = unit.converters.to(16384)
      converted.should.equal(0.5);
    });

    it('should convert from fraction', function() {
      let unit = unitsById.FRACTION;
      let converted = unit.converters.from(0.5)
      converted.should.equal(16384);
    });

    it('should convert from max fraction', function() {
      let unit = unitsById.FRACTION;
      let converted = unit.converters.from(1)

      // special case as we cannot correctly represent 32768.
      converted.should.equal(32767);
    });    
  });

  describe('convert to percentage', function() {

    it('should convert to percentage', function() {
      let unit = unitsById.PERCENTAGE;
      let converted = unit.converters.to(16384)
      converted.should.equal(50);
    });

    it('should convert from percentage', function() {
      let unit = unitsById.PERCENTAGE;
      let converted = unit.converters.from(50)
      converted.should.equal(16384);
    });

    it('should convert from max percentage', function() {
      let unit = unitsById.PERCENTAGE;
      let converted = unit.converters.from(100)

      // special case as we cannot correctly represent 32768.
      converted.should.equal(32767);
    });    
  });  

  describe('convert to cents', function() {

    it('should convert to cents', function() {
      let unit = unitsById.CENTS;
      let converted = unit.converters.to(16384)
      converted.should.equal(3000);
    });

    it('should convert from cents', function() {
      let unit = unitsById.CENTS;
      let converted = unit.converters.from(3000)
      converted.should.equal(16384);
    });

    it('should convert from max cents', function() {
      let unit = unitsById.CENTS;
      let converted = unit.converters.from(5999)

      // special case as we cannot correctly represent 32768.
      converted.should.equal(32762);
    });    
  });    

  describe('convert to semitones', function() {

    it('should convert to semitones', function() {
      let unit = unitsById.SEMITONES;
      let converted = unit.converters.to(16384)
      converted.should.equal(30);
    });

    it('should convert from semitones', function() {
      let unit = unitsById.SEMITONES;
      let converted = unit.converters.from(30)
      converted.should.equal(16384);
    });

    it('should convert from max semitones', function() {
      let unit = unitsById.SEMITONES;
      let converted = unit.converters.from(59)

      // special case as we cannot correctly represent 32768.
      converted.should.equal(32221);
    });    
  });   

  describe('convert to octaves', function() {

    it('should convert to octaves', function() {
      let unit = unitsById.OCTAVES;
      let converted = unit.converters.to(16384)
      converted.should.equal(2.5);
    });

    it('should convert from octaves', function() {
      let unit = unitsById.OCTAVES;
      let converted = unit.converters.from(2.5)
      converted.should.equal(16384);
    });

    it('should convert from max octaves', function() {
      let unit = unitsById.OCTAVES;
      let converted = unit.converters.from(5)

      // special case as we cannot correctly represent 32768.
      converted.should.equal(32767);
    });    
  });

  describe('convert to volts', function() {

    it('should convert to volts', function() {
      let unit = unitsById.VOLTS;
      let converted = unit.converters.to(16384)
      converted.should.equal(2.5);
    });

    it('should convert from volts', function() {
      let unit = unitsById.VOLTS;
      let converted = unit.converters.from(2.5)
      converted.should.equal(16384);
    });

    it('should convert from max volts', function() {
      let unit = unitsById.VOLTS;
      let converted = unit.converters.from(5)

      // special case as we cannot correctly represent 32768.
      converted.should.equal(32767);
    });    
  });

  describe('convert to binary', function() {

    it('should convert to binary from positive', function() {
      let unit = unitsById.BINARY;
      let converted = unit.converters.to(16384)
      converted.should.equal(1);
    });

    it('should convert from binary true', function() {
      let unit = unitsById.BINARY;
      let converted = unit.converters.from(1)
      converted.should.equal(32767);
    });

    it('should convert to binary from negative', function() {
      let unit = unitsById.BINARY;
      let converted = unit.converters.to(-32768)
      converted.should.equal(0);
    });    

    it('should convert from binary false', function() {
      let unit = unitsById.BINARY;
      let converted = unit.converters.from(0)
      converted.should.equal(0);
    });    
  });   

  describe('convert to dac value', function() {

    it('should convert to same as input', function() {
      let unit = unitsById.DAC_VALUE;
      let converted = unit.converters.to(16384)
      converted.should.equal(16384);
    });

    it('should convert from same as input', function() {
      let unit = unitsById.DAC_VALUE;
      let converted = unit.converters.from(16384)
      converted.should.equal(16384);
    });  
  });  

  describe('validators', function() {

    it('fraction validators', function() {
      let unit = unitsById.FRACTION;
      unit.validator(1.1).should.be.false;
      unit.validator(-1.1).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(1).should.be.true;
      unit.validator(-1).should.be.true;
    });

    it('percentage validators', function() {
      let unit = unitsById.PERCENTAGE;
      unit.validator(100.1).should.be.false;
      unit.validator(-100.1).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(100).should.be.true;
      unit.validator(-100).should.be.true;
    });

    it('cents validators', function() {
      let unit = unitsById.CENTS;
      unit.validator(6000).should.be.false;
      unit.validator(-6001).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(5999).should.be.true;
      unit.validator(-6000).should.be.true;
    });   

    it('semitones validators', function() {
      let unit = unitsById.SEMITONES;
      unit.validator(60).should.be.false;
      unit.validator(-61).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(59).should.be.true;
      unit.validator(-60).should.be.true;
    });

    it('octaves validators', function() {
      let unit = unitsById.OCTAVES;
      unit.validator(5.1).should.be.false;
      unit.validator(-5.1).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(5).should.be.true;
      unit.validator(-5).should.be.true;
    });

    it('volts validators', function() {
      let unit = unitsById.VOLTS;
      unit.validator(5.1).should.be.false;
      unit.validator(-5.1).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(5).should.be.true;
      unit.validator(-5).should.be.true;
    });    

    it('binary validators', function() {
      let unit = unitsById.BINARY;
      unit.validator(2).should.be.false;
      unit.validator(-1).should.be.false;
      unit.validator(0.5).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(1).should.be.true;
      unit.validator(0).should.be.true;
    });    

    it('dac value validators', function() {
      let unit = unitsById.DAC_VALUE;
      unit.validator(32768).should.be.false;
      unit.validator(-32769).should.be.false;
      unit.validator("not a number").should.be.false;
      unit.validator(32767).should.be.true;
      unit.validator(-32768).should.be.true;
    });
  });  


});
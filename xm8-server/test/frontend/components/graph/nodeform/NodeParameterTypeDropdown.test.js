import chai from 'chai';
import _ from 'lodash';
import {washParamTypesList} from '../../../../../frontend/components/graph/nodeform/NodeParameterTypeDropdown';
import {map as paramTypes, list as paramTypesList} from '../../../../../shared/graph/ParameterTypes.js';
import {globalTypeBlacklist} from '../../../../../shared/graph/NodeTypes.js';

chai.should();

describe('ParameterType filtering', function() {
  describe('whitelist', function() {

    it('should return only types from whitelist if whitelist exists', function() {
      // setup
      let paramDefinition = {
        id: "1",
        name: "Output target",
        validator: function(value){},
        optional: false,
        typeWhitelist: [paramTypes.OUTPUT.id]
      }

      // run
      let filteredParamTypes = washParamTypesList(paramDefinition);

      // assert
      filteredParamTypes.length.should.equal(1);
      filteredParamTypes[0].should.equal(paramTypes.OUTPUT);

    });

    it('should remove types from blacklist if blacklist exists', function() {
      // setup
      let paramDefinition = {
        id: "0",
        name: "Output value",
        validator: function(value){},
        optional: false,
        typeBlacklist: [paramTypes.INPUT.id]
      }

      // run
      let filteredParamTypes = washParamTypesList(paramDefinition);

      // assert
      filteredParamTypes.length.should.equal(paramTypesList.length - 1) ;

      let filteredListIncludesOutput = _.includes(filteredParamTypes, paramTypes.INPUT)
      filteredListIncludesOutput.should.be.false;

    });

    it('should return all types not in global blacklist if neither whitelist nor blacklist exists', function() {
      // setup
      let paramDefinition = {
        id: "1",
        name: "Output target",
        validator: function(value){},
        optional: false
      }

      // run
      let filteredParamTypes = washParamTypesList(paramDefinition);

      // assert
      filteredParamTypes.length.should.equal(paramTypesList.length - 1);
      let filteredListIncludesOutput = _.includes(filteredParamTypes, paramTypes.OUTPUT)
      filteredListIncludesOutput.should.be.false;
    });
  });    
});
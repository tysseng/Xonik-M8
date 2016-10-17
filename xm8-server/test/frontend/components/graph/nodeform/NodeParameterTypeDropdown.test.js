import chai from 'chai';
import _ from 'lodash';
import {washParamTypesList} from '../../../../../frontend/components/graph/nodeform/NodeParameterTypeDropdown';
import { paramTypesById, paramTypes } from '../../../../../shared/graph/ParameterTypes';

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
        typeWhitelist: [paramTypesById.OUTPUT.id]
      }

      // run
      let filteredParamTypes = washParamTypesList(paramDefinition);

      // assert
      filteredParamTypes.length.should.equal(1);
      filteredParamTypes[0].should.equal(paramTypesById.OUTPUT);

    });

    it('should remove types from blacklist if blacklist exists', function() {
      // setup
      let paramDefinition = {
        id: "0",
        name: "Output value",
        validator: function(value){},
        optional: false,
        typeBlacklist: [paramTypesById.INPUT.id]
      }

      // run
      let filteredParamTypes = washParamTypesList(paramDefinition);

      // assert
      filteredParamTypes.length.should.equal(paramTypes.length - 1) ;

      let filteredListIncludesOutput = _.includes(filteredParamTypes, paramTypesById.INPUT)
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
      filteredParamTypes.length.should.equal(paramTypes.length - 1);
      let filteredListIncludesOutput = _.includes(filteredParamTypes, paramTypesById.OUTPUT)
      filteredListIncludesOutput.should.be.false;
    });
  });    
});
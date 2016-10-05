import chai from 'chai';
import { expect } from 'chai';

import store from '../../../core/state/store';
import { getVirtualInput } from '../../../core/state/selectors';
import { updatePanelController } from '../../../shared/state/actions/inputs';
import { inputWithMidi } from './mockedInputs/virtual-inputs-for-midi-clearing-testing';
import { panelControllersById } from '../../../shared/graph/PanelControllers';

chai.should();

describe('Inputs reducer:', function() {

  let voiceGroupId = '0';

  describe('Adding a panel controller to a virtual input should clear midi settings', function () {

    let inputBefore = getVirtualInput(voiceGroupId, inputWithMidi.id).toJS();

    store.dispatch(updatePanelController(inputWithMidi.id, panelControllersById.PC_AMP_ENV_ATTACK.id, '0'));

    let input = getVirtualInput(voiceGroupId, inputWithMidi.id).toJS();


    it('should have reset midi hires', function () {
      input.midi.hires.should.equal(false);
    });

    it('should have reset midi send', function () {
      input.midi.send.should.equal(true);
    });

    it('should have reset midi receive', function () {
      input.midi.receive.should.equal(true);
    });

    it('should have reset midi status', function () {
      input.midi.status.should.equal('');
    });

    it('should have reset midi data1', function () {
      input.midi.data1.should.equal('');
    });

    it('should have reset options midi values', function () {
      input.options['0'].valuemidi.should.equal('');
      input.options['1'].valuemidi.should.equal('');
      input.options['2'].valuemidi.should.equal('');
    });

    it('should not have reset virtual controller option values', function () {
      input.options['0'].value.should.equal(0);
      input.options['1'].value.should.equal(8192);
      input.options['2'].value.should.equal(16384);
    });


  });

  // IN OUTPUTS REDUCER
  //TODO: Delete node should update output collition detection
  //TODO: Change node type should update output collision detection
  //TODO: Change param type should update output collision detection
  //TODO: Change param value should update output collision detection
});
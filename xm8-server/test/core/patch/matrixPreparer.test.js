import chai from 'chai';
import { expect } from 'chai';

import { outputsById } from '../../../shared/graph/Outputs';
import { inputsById } from '../../../shared/graph/Inputs';
import { panelControllersById } from '../../../shared/graph/PanelControllers';

import { getUsedDirectOutputs } from '../../../core/patch/matrixPreparer';
import { graphOutputs, matrix} from './mockedMatrix/matrix-with-collisions';

chai.should();

describe('Matrix preparation:', function() {

  describe('Direct outputs:', function () {

    let usedDirectOutputs = getUsedDirectOutputs(matrix.directoutputs, graphOutputs);

    it('should return the correct number of filtered outputs', function () {
      Object.keys(usedDirectOutputs).length.should.equal(2);
    });

    it('should return direct outputs as hwId mappings', function () {

      let expectedPanelController = panelControllersById[inputsById.IN_OSC_1_SQUARE.panelController];
      expect(usedDirectOutputs[expectedPanelController.hwId]).to.equal(outputsById.OUT_FILTER_1_CUTOFF.hwId);
    });

    it('should ignore output that collides with output in graph', function () {
      expect(usedDirectOutputs[inputsById.IN_OSC_1_SAW]).to.equal(undefined);
    });
  });
});

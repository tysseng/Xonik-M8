import { init, getMutablePhysicalInputs,
  midiStatus, midiData1, midiHires, midiSend, midiReceive,
  option, stepGenerationMode, numberOfSteps } from '../../testHelpers/inputTestTools';
import { inputsById } from '../../../../shared/graph/Inputs';
import { inputStepGenerationTypesById } from '../../../../shared/inputs/InputStepsGenerationTypes';
import { midiStatusByNumber } from '../../../../shared/midi/MidiStatusMessages';
import { controllersById } from '../../../../shared/midi/MidiControllers';

init();

let inputWithMidi = inputsById.IN_OSC_1_SAW;
midiStatus(inputWithMidi, midiStatusByNumber[0xB0].id);
midiData1(inputWithMidi, controllersById[7].id);
midiHires(inputWithMidi, true);
midiSend(inputWithMidi, true);
midiReceive(inputWithMidi, true);
stepGenerationMode(inputWithMidi, inputStepGenerationTypesById.NUMBER_OF_STEPS);
numberOfSteps(inputWithMidi, 4);

// options are converted to DAC values by the GUI code.
let inputWithOptions = inputsById.IN_OSC_1_TRIANGLE;
option(inputWithOptions, 0, 0, "one");
option(inputWithOptions, 8192, 32, "two");
option(inputWithOptions, 16384, 64, "three");
option(inputWithOptions, 24576, 96, "four");


let physicalInputs = getMutablePhysicalInputs();

export default physicalInputs;
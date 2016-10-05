import { init, createVirtualInput, name, getMutableVirtualInputs,
midiHires, midiSend, midiReceive, midiStatus, midiData1, option} from '../../testHelpers/inputTestTools';
import { midiStatusByNumber } from '../../../../shared/midi/MidiStatusMessages';
import { controllersById } from '../../../../shared/midi/MidiControllers';

init();

export let inputWithMidi = createVirtualInput();
name(inputWithMidi, 'Input with midi but no panel controller');
midiStatus(inputWithMidi, midiStatusByNumber[0xB0].id);
midiData1(inputWithMidi, controllersById[7].id);
midiHires(inputWithMidi, true);
midiSend(inputWithMidi, false);
midiReceive(inputWithMidi, false);

option(inputWithMidi, 0, 0, "one");
option(inputWithMidi, 8192, 32, "two");
option(inputWithMidi, 16384, 64, "three");

let virtualInputs = getMutableVirtualInputs();

export default virtualInputs;
function write(line, col, message){
	// later this should appear on a display, not in the console
	console.log("DISP ("+ line +"," + col + "): " + message);
}

module.exports.write = write;
int BAT_getAsInt(unsigned short *bytes, char position){
  return bytes[position] << 8 | bytes[position + 1];
}

unsigned int BAT_getAsUInt(unsigned short *bytes, char position){
  return bytes[position] << 8 | bytes[position + 1];
}

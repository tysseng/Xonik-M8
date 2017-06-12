#include

// TODO: Set these correctly according to datasheet and eagle
#define SPI_IP0 IPC7.B26
#define SPI_IP1 IPC7.B27
#define SPI_IP2 IPC7.B28
#define SPI_RX_IE SPI2RXIE_bit
#define SPI_RX_IF SPI2RXIF_bit
#define SPI_CON_ENHBUF SPI2CON.ENHBUF
#define SPI_IVT IVT_SPI_2
#define SPI_BUF SPI2BUF
#define DCO_SPI_Init_Advanced SPI2_Init_Advanced
#define DCO_SPI_Write SPI2_Write
#define DCO_DATA_READY PORTA.F0

void DCO_writeValue(unsigned int dcoValue){
  // TODO: Change to async writing - write bytes to buffer, set
  // data ready in write complete interrupt, start writing second byte etc.
  DCO_SPI_Write(Hi(dcoValue));
  DCO_DATA_READY = 1;
  DCO_DATA_READY = 0;
  delay_ms(1);
  DCO_SPI_Write(Lo(dcoValue));
  DCO_DATA_READY = 1;
  DCO_DATA_READY = 0;
  delay_ms(1);

}

void initDcoSPI(){
  //NB: SPI4 = SPI3A on the chip as Mikroelektronika and Microchip use
  //    different naming schemes
  DCO_SPI_Init_Advanced(
    _SPI_MASTER,
    _SPI_8_BIT,
    1024, // Clock divider, sets speed.
    _SPI_SS_DISABLE,
    _SPI_DATA_SAMPLE_END,
    _SPI_CLK_IDLE_LOW,
    _SPI_ACTIVE_2_IDLE);

//  initSlaveSPIInterrupts();
}

void DCO_init() {
  initDcoSPI();
}
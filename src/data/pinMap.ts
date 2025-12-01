import {
  BOARD_X,
  PRIMARY_LEFT,
  PRIMARY_RIGHT,
  SECONDARY_LEFT,
  SECONDARY_RIGHT,
  SECONDARY_LEFT_PIN_X,
  SECONDARY_RIGHT_PIN_X,
  PRIMARY_LEFT_PIN_X,
  PRIMARY_RIGHT_PIN_X,
  PRIMARY_BOARD_BOTTOM,
} from '../layout/geometry'

export type PinCategory =
  | 'analog'
  | 'digital'
  | 'power'
  | 'gnd'
  | 'spi'
  | 'i2c'
  | 'uart'
  | 'pin'
  | 'nfc'

export type PinAnchor = 'left' | 'right' | 'bottom'

export interface PinDefinition {
  id: string
  nrfPin: string
  terminal: string
  arduino?: string
  category: PinCategory
  board?: 'primary' | 'secondary'
  position: {
    x: number
    y: number
    anchor: PinAnchor
  }
  defaultAlias?: string
  notes?: string
}

export const PIN_CATEGORY_INFO: Record<
  PinCategory,
  { label: string; color: string }
> = {
  analog: { label: 'Analog', color: '#f7b2c4' },
  digital: { label: 'Digital', color: '#8cc3ff' },
  power: { label: 'Power', color: '#ff8fa2' },
  gnd: { label: 'GND', color: '#4c4f58' },
  spi: { label: 'SPI', color: '#d0c1ff' },
  i2c: { label: 'I2C', color: '#86d7a2' },
  uart: { label: 'UART', color: '#ffe28b' },
  pin: { label: 'Pin No.', color: '#a8d07c' },
  nfc: { label: 'NFC', color: '#6cd6ff' },
}

const PIN_RECT_HEIGHT = 60
const PIN_RECT_HALF = PIN_RECT_HEIGHT / 2

const leftCenterStart = PRIMARY_LEFT.startY
const leftSpacing = PRIMARY_LEFT.spacing
const rightCenterStart = PRIMARY_RIGHT.startY
const rightSpacing = PRIMARY_RIGHT.spacing
const secondaryLeftCenterStart = SECONDARY_LEFT.startY
const secondaryLeftSpacing = SECONDARY_LEFT.spacing
const secondaryRightCenterStart = SECONDARY_RIGHT.startY
const secondaryRightSpacing = SECONDARY_RIGHT.spacing
const primaryLeftX = PRIMARY_LEFT_PIN_X
const primaryRightX = PRIMARY_RIGHT_PIN_X
const primaryBoardLeft = BOARD_X
const bottomXs = Array.from({ length: 5 }, (_, index) => primaryBoardLeft + 20 + index * 110)
const bottomRowY1 = PRIMARY_BOARD_BOTTOM + 80

const yByIndex = (start: number, spacing: number, index: number) =>
  start + spacing * index - PIN_RECT_HALF

const leftY = (index: number) => yByIndex(leftCenterStart, leftSpacing, index)
const rightY = (index: number) => yByIndex(rightCenterStart, rightSpacing, index)
const secondaryLeftY = (index: number) =>
  yByIndex(secondaryLeftCenterStart, secondaryLeftSpacing, index)
const secondaryRightY = (index: number) =>
  yByIndex(secondaryRightCenterStart, secondaryRightSpacing, index)

export const XIAO_NRF_PINS: PinDefinition[] = [
  {
    id: 'p0_02',
    nrfPin: 'P0.02',
    terminal: 'AIN0',
    arduino: 'D0 / A0',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(0), anchor: 'left' },
  },
  {
    id: 'p0_03',
    nrfPin: 'P0.03',
    terminal: 'AIN1',
    arduino: 'D1 / A1',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(1), anchor: 'left' },
  },
  {
    id: 'p0_28',
    nrfPin: 'P0.28',
    terminal: 'AIN4',
    arduino: 'D2 / A2',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(2), anchor: 'left' },
  },
  {
    id: 'p0_29',
    nrfPin: 'P0.29',
    terminal: 'AIN5',
    arduino: 'D3 / A3',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(3), anchor: 'left' },
  },
  {
    id: 'p0_04',
    nrfPin: 'P0.04',
    terminal: 'SDA / AIN2',
    arduino: 'D4 / A4',
    category: 'i2c',
    position: { x: primaryLeftX, y: leftY(4), anchor: 'left' },
  },
  {
    id: 'p0_05',
    nrfPin: 'P0.05',
    terminal: 'SCL / AIN3',
    arduino: 'D5 / A5',
    category: 'i2c',
    position: { x: primaryLeftX, y: leftY(5), anchor: 'left' },
  },
  {
    id: 'p1_11',
    nrfPin: 'P1.11',
    terminal: 'TX',
    arduino: 'D6',
    category: 'uart',
    position: { x: primaryLeftX, y: leftY(6), anchor: 'left' },
  },
  {
    id: '5v',
    nrfPin: '5V',
    terminal: 'Power In',
    arduino: '5V',
    category: 'power',
    position: { x: primaryRightX, y: rightY(0), anchor: 'right' },
  },
  {
    id: 'gnd',
    nrfPin: 'GND',
    terminal: 'Ground',
    arduino: 'GND',
    category: 'gnd',
    position: { x: primaryRightX, y: rightY(1), anchor: 'right' },
  },
  {
    id: '3v3',
    nrfPin: '3V3',
    terminal: 'Power Out',
    arduino: '3V3',
    category: 'power',
    position: { x: primaryRightX, y: rightY(2), anchor: 'right' },
  },
  {
    id: 'p1_15',
    nrfPin: 'P1.15',
    terminal: 'MOSI',
    arduino: 'D10',
    category: 'spi',
    position: { x: primaryRightX, y: rightY(3), anchor: 'right' },
  },
  {
    id: 'p1_14',
    nrfPin: 'P1.14',
    terminal: 'MISO',
    arduino: 'D9',
    category: 'spi',
    position: { x: primaryRightX, y: rightY(4), anchor: 'right' },
  },
  {
    id: 'p1_13',
    nrfPin: 'P1.13',
    terminal: 'SCK',
    arduino: 'D8',
    category: 'spi',
    position: { x: primaryRightX, y: rightY(5), anchor: 'right' },
  },
  {
    id: 'p1_12',
    nrfPin: 'P1.12',
    terminal: 'RX',
    arduino: 'D7',
    category: 'uart',
    position: { x: primaryRightX, y: rightY(6), anchor: 'right' },
  },
  {
    id: 'p0_16',
    nrfPin: 'P0.16',
    terminal: 'General IO',
    arduino: undefined,
    category: 'pin',
    position: { x: bottomXs[0], y: bottomRowY1, anchor: 'bottom' },
  },
  {
    id: 'p1_00',
    nrfPin: 'P1.00',
    terminal: 'General IO',
    arduino: undefined,
    category: 'pin',
    position: { x: bottomXs[1], y: bottomRowY1, anchor: 'bottom' },
  },
  {
    id: 'p1_10',
    nrfPin: 'P1.10',
    terminal: 'General IO',
    arduino: undefined,
    category: 'pin',
    position: { x: bottomXs[2], y: bottomRowY1, anchor: 'bottom' },
  },
  {
    id: 'p0_10',
    nrfPin: 'P0.10',
    terminal: 'NFC 1',
    arduino: undefined,
    category: 'nfc',
    position: { x: bottomXs[3], y: bottomRowY1, anchor: 'bottom' },
  },
  {
    id: 'p0_09',
    nrfPin: 'P0.09',
    terminal: 'NFC 2',
    arduino: undefined,
    category: 'nfc',
    position: { x: bottomXs[4], y: bottomRowY1, anchor: 'bottom' },
  },
]

const secondaryLeftX = SECONDARY_LEFT_PIN_X
const secondaryRightX = SECONDARY_RIGHT_PIN_X

export const XIAO_NRF_PLUS_PINS: PinDefinition[] = [
  {
    id: 'p0_02',
    nrfPin: 'P0.02',
    terminal: 'AIN0',
    arduino: 'D0 / A0',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(0), anchor: 'left' },
  },
  {
    id: 'p0_03',
    nrfPin: 'P0.03',
    terminal: 'AIN1',
    arduino: 'D1 / A1',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(1), anchor: 'left' },
  },
  {
    id: 'p0_28',
    nrfPin: 'P0.28',
    terminal: 'AIN2',
    arduino: 'D2 / A2',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(2), anchor: 'left' },
  },
  {
    id: 'p0_29',
    nrfPin: 'P0.29',
    terminal: 'AIN3',
    arduino: 'D3 / A3',
    category: 'analog',
    position: { x: primaryLeftX, y: leftY(3), anchor: 'left' },
  },
  {
    id: 'p0_04',
    nrfPin: 'P0.04',
    terminal: 'SDA / A4',
    arduino: 'D4 / SDA',
    category: 'i2c',
    position: { x: primaryLeftX, y: leftY(4), anchor: 'left' },
  },
  {
    id: 'p0_05',
    nrfPin: 'P0.05',
    terminal: 'SCL / A5',
    arduino: 'D5 / SCL',
    category: 'i2c',
    position: { x: primaryLeftX, y: leftY(5), anchor: 'left' },
  },
  {
    id: 'p1_11',
    nrfPin: 'P1.11',
    terminal: 'TX',
    arduino: 'D6',
    category: 'uart',
    position: { x: primaryLeftX, y: leftY(6), anchor: 'left' },
  },
  {
    id: '5v',
    nrfPin: '5V',
    terminal: 'Power In',
    arduino: '5V',
    category: 'power',
    position: { x: primaryRightX, y: rightY(0), anchor: 'right' },
  },
  {
    id: 'gnd',
    nrfPin: 'GND',
    terminal: 'Ground',
    arduino: 'GND',
    category: 'gnd',
    position: { x: primaryRightX, y: rightY(1), anchor: 'right' },
  },
  {
    id: '3v3',
    nrfPin: '3V3',
    terminal: 'Power Out',
    arduino: '3V3',
    category: 'power',
    position: { x: primaryRightX, y: rightY(2), anchor: 'right' },
  },
  {
    id: 'p1_15',
    nrfPin: 'P1.15',
    terminal: 'MOSI',
    arduino: 'D10',
    category: 'spi',
    position: { x: primaryRightX, y: rightY(3), anchor: 'right' },
  },
  {
    id: 'p1_14',
    nrfPin: 'P1.14',
    terminal: 'MISO',
    arduino: 'D9',
    category: 'spi',
    position: { x: primaryRightX, y: rightY(4), anchor: 'right' },
  },
  {
    id: 'p1_13',
    nrfPin: 'P1.13',
    terminal: 'SCK',
    arduino: 'D8',
    category: 'spi',
    position: { x: primaryRightX, y: rightY(5), anchor: 'right' },
  },
  {
    id: 'p1_12',
    nrfPin: 'P1.12',
    terminal: 'RX',
    arduino: 'D7',
    category: 'uart',
    position: { x: primaryRightX, y: rightY(6), anchor: 'right' },
  },
  // Secondary board left column
  {
    id: 'p1_07',
    nrfPin: 'P1.07',
    terminal: 'MOSI1',
    arduino: 'D19',
    category: 'spi',
    board: 'secondary',
    position: { x: secondaryLeftX, y: secondaryLeftY(-1), anchor: 'left' },
  },
  {
    id: 'p1_05',
    nrfPin: 'P1.05',
    terminal: 'MISO1',
    arduino: 'D18',
    category: 'spi',
    board: 'secondary',
    position: { x: secondaryLeftX, y: secondaryLeftY(0), anchor: 'left' },
  },
  {
    id: 'p1_03',
    nrfPin: 'P1.03',
    terminal: 'SCK1',
    arduino: 'D17',
    category: 'spi',
    board: 'secondary',
    position: { x: secondaryLeftX, y: secondaryLeftY(1), anchor: 'left' },
  },
  // Secondary board right column
  {
    id: 'p1_15_i2s',
    nrfPin: 'P0.15',
    terminal: 'I2S_SD',
    arduino: 'D11',
    category: 'pin',
    board: 'secondary',
    position: { x: secondaryRightX, y: secondaryRightY(0), anchor: 'right' },
  },
  {
    id: 'p0_19',
    nrfPin: 'P0.19',
    terminal: 'I2S_SCK',
    arduino: 'D12',
    category: 'pin',
    board: 'secondary',
    position: { x: secondaryRightX, y: secondaryRightY(1), anchor: 'right' },
  },
  {
    id: 'p1_01',
    nrfPin: 'P1.01',
    terminal: 'I2S_WS',
    arduino: 'D13',
    category: 'pin',
    board: 'secondary',
    position: { x: secondaryRightX, y: secondaryRightY(2), anchor: 'right' },
  },
  {
    id: 'p0_08',
    nrfPin: 'P0.08',
    terminal: 'RX1 / NFC1',
    arduino: 'D14',
    category: 'uart',
    board: 'secondary',
    position: { x: secondaryRightX, y: secondaryRightY(3), anchor: 'right' },
  },
  {
    id: 'p0_10_plus',
    nrfPin: 'P0.10',
    terminal: 'TX1 / NFC2',
    arduino: 'D15',
    category: 'uart',
    board: 'secondary',
    position: { x: secondaryRightX, y: secondaryRightY(4), anchor: 'right' },
  },
  {
    id: 'p0_31',
    nrfPin: 'P0.31',
    terminal: 'BAT',
    arduino: 'D16',
    category: 'power',
    board: 'secondary',
    position: { x: secondaryRightX, y: secondaryRightY(5), anchor: 'right' },
  },
]

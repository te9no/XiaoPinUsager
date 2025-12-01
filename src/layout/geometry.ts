export const CANVAS = {
  width: 1300,
  height: 1750,
}

export const PRIMARY_BOARD = {
  width: 260,
  height: 570,
  y: 160,
}

export const SECONDARY_BOARD = {
  width: PRIMARY_BOARD.width,
  height: PRIMARY_BOARD.height,
  y: PRIMARY_BOARD.y + PRIMARY_BOARD.height + 220,
}

export const PRIMARY_BOARD_BOTTOM = PRIMARY_BOARD.y + PRIMARY_BOARD.height

export const BOARD_X = (CANVAS.width - PRIMARY_BOARD.width) / 2

const PAD_Y_OFFSET = 130
const PAD_SPACING = 65

export const PRIMARY_LEFT = {
  startY: PRIMARY_BOARD.y + PAD_Y_OFFSET,
  spacing: PAD_SPACING,
}

export const PRIMARY_RIGHT = {
  startY: PRIMARY_BOARD.y + PAD_Y_OFFSET,
  spacing: PAD_SPACING,
}

const SECONDARY_LEFT_PIN_COUNT = 3
const SECONDARY_LEFT_BOTTOM_MARGIN = 40

export const SECONDARY_LEFT = {
  startY:
    SECONDARY_BOARD.y +
    SECONDARY_BOARD.height -
    SECONDARY_LEFT_BOTTOM_MARGIN -
    (SECONDARY_LEFT_PIN_COUNT - 1) * PAD_SPACING,
  spacing: PAD_SPACING,
}

export const SECONDARY_RIGHT = {
  startY: SECONDARY_BOARD.y + PAD_Y_OFFSET,
  spacing: PAD_SPACING,
}

const PIN_WIDTH = 190
const PIN_GAP = 140

export const PRIMARY_LEFT_PIN_X = BOARD_X - PIN_WIDTH - PIN_GAP
export const PRIMARY_RIGHT_PIN_X = BOARD_X + PRIMARY_BOARD.width + PIN_GAP

export const SECONDARY_LEFT_PIN_X = PRIMARY_LEFT_PIN_X
export const SECONDARY_RIGHT_PIN_X = PRIMARY_RIGHT_PIN_X

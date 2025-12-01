export const CANVAS = {
  width: 1300,
  height: 1500,
}

export const PRIMARY_BOARD = {
  width: 260,
  height: 420,
  y: 160,
}

export const SECONDARY_BOARD = {
  width: PRIMARY_BOARD.width,
  height: PRIMARY_BOARD.height,
  y: PRIMARY_BOARD.y + PRIMARY_BOARD.height + 220,
}

export const BOARD_X = (CANVAS.width - PRIMARY_BOARD.width) / 2

export const PRIMARY_LEFT = {
  startY: PRIMARY_BOARD.y,
  spacing: 70,
}

export const PRIMARY_RIGHT = {
  startY: PRIMARY_BOARD.y,
  spacing: 70,
}

export const SECONDARY_LEFT = {
  startY: SECONDARY_BOARD.y + 40,
  spacing: 70,
}

export const SECONDARY_RIGHT = {
  startY: SECONDARY_BOARD.y + 40,
  spacing: 70,
}

const PIN_WIDTH = 190
const PIN_GAP = 140

export const PRIMARY_LEFT_PIN_X = BOARD_X - PIN_WIDTH - PIN_GAP
export const PRIMARY_RIGHT_PIN_X = BOARD_X + PRIMARY_BOARD.width + PIN_GAP

export const SECONDARY_LEFT_PIN_X = PRIMARY_LEFT_PIN_X
export const SECONDARY_RIGHT_PIN_X = PRIMARY_RIGHT_PIN_X

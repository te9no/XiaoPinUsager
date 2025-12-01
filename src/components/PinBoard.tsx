import { forwardRef } from 'react'
import type { PinDefinition } from '../data/pinMap'
import { PIN_CATEGORY_INFO } from '../data/pinMap'
import {
  BOARD_X,
  CANVAS,
  PRIMARY_BOARD,
  SECONDARY_BOARD,
} from '../layout/geometry'

const PIN_WIDTH = 190
const PIN_HEIGHT = 60

const LAYOUT = {
  width: CANVAS.width,
  height: CANVAS.height,
}

const boardX = BOARD_X
const boardY = PRIMARY_BOARD.y
const boardWidth = PRIMARY_BOARD.width
const boardHeight = PRIMARY_BOARD.height
const boardBottom = boardY + boardHeight
const boardCenterX = boardX + boardWidth / 2

const secondaryBoardY = SECONDARY_BOARD.y
const secondaryBoardHeight = SECONDARY_BOARD.height
const secondaryBoardBottom = secondaryBoardY + secondaryBoardHeight
const secondaryBoardCenterX = boardCenterX

type PinBoardProps = {
  pins: PinDefinition[]
  aliases: Record<string, string>
}

export const PinBoard = forwardRef<SVGSVGElement, PinBoardProps>(
  ({ pins, aliases }, ref) => {
    const hasSecondaryBoard = pins.some((pin) => pin.board === 'secondary')
    return (
      <svg
        ref={ref}
        className="pin-board"
        viewBox={`0 0 ${LAYOUT.width} ${LAYOUT.height}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Seeed XIAO nRF52840 pin assignment"
      >
      <defs>
        <linearGradient id="boardBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c2f41" />
          <stop offset="100%" stopColor="#1a1d2b" />
        </linearGradient>
        <linearGradient id="boardAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7af4ff" />
          <stop offset="100%" stopColor="#6c92ff" />
        </linearGradient>
      </defs>

      <rect
        x={boardX}
        y={boardY}
        width={boardWidth}
        height={boardHeight}
        rx={42}
        fill="url(#boardBody)"
        stroke="#f0f3ff"
        strokeWidth={2}
      />
      <rect
        x={boardCenterX - 45}
        y={boardY - 28}
        width={90}
        height={36}
        rx={12}
        fill="#d1d6e5"
      />
      <rect
        x={boardCenterX - 55}
        y={boardY + 22}
        width={110}
        height={150}
        rx={16}
        fill="#101423"
      />
      <text
        x={boardCenterX}
        y={boardY + boardHeight / 2 - 20}
        textAnchor="middle"
        className="board-title"
      >
        Seeed Studio
      </text>
      <text
        x={boardCenterX}
        y={boardY + boardHeight / 2 + 10}
        textAnchor="middle"
        className="board-subtitle"
      >
        XIAO nRF52840
      </text>
      <text
        x={boardCenterX}
        y={boardY + boardHeight / 2 + 40}
        textAnchor="middle"
        className="board-chip"
      >
        nRF52840
      </text>
      <rect
        x={boardCenterX - 55}
        y={boardBottom - 54}
        width={110}
        height={24}
        rx={10}
        fill="url(#boardAccent)"
      />

      {hasSecondaryBoard && (
        <>
          <rect
            x={boardX}
            y={secondaryBoardY}
            width={boardWidth}
            height={secondaryBoardHeight}
            rx={36}
            fill="url(#boardBody)"
            stroke="#f0f3ff"
            strokeWidth={2}
          />
          <rect
            x={secondaryBoardCenterX - 45}
            y={secondaryBoardY - 28}
            width={90}
            height={36}
            rx={12}
            fill="#d1d6e5"
          />
          <text
            x={secondaryBoardCenterX}
            y={secondaryBoardY + secondaryBoardHeight / 2 - 10}
            className="board-title"
          >
            Seeed Studio
          </text>
          <text
            x={secondaryBoardCenterX}
            y={secondaryBoardY + secondaryBoardHeight / 2 + 20}
            className="board-subtitle"
          >
            XIAO nRF52840 Plus
          </text>
        </>
      )}

      {pins.map((pin) => {
        const fill = PIN_CATEGORY_INFO[pin.category].color
        const alias = aliases[pin.id]?.trim()
        const rectX = pin.position.x
        const rectY = pin.position.y
        const centerX = rectX + PIN_WIDTH / 2
        const centerY = rectY + PIN_HEIGHT / 2

        let connectorStartX = centerX
        let connectorStartY = centerY
        let connectorEndX = centerX
        let connectorEndY = centerY

        const isSecondary = pin.board === 'secondary'
        const rectInfo = isSecondary
          ? {
              x: boardX,
              width: boardWidth,
              bottom: secondaryBoardBottom,
              y: secondaryBoardY,
            }
          : { x: boardX, width: boardWidth, bottom: boardBottom, y: boardY }
        const boardRight = rectInfo.x + rectInfo.width

        if (pin.position.anchor === 'left') {
          connectorStartX = rectInfo.x
          connectorStartY = centerY
          connectorEndX = rectX + PIN_WIDTH
          connectorEndY = centerY
        } else if (pin.position.anchor === 'right') {
          connectorStartX = boardRight
          connectorStartY = centerY
          connectorEndX = rectX
          connectorEndY = centerY
        } else if (pin.position.anchor === 'bottom') {
          connectorStartX = centerX
          connectorStartY = rectInfo.bottom
          connectorEndX = centerX
          connectorEndY = rectY
        }

        const nodeClass =
          'pin-node' + (pin.category === 'gnd' ? ' pin-node--dark' : '')

        return (
          <g key={pin.id} className={nodeClass}>
            <line
              x1={connectorStartX}
              y1={connectorStartY}
              x2={connectorEndX}
              y2={connectorEndY}
              stroke="#ffd166"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <rect
              x={rectX}
              y={rectY}
              width={PIN_WIDTH}
              height={PIN_HEIGHT}
              rx={14}
              fill={fill}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth={2}
            />
            <text
              x={rectX + 14}
              y={rectY + 22}
              className={`pin-alias ${alias ? 'pin-alias--active' : ''}`}
            >
              {alias || 'Alias'}
            </text>
            <text x={rectX + 14} y={rectY + 38} className="pin-terminal">
              {pin.terminal}
            </text>
            <text x={rectX + 14} y={rectY + 54} className="pin-meta">
              {pin.nrfPin}
              {pin.arduino ? ` • ${pin.arduino}` : ''}
            </text>
          </g>
        )
      })}
    </svg>
    )
  }
)

PinBoard.displayName = 'PinBoard'

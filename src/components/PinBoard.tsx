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

const EDGE_PAD_WIDTH = 14
const EDGE_PAD_HEIGHT = 26
const SENSOR_LABEL_SHIFT = 8

const ANALOG_PIN_IDS = ['p0_02', 'p0_03', 'p0_28', 'p0_29', 'p0_04', 'p0_05']
const HIGH_FREQ_PIN_IDS = ['p1_11']

type PinBoardProps = {
  pins: PinDefinition[]
  aliases: Record<string, string>
}

export const PinBoard = forwardRef<SVGSVGElement, PinBoardProps>(
  ({ pins, aliases }, ref) => {
    const hasSecondaryBoard = pins.some((pin) => pin.board === 'secondary')
    const analogGroup = computeGroupRect(pins, ANALOG_PIN_IDS)
    const highFreqGroup = computeGroupRect(pins, HIGH_FREQ_PIN_IDS)
    const getPadCenters = (
      boardTag: 'primary' | 'secondary',
      anchor: 'left' | 'right',
    ) =>
      pins
        .filter(
          (pin) =>
            (pin.board ?? 'primary') === boardTag &&
            pin.position.anchor === anchor,
        )
        .map((pin) => pin.position.y + PIN_HEIGHT / 2)
        .sort((a, b) => a - b)

    const primaryLeftCenters = getPadCenters('primary', 'left')
    const primaryRightCenters = getPadCenters('primary', 'right')
    const secondaryLeftCenters = getPadCenters('secondary', 'left')
    const secondaryRightCenters = getPadCenters('secondary', 'right')

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

      <g>
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
          x={boardX + (boardWidth - boardWidth * 0.62) / 2}
          y={boardY + 60}
          width={boardWidth * 0.62}
          height={boardHeight - 190}
          rx={26}
          fill="#fdfdfd"
        />
        <rect
          x={boardCenterX - 45}
          y={boardY - 28}
          width={90}
          height={36}
          rx={12}
          fill="#d1d6e5"
        />
        <text x={boardCenterX} y={boardY + 130} className="board-brand">
          Seeed Studio
        </text>
        <text x={boardCenterX} y={boardY + 170} className="board-label">
          Model: XIAO-nRF52840
        </text>
        <text x={boardCenterX} y={boardY + 260} className="board-chip">
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
        {analogGroup && (
          <>
            <rect
              x={analogGroup.x}
              y={analogGroup.y}
              width={analogGroup.width}
              height={analogGroup.height}
              rx={18}
              fill="rgba(255,165,165,0.25)"
              stroke="rgba(255,145,145,0.6)"
              strokeDasharray="6 6"
            />
            <text
              x={analogGroup.x + analogGroup.width / 2}
              y={analogGroup.y - 12}
              className="group-label"
            >
              Analog Input
            </text>
          </>
        )}
        {highFreqGroup && (
          <>
            <rect
              x={highFreqGroup.x}
              y={highFreqGroup.y + SENSOR_LABEL_SHIFT}
              width={highFreqGroup.width}
              height={highFreqGroup.height}
              rx={16}
              fill="rgba(137,165,255,0.18)"
              stroke="rgba(122,146,255,0.6)"
              strokeDasharray="4 4"
            />
            <text
              x={highFreqGroup.x + highFreqGroup.width / 2}
              y={highFreqGroup.y - 10 + SENSOR_LABEL_SHIFT}
              className="group-label"
            >
              High Frequency
            </text>
          </>
        )}
        {primaryLeftCenters.map((y, index) => (
          <rect
            key={`primary-left-pad-${index}`}
            x={boardX - EDGE_PAD_WIDTH / 2}
            y={y - EDGE_PAD_HEIGHT / 2}
            width={EDGE_PAD_WIDTH}
            height={EDGE_PAD_HEIGHT}
            rx={6}
            fill="#fddb6f"
            stroke="#f2b200"
          />
        ))}
        {primaryRightCenters.map((y, index) => (
          <rect
            key={`primary-right-pad-${index}`}
            x={boardX + boardWidth - EDGE_PAD_WIDTH / 2}
            y={y - EDGE_PAD_HEIGHT / 2}
            width={EDGE_PAD_WIDTH}
            height={EDGE_PAD_HEIGHT}
            rx={6}
            fill="#fddb6f"
            stroke="#f2b200"
          />
        ))}
      </g>

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
            x={boardX + (boardWidth - boardWidth * 0.62) / 2}
            y={secondaryBoardY + 50}
            width={boardWidth * 0.62}
            height={secondaryBoardHeight - 180}
            rx={26}
            fill="#fdfdfd"
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
            className="board-title board-title--secondary"
          >
            Seeed Studio
          </text>
          <text
            x={secondaryBoardCenterX}
            y={secondaryBoardY + secondaryBoardHeight / 2 + 20}
            className="board-subtitle board-subtitle--secondary"
          >
            XIAO nRF52840 Plus
          </text>
          {secondaryLeftCenters.map((y, index) => (
            <rect
              key={`secondary-left-pad-${index}`}
              x={boardX - EDGE_PAD_WIDTH / 2}
              y={y - EDGE_PAD_HEIGHT / 2}
              width={EDGE_PAD_WIDTH}
              height={EDGE_PAD_HEIGHT}
              rx={6}
              fill="#fddb6f"
              stroke="#f2b200"
            />
          ))}
          {secondaryRightCenters.map((y, index) => (
            <rect
              key={`secondary-right-pad-${index}`}
              x={boardX + boardWidth - EDGE_PAD_WIDTH / 2}
              y={y - EDGE_PAD_HEIGHT / 2}
              width={EDGE_PAD_WIDTH}
              height={EDGE_PAD_HEIGHT}
              rx={6}
              fill="#fddb6f"
              stroke="#f2b200"
            />
          ))}
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
            <text x={rectX + 14} y={rectY + 32} className="pin-label-primary">
              <tspan className="pin-terminal">{pin.terminal}</tspan>
              <tspan>　</tspan>
              <tspan
                className={`pin-alias ${alias ? 'pin-alias--active' : ''}`}
              >
                {alias || 'ALIAS'}
              </tspan>
            </text>
            <text x={rectX + 14} y={rectY + 58} className="pin-label-secondary">
              {pin.nrfPin}
              {pin.arduino ? `　${pin.arduino}` : ''}
            </text>
          </g>
        )
      })}
    </svg>
    )
  }
)

PinBoard.displayName = 'PinBoard'
type GroupRect = { x: number; y: number; width: number; height: number }

const computeGroupRect = (
  pins: PinDefinition[],
  ids: string[],
): GroupRect | null => {
  const selected = pins.filter((pin) => ids.includes(pin.id))
  if (!selected.length) return null
  const minX = Math.min(...selected.map((pin) => pin.position.x))
  const minY = Math.min(...selected.map((pin) => pin.position.y))
  const maxY = Math.max(
    ...selected.map((pin) => pin.position.y + PIN_HEIGHT),
  )
  const padding = 24
  return {
    x: minX - padding,
    y: minY - padding,
    width: PIN_WIDTH + padding * 2,
    height: maxY - minY + padding * 2,
  }
}

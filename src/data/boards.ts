import type { PinDefinition } from './pinMap'
import { XIAO_NRF_PINS, XIAO_NRF_PLUS_PINS } from './pinMap'

export type BoardId = 'xiao-nrf' | 'xiao-nrf-plus'

export interface BoardInfo {
  id: BoardId
  label: string
  description: string
  pins: PinDefinition[]
}

export const BOARDS: BoardInfo[] = [
  {
    id: 'xiao-nrf',
    label: 'XIAO nRF52840',
    description: '標準のnRF52840 / Sense向けピン配置',
    pins: XIAO_NRF_PINS,
  },
  {
    id: 'xiao-nrf-plus',
    label: 'XIAO nRF52840 Plus',
    description: 'キャスティレートIOを含むPlus版',
    pins: XIAO_NRF_PLUS_PINS,
  },
]

import { useMemo, useRef, useState } from 'react'
import { PinBoard } from './components/PinBoard'
import { PinList } from './components/PinList'
import { Legend } from './components/Legend'
import { BOARDS } from './data/boards'
import type { BoardId } from './data/boards'

const buildAliasTemplate = () =>
  Object.fromEntries(
    BOARDS.map((board) => [
      board.id,
      board.pins.reduce<Record<string, string>>(
        (acc, pin) => ({ ...acc, [pin.id]: pin.defaultAlias ?? '' }),
        {},
      ),
    ]),
  ) as Record<BoardId, Record<string, string>>

export default function App() {
  const aliasTemplate = useMemo(buildAliasTemplate, [])

  const [boardId, setBoardId] = useState<BoardId>('xiao-nrf')
  const [aliases, setAliases] = useState<Record<BoardId, Record<string, string>>>(
    () =>
      Object.fromEntries(
        Object.entries(aliasTemplate).map(([id, map]) => [id, { ...map }]),
      ) as Record<BoardId, Record<string, string>>,
  )
  const svgRef = useRef<SVGSVGElement | null>(null)

  const selectedBoard = useMemo(
    () => BOARDS.find((board) => board.id === boardId)!,
    [boardId],
  )

  const activeAliases = aliases[boardId] ?? {}

  const handleAliasChange = (id: string, value: string) => {
    setAliases((prev) => ({
      ...prev,
      [boardId]: { ...prev[boardId], [id]: value },
    }))
  }

  const handleResetAliases = () => {
    setAliases((prev) => ({
      ...prev,
      [boardId]: { ...aliasTemplate[boardId] },
    }))
  }

  const handleDownloadSvg = () => {
    if (!svgRef.current) {
      return
    }

    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svgRef.current)
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `seeed-${selectedBoard.id}-pinout.svg`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <header>
        <div>
          <p className="eyebrow">Seeed XIAO Pin Mapper</p>
          <h1>ピン配置を自由にカスタマイズ</h1>
          <p className="intro">
            ピン番号（P0.xx）、Arduino番号、端子名をベースに任意の別名を追加できます。
            Plusシリーズにも切り替え可能です。
          </p>
        </div>
        <div className="board-switch" role="group" aria-label="XIAO board selection">
          {BOARDS.map((board) => (
            <button
              key={board.id}
              type="button"
              className={
                'board-switch__button' +
                (board.id === boardId ? ' board-switch__button--active' : '')
              }
              onClick={() => setBoardId(board.id)}
            >
              <span>{board.label}</span>
              <small>{board.description}</small>
            </button>
          ))}
        </div>
      </header>

      <Legend />

      <div className="main-grid">
        <section className="panel">
          <div className="panel__title">
            <h2>{selectedBoard.label} プレビュー</h2>
            <p>{selectedBoard.description}</p>
          </div>
          <div className="panel__canvas">
            <PinBoard aliases={activeAliases} pins={selectedBoard.pins} ref={svgRef} />
          </div>
          <div className="panel__actions">
            <button className="primary" onClick={handleDownloadSvg}>
              SVGを書き出す
            </button>
            <button onClick={handleResetAliases}>別名をリセット</button>
          </div>
        </section>

        <section className="panel">
          <PinList
            pins={selectedBoard.pins}
            aliases={activeAliases}
            onAliasChange={handleAliasChange}
          />
        </section>
      </div>
    </div>
  )
}

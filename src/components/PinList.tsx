import type { PinDefinition } from '../data/pinMap'

type PinListProps = {
  pins: PinDefinition[]
  aliases: Record<string, string>
  onAliasChange: (id: string, value: string) => void
}

export function PinList({ pins, aliases, onAliasChange }: PinListProps) {
  return (
    <div className="pin-list">
      <div className="pin-list__header">
        <h3>Alias設定</h3>
        <p>ピンに任意の別名を設定すると、SVGにも反映されます。</p>
      </div>
      <div className="pin-list__table-wrapper">
        <table>
          <thead>
            <tr>
              <th>nRF Pin</th>
              <th>Arduino</th>
              <th>端子名</th>
              <th>別名</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((pin) => (
              <tr key={pin.id}>
                <td>
                  <span className="pin-pill">{pin.nrfPin}</span>
                </td>
                <td>{pin.arduino ?? '—'}</td>
                <td>{pin.terminal}</td>
                <td>
                  <input
                    type="text"
                    value={aliases[pin.id] ?? ''}
                    onChange={(event) =>
                      onAliasChange(pin.id, event.target.value)
                    }
                    placeholder="例) Sensor IN"
                    aria-label={`${pin.nrfPin} の別名`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

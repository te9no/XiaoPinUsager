import { PIN_CATEGORY_INFO } from '../data/pinMap'

export function Legend() {
  return (
    <div className="legend">
      {Object.entries(PIN_CATEGORY_INFO).map(([key, info]) => (
        <div className="legend__item" key={key}>
          <span
            className="legend__swatch"
            style={{ backgroundColor: info.color }}
            aria-hidden="true"
          />
          <span>{info.label}</span>
        </div>
      ))}
    </div>
  )
}


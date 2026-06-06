import { useState, useEffect } from 'react'

const STYLE_ID = 'kayo-brutalist-slider-styles'
const CSS = `
.kayo-range-input {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  width: 100%;
  height: 28px;
  padding: 0;
  margin: 0;
}
.kayo-range-input::-webkit-slider-runnable-track {
  height: 8px;
  border: 2px solid var(--kayo-color-border, #3b3d3f);
  border-radius: 2px;
  background: linear-gradient(
    to right,
    var(--kayo-color-primary, #970103) 0%,
    var(--kayo-color-primary, #970103) var(--fill, 0%),
    #ffffff var(--fill, 0%),
    #ffffff 100%
  );
}
.kayo-range-input::-moz-range-track {
  height: 8px;
  border: 2px solid var(--kayo-color-border, #3b3d3f);
  border-radius: 2px;
  background: #ffffff;
}
.kayo-range-input::-moz-range-progress {
  height: 8px;
  background: var(--kayo-color-primary, #970103);
  border-radius: 0;
}
.kayo-range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--kayo-color-border, #3b3d3f);
  background: #ffffff;
  box-shadow: 2px 2px 0 #191b1f;
  cursor: grab;
  margin-top: -6px;
  transition: box-shadow 60ms, transform 60ms;
}
.kayo-range-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--kayo-color-border, #3b3d3f);
  background: #ffffff;
  box-shadow: 2px 2px 0 #191b1f;
  cursor: grab;
  box-sizing: border-box;
  transition: box-shadow 60ms, transform 60ms;
}
.kayo-range-input:active::-webkit-slider-thumb {
  box-shadow: none;
  transform: translate(2px, 2px);
}
.kayo-range-input:active::-moz-range-thumb {
  box-shadow: none;
  transform: translate(2px, 2px);
}
.kayo-range-input:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
.kayo-range-input:disabled::-webkit-slider-thumb {
  box-shadow: none;
  cursor: not-allowed;
}

/* Range overlay inputs — transparent track, all pointer-events only on the thumb */
.kayo-range-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}
.kayo-range-overlay::-webkit-slider-runnable-track {
  background: transparent;
  border-color: transparent;
}
.kayo-range-overlay::-moz-range-track {
  background: transparent;
  border-color: transparent;
}
.kayo-range-overlay::-webkit-slider-thumb {
  pointer-events: all;
}
.kayo-range-overlay::-moz-range-thumb {
  pointer-events: all;
}
`

// ─── Single slider ─────────────────────────────────────────────────────────

export interface KayoBrutalistSliderProps {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

export function KayoBrutalistSlider({
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  value: controlledValue,
  defaultValue,
  onChange,
}: KayoBrutalistSliderProps) {
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement('style')
      el.id = STYLE_ID
      el.textContent = CSS
      document.head.appendChild(el)
    }
  }, [])

  const [internal, setInternal] = useState(controlledValue ?? defaultValue ?? min)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue! : internal
  const fillPct = ((value - min) / (max - min)) * 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    if (!isControlled) setInternal(v)
    onChange?.(v)
  }

  return (
    <input
      type="range"
      className="kayo-range-input"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      style={{ '--fill': `${fillPct}%` } as React.CSSProperties}
    />
  )
}

// ─── Range slider (two thumbs) ─────────────────────────────────────────────

export interface KayoBrutalistRangeSliderProps {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  value?: [number, number]
  defaultValue?: [number, number]
  onChange?: (value: [number, number]) => void
}

export function KayoBrutalistRangeSlider({
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  value: controlledValue,
  defaultValue,
  onChange,
}: KayoBrutalistRangeSliderProps) {
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const el = document.createElement('style')
      el.id = STYLE_ID
      el.textContent = CSS
      document.head.appendChild(el)
    }
  }, [])

  const initDefault: [number, number] = defaultValue ?? [
    min + Math.floor((max - min) / 4),
    min + Math.floor(((max - min) * 3) / 4),
  ]
  const [internal, setInternal] = useState<[number, number]>(controlledValue ?? initDefault)
  const isControlled = controlledValue !== undefined
  const [lo, hi] = isControlled ? controlledValue! : internal

  const loFillPct = ((lo - min) / (max - min)) * 100
  const hiFillPct = ((hi - min) / (max - min)) * 100

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), hi - step)
    if (!isControlled) setInternal([v, hi])
    onChange?.([v, hi])
  }
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), lo + step)
    if (!isControlled) setInternal([lo, v])
    onChange?.([lo, v])
  }

  return (
    <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
      {/* Visual track */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 8,
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: 2,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${loFillPct}%`,
          width: `${hiFillPct - loFillPct}%`,
          backgroundColor: 'var(--kayo-color-primary, #970103)',
        }} />
      </div>
      {/* Min thumb input */}
      <input
        type="range"
        className="kayo-range-input kayo-range-overlay"
        min={min}
        max={max}
        step={step}
        value={lo}
        disabled={disabled}
        onChange={handleMin}
        style={{ zIndex: lo >= hi - step ? 5 : 3 }}
      />
      {/* Max thumb input */}
      <input
        type="range"
        className="kayo-range-input kayo-range-overlay"
        min={min}
        max={max}
        step={step}
        value={hi}
        disabled={disabled}
        onChange={handleMax}
        style={{ zIndex: 4 }}
      />
    </div>
  )
}

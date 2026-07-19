import { ReactNode } from 'react'

export interface TelemetryColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

export interface TechnocracyTelemetryTableProps<T> {
  columns: TelemetryColumn<T>[]
  data: T[]
  caption?: string
}

export function TechnocracyTelemetryTable<T extends { id: string | number }>({
  columns,
  data,
  caption,
}: TechnocracyTelemetryTableProps<T>) {
  return (
    <div
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.11)',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        {caption && (
          <caption
            style={{
              padding: '10px 12px',
              color: '#8b94a7',
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontSize: '11px',
            }}
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key}
                style={{
                  padding: '9px 12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.11)',
                  borderRight: idx < columns.length - 1 ? '1px solid rgba(255, 255, 255, 0.11)' : 'none',
                  color: '#8b94a7',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col, idx) => (
                <td
                  key={col.key}
                  style={{
                    padding: '9px 12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.11)',
                    borderRight: idx < columns.length - 1 ? '1px solid rgba(255, 255, 255, 0.11)' : 'none',
                    color: '#f2f5fa',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

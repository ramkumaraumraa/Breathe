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
        border: '1px solid var(--thcy-color-border)',
        fontFamily: "var(--thcy-font-family)",
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        {caption && (
          <caption
            style={{
              padding: '10px 12px',
              color: 'var(--thcy-color-foreground-secondary)',
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
                  borderTop: '1px solid var(--thcy-color-border)',
                  borderRight: idx < columns.length - 1 ? '1px solid var(--thcy-color-border)' : 'none',
                  color: 'var(--thcy-color-foreground-secondary)',
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
                    borderTop: '1px solid var(--thcy-color-border)',
                    borderRight: idx < columns.length - 1 ? '1px solid var(--thcy-color-border)' : 'none',
                    color: 'var(--thcy-color-foreground)',
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

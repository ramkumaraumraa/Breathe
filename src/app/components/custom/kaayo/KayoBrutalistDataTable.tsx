import { ReactNode, useEffect, useRef } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const STYLE_ID = 'kayo-data-table-styles'

export interface KayoTableColumn<T = Record<string, unknown>> {
  key: string
  header: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (value: unknown, row: T) => ReactNode
}

export interface KayoBrutalistDataTableProps<T = Record<string, unknown>> {
  columns: KayoTableColumn<T>[]
  rows: T[]
  rowKey?: string
  selectable?: boolean
  selectedKeys?: string[]
  onSelectChange?: (keys: string[]) => void
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  emptyState?: ReactNode
  loading?: boolean
  skeletonRowCount?: number
  footer?: ReactNode
  stickyHeader?: boolean
  rowHeight?: 'compact' | 'comfortable'
}

export function KayoBrutalistDataTable<T = Record<string, unknown>>({
  columns,
  rows,
  rowKey = 'id',
  selectable = false,
  selectedKeys = [],
  onSelectChange,
  sortKey,
  sortDir,
  onSort,
  emptyState,
  loading = false,
  skeletonRowCount = 5,
  footer,
  stickyHeader = false,
  rowHeight = 'comfortable',
}: KayoBrutalistDataTableProps<T>) {

  const selectAllRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-dt-row:hover td { background: #f9fafb; }
      .kayo-dt-th-sort:hover { color: #970103; }
      @keyframes kayo-skeleton-pulse {
        0%,100% { opacity:1; } 50% { opacity:0.4; }
      }
      .kayo-dt-skeleton { animation: kayo-skeleton-pulse 1.5s ease-in-out infinite; }
    `
    document.head.appendChild(s)
  }, [])

  const allKeys = rows.map((row, idx) =>
    String((row as Record<string, unknown>)[rowKey] ?? idx)
  )
  const allSelected = allKeys.length > 0 && allKeys.every(k => selectedKeys.includes(k))
  const partiallySelected = !allSelected && allKeys.some(k => selectedKeys.includes(k))

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = partiallySelected
    }
  })

  const cellPadding = rowHeight === 'compact' ? '8px 16px' : '14px 16px'

  const handleSelectAll = () => {
    if (!onSelectChange) return
    if (allSelected) {
      onSelectChange([])
    } else {
      onSelectChange(allKeys)
    }
  }

  const handleSelectRow = (key: string) => {
    if (!onSelectChange) return
    if (selectedKeys.includes(key)) {
      onSelectChange(selectedKeys.filter(k => k !== key))
    } else {
      onSelectChange([...selectedKeys, key])
    }
  }

  const renderSortIcon = (col: KayoTableColumn<T>) => {
    if (!col.sortable) return null
    const isActive = sortKey === col.key
    if (isActive && sortDir === 'asc') {
      return <ChevronUp size={14} style={{ color: '#970103', flexShrink: 0 }} />
    }
    if (isActive && sortDir === 'desc') {
      return <ChevronDown size={14} style={{ color: '#970103', flexShrink: 0 }} />
    }
    return <ChevronUp size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
  }

  const skeletonRows = Array.from({ length: skeletonRowCount }).map((_, i) => (
    <tr key={`skeleton-${i}`}>
      {selectable && (
        <td style={{ padding: cellPadding, width: 48 }}>
          <div
            className="kayo-dt-skeleton"
            style={{
              height: 16,
              borderRadius: 3,
              backgroundColor: i % 2 === 0 ? '#f4f4f4' : '#e5e7eb',
            }}
          />
        </td>
      )}
      {columns.map(col => (
        <td key={col.key} style={{ padding: cellPadding }}>
          <div
            className="kayo-dt-skeleton"
            style={{
              height: 16,
              borderRadius: 3,
              backgroundColor: i % 2 === 0 ? '#f4f4f4' : '#e5e7eb',
            }}
          />
        </td>
      ))}
    </tr>
  ))

  const isEmpty = !loading && rows.length === 0

  return (
    <div
      style={{
        border: '2px solid #3b3d3f',
        borderRadius: 6,
        overflow: 'hidden',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead
            style={{
              backgroundColor: '#f4f4f4',
              borderBottom: '2px solid #3b3d3f',
              position: stickyHeader ? 'sticky' : undefined,
              top: stickyHeader ? 0 : undefined,
              zIndex: stickyHeader ? 1 : undefined,
            }}
          >
            <tr>
              {selectable && (
                <th style={{ width: 48, padding: '10px 16px' }}>
                  <input
                    type="checkbox"
                    ref={selectAllRef}
                    checked={allSelected}
                    onChange={handleSelectAll}
                    style={{
                      width: 16,
                      height: 16,
                      cursor: 'pointer',
                      accentColor: '#970103',
                    }}
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  className={col.sortable ? 'kayo-dt-th-sort' : undefined}
                  onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                  style={{
                    padding: '10px 16px',
                    fontWeight: 700,
                    fontSize: 13,
                    color: '#3b3d3f',
                    userSelect: 'none',
                    textAlign: col.align ?? 'left',
                    cursor: col.sortable ? 'pointer' : undefined,
                    width: col.width,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.header}
                    {renderSortIcon(col)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              skeletonRows
            ) : isEmpty ? (
              <tr>
                <td
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  style={{ padding: 0 }}
                >
                  <div
                    style={{
                      minHeight: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {emptyState ?? (
                      <span style={{ color: '#9ca3af', fontSize: 14 }}>No data available</span>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => {
                const key = String((row as Record<string, unknown>)[rowKey] ?? idx)
                const isSelected = selectedKeys.includes(key)
                return (
                  <tr
                    key={key}
                    className="kayo-dt-row"
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: isSelected ? '#fff0f0' : undefined,
                    }}
                  >
                    {selectable && (
                      <td style={{ width: 48, padding: cellPadding }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(key)}
                          style={{
                            width: 16,
                            height: 16,
                            cursor: 'pointer',
                            accentColor: '#970103',
                          }}
                        />
                      </td>
                    )}
                    {columns.map(col => {
                      const value = (row as Record<string, unknown>)[col.key]
                      return (
                        <td
                          key={col.key}
                          style={{
                            padding: cellPadding,
                            fontSize: 14,
                            color: '#191b1f',
                            textAlign: col.align ?? 'left',
                          }}
                        >
                          {col.render
                            ? col.render(value, row)
                            : String(value ?? '')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {footer && (
        <div style={{ borderTop: '2px solid #3b3d3f', padding: '12px 16px' }}>
          {footer}
        </div>
      )}
    </div>
  )
}

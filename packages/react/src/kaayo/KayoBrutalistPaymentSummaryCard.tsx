import { TrendingUp, TrendingDown, Wallet, Users } from 'lucide-react'
import { KayoBrutalistAmountVisibilityToggle } from './KayoBrutalistAmountVisibilityToggle'

export interface KayoBrutalistPaymentSummaryCardProps {
  title?: string
  expected: number
  collected: number
  pending: number
  totalStudents: number
  paidStudents: number
  unpaidStudents: number
  isVisible?: boolean
  onToggleVisibility?: () => void
  compact?: boolean
}

const AMOUNT_MASK = '₹ ••••'
const COUNT_MASK = '•••'

function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function compactRupees(n: number): string {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`
  if (n >= 1_000) return `₹${Math.round(n / 1_000)}k`
  return `₹${n}`
}

function maskAmount(value: string, visible: boolean) {
  return visible ? value : AMOUNT_MASK
}

function maskCount(value: number, visible: boolean) {
  return visible ? String(value) : COUNT_MASK
}

export function KayoBrutalistPaymentSummaryCard({
  title,
  expected,
  collected,
  pending,
  totalStudents,
  paidStudents,
  unpaidStudents,
  isVisible = true,
  onToggleVisibility,
  compact = false,
}: KayoBrutalistPaymentSummaryCardProps) {
  const fmt = compact ? compactRupees : formatRupees

  return (
    <div
      style={{
        borderRadius: 'var(--kayo-radius-default, 8px)',
        border: '2px solid var(--kayo-color-border, #191b1f)',
        background: '#ffffff',
        padding: compact ? '16px' : '20px',
        boxShadow: 'var(--kayo-shadow-md, 4px 4px 0 #191b1f)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {(title || onToggleVisibility) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          {title ? (
            <h3 style={{ margin: 0, fontSize: compact ? '16px' : '18px', fontWeight: 700, color: '#14161a' }}>
              {title}
            </h3>
          ) : (
            <div />
          )}
          {onToggleVisibility && (
            <KayoBrutalistAmountVisibilityToggle visible={isVisible} onToggle={onToggleVisibility} />
          )}
        </div>
      )}

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#37415C', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
            <TrendingUp size={13} strokeWidth={2.25} />
            <span>EXPECTED</span>
          </div>
          <div style={{ fontSize: compact ? '18px' : '22px', fontWeight: 700, color: '#14161a', marginTop: '4px' }}>
            {maskAmount(fmt(expected), isVisible)}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#126932', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
            <Wallet size={13} strokeWidth={2.25} />
            <span>COLLECTED</span>
          </div>
          <div style={{ fontSize: compact ? '18px' : '22px', fontWeight: 700, color: '#14161a', marginTop: '4px' }}>
            {maskAmount(fmt(collected), isVisible)}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#985306', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
            <TrendingDown size={13} strokeWidth={2.25} />
            <span>PENDING</span>
          </div>
          <div style={{ fontSize: compact ? '18px' : '22px', fontWeight: 700, color: '#14161a', marginTop: '4px' }}>
            {maskAmount(fmt(pending), isVisible)}
          </div>
        </div>
      </div>

      <div style={{ height: '2px', backgroundColor: '#e5e5e7', margin: '16px 0' }} />

      {/* Student stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#747476', marginBottom: '2px' }}>Total Students</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#14161a' }}>
            {maskCount(totalStudents, isVisible)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#126932', marginBottom: '2px' }}>Paid</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#14161a' }}>
            {maskCount(paidStudents, isVisible)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#985306', marginBottom: '2px' }}>Unpaid</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#985306' }}>
            {maskCount(unpaidStudents, isVisible)}
          </div>
        </div>
      </div>
    </div>
  )
}

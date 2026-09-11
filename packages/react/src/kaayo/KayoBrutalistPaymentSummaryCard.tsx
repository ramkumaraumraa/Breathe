import { TrendingUp, TrendingDown, Wallet, Users, ChevronRight } from 'lucide-react';
import { KayoBrutalistAmountVisibilityToggle } from './KayoBrutalistAmountVisibilityToggle';

export interface KayoBrutalistPaymentSummaryCardProps {
  title?: string;
  expected: number;
  collected: number;
  pending: number;
  totalStudents: number;
  paidStudents: number;
  unpaidStudents: number;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  compact?: boolean;
  /** Render financials and student stats as two separate card blocks. */
  split?: boolean;
  /** Split mode only: shows a "View branch-wise details" CTA button beneath the cards. */
  onViewDetails?: () => void;
}

const AMOUNT_MASK = '₹ ••••';
const COUNT_MASK = '•••';

function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function compactRupees(n: number): string {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000) return `₹${Math.round(n / 1_000)}k`;
  return `₹${n}`;
}

function maskAmount(value: string, visible: boolean) {
  return visible ? value : AMOUNT_MASK;
}

function maskCount(value: number, visible: boolean) {
  return visible ? String(value) : COUNT_MASK;
}

function FinancialMetrics({
  expected,
  collected,
  pending,
  fmt,
  isVisible,
  compact,
}: {
  expected: number;
  collected: number;
  pending: number;
  fmt: (n: number) => string;
  isVisible: boolean;
  compact: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Primary Metric — EXPECTED (Full Width Row to prevent currency wrap) */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#37415C',
            fontSize: compact ? '10px' : '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          <TrendingUp size={compact ? 11 : 13} strokeWidth={2.25} />
          <span>EXPECTED</span>
        </div>
        <div
          style={{
            fontSize: compact ? '20px' : '24px',
            fontWeight: 700,
            color: '#14161a',
            marginTop: '4px',
          }}
        >
          {maskAmount(fmt(expected), isVisible)}
        </div>
      </div>

      <div style={{ height: '2px', backgroundColor: '#f1f1f2' }} />

      {/* Secondary Metrics — COLLECTED & PENDING (2 Column Split) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#126932',
              fontSize: compact ? '10px' : '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            <Wallet size={compact ? 11 : 13} strokeWidth={2.25} />
            <span>COLLECTED</span>
          </div>
          <div
            style={{
              fontSize: compact ? '18px' : '20px',
              fontWeight: 700,
              color: '#14161a',
              marginTop: '4px',
            }}
          >
            {maskAmount(fmt(collected), isVisible)}
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#985306',
              fontSize: compact ? '10px' : '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            <TrendingDown size={compact ? 11 : 13} strokeWidth={2.25} />
            <span>PENDING</span>
          </div>
          <div
            style={{
              fontSize: compact ? '18px' : '20px',
              fontWeight: 700,
              color: '#14161a',
              marginTop: '4px',
            }}
          >
            {maskAmount(fmt(pending), isVisible)}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentStats({
  totalStudents,
  paidStudents,
  unpaidStudents,
  isVisible,
  compact,
}: {
  totalStudents: number;
  paidStudents: number;
  unpaidStudents: number;
  isVisible: boolean;
  compact: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Total Students — Full Width Row */}
      <div>
        <div style={{ fontSize: compact ? '10px' : '11px', color: '#747476', marginBottom: '2px' }}>
          Total Students
        </div>
        <div style={{ fontSize: compact ? '18px' : '22px', fontWeight: 700, color: '#14161a' }}>
          {maskCount(totalStudents, isVisible)}
        </div>
      </div>

      <div style={{ height: '2px', backgroundColor: '#f1f1f2' }} />

      {/* Paid & Unpaid — 2 Column Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <div style={{ fontSize: compact ? '10px' : '11px', color: '#126932', marginBottom: '2px' }}>
            Paid
          </div>
          <div style={{ fontSize: compact ? '16px' : '18px', fontWeight: 700, color: '#14161a' }}>
            {maskCount(paidStudents, isVisible)}
          </div>
        </div>

        <div>
          <div style={{ fontSize: compact ? '10px' : '11px', color: '#985306', marginBottom: '2px' }}>
            Unpaid
          </div>
          <div style={{ fontSize: compact ? '16px' : '18px', fontWeight: 700, color: '#985306' }}>
            {maskCount(unpaidStudents, isVisible)}
          </div>
        </div>
      </div>
    </div>
  );
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
  split = false,
  onViewDetails,
}: KayoBrutalistPaymentSummaryCardProps) {
  const fmt = compact ? compactRupees : formatRupees;

  const cardStyle: React.CSSProperties = {
    borderRadius: 'var(--kayo-radius-default, 8px)',
    border: '2px solid var(--kayo-color-border, #191b1f)',
    background: '#ffffff',
    padding: compact ? '16px' : '20px',
    boxShadow: 'var(--kayo-shadow-md, 4px 4px 0 #191b1f)',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  };

  if (split) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={cardStyle}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#14161a' }}>
              Financial Overview
            </h3>
            {onToggleVisibility && (
              <KayoBrutalistAmountVisibilityToggle visible={isVisible} onToggle={onToggleVisibility} />
            )}
          </div>
          <FinancialMetrics
            expected={expected}
            collected={collected}
            pending={pending}
            fmt={fmt}
            isVisible={isVisible}
            compact={compact}
          />
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 700, color: '#14161a' }}>
            Student Statistics
          </h3>
          <StudentStats
            totalStudents={totalStudents}
            paidStudents={paidStudents}
            unpaidStudents={unpaidStudents}
            isVisible={isVisible}
            compact={compact}
          />
        </div>

        {onViewDetails && (
          <button
            type="button"
            onClick={onViewDetails}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: 'var(--kayo-radius-sm, 4px)',
              border: '2px solid var(--kayo-color-border, #191b1f)',
              backgroundColor: 'var(--kayo-color-primary, #970103)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
              userSelect: 'none',
            }}
          >
            <span>View branch-wise details</span>
            <ChevronRight size={16} strokeWidth={2.25} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={cardStyle}>
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

      <FinancialMetrics
        expected={expected}
        collected={collected}
        pending={pending}
        fmt={fmt}
        isVisible={isVisible}
        compact={compact}
      />

      <div style={{ height: '2px', backgroundColor: '#e5e5e7', margin: '16px 0' }} />

      <StudentStats
        totalStudents={totalStudents}
        paidStudents={paidStudents}
        unpaidStudents={unpaidStudents}
        isVisible={isVisible}
        compact={compact}
      />
    </div>
  );
}

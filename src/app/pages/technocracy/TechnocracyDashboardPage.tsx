import { useState } from 'react'
import {
  TechnocracySidebar,
  TechnocracyGlassCard,
  TechnocracyStatTile,
  TechnocracySignalBadge,
  TechnocracyActionCTA,
  TechnocracySectionLabel,
  TechnocracyAlertBanner,
  TechnocracyTelemetryTable,
  TechnocracyDiagnosticPanel,
  TechnocracyProgressBar,
  TechnocracyModalOverlay,
} from '@aumraa/breathe-react/technocracy'
import { ShieldCheck, Cpu, HardDrive, Terminal } from 'lucide-react'

export function TechnocracyDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [alertDismissed, setAlertDismissed] = useState(false)

  const navItems = [
    { id: 'overview', label: 'OVERVIEW', glyph: '⚡', active: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { id: 'nodes', label: 'NODES', glyph: '◈', active: activeTab === 'nodes', onClick: () => setActiveTab('nodes') },
    { id: 'telemetry', label: 'TELEMETRY', glyph: '📊', active: activeTab === 'telemetry', onClick: () => setActiveTab('telemetry') },
    { id: 'security', label: 'SECURITY', glyph: '🛡️', active: activeTab === 'security', onClick: () => setActiveTab('security') },
  ]

  const telemetryData = [
    { id: '1', node: 'us-east-cluster', status: 'HEALTHY', latency: '12ms', cpu: 28 },
    { id: '2', node: 'ap-south-mumbai', status: 'HEALTHY', latency: '4ms', cpu: 14 },
    { id: '3', node: 'eu-central-frankfurt', status: 'SYNCING', latency: '142ms', cpu: 74 },
  ]

  const columns = [
    { key: 'node', header: 'Node Cluster', render: (r: (typeof telemetryData)[0]) => <strong>{r.node}</strong> },
    {
      key: 'status',
      header: 'Status',
      render: (r: (typeof telemetryData)[0]) => (
        <TechnocracySignalBadge
          label={r.status}
          color={r.status === 'HEALTHY' ? 'green' : 'amber'}
        />
      ),
    },
    { key: 'latency', header: 'Ping Latency', render: (r: (typeof telemetryData)[0]) => r.latency },
    {
      key: 'cpu',
      header: 'CPU Load',
      render: (r: (typeof telemetryData)[0]) => (
        <div style={{ width: '120px' }}>
          <TechnocracyProgressBar value={r.cpu} color={r.cpu > 70 ? '#f0a30a' : '#00dc82'} />
        </div>
      ),
    },
  ]

  const diagnostics = [
    { key: 'sys_id', label: 'SYSTEM ID', value: 'TC-KAAYO-NODE-092' },
    { key: 'kernel', label: 'KERNEL', value: 'Linux 6.8.0-rc4-technocracy' },
    { key: 'uptime', label: 'UPTIME', value: '99.988% (42 days, 14 hrs)' },
    { key: 'memory', label: 'MEMORY', value: '42.8 GB / 64.0 GB (66.8% allocated)' },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#04060f',
        color: '#f2f5fa',
        fontFamily: "'Source Code Pro', ui-monospace, monospace",
      }}
    >
      <TechnocracySidebar
        brandName="TECHNOCRACY"
        brandSub="KAAYO ADMIN OS"
        items={navItems}
        footer={<div>PRODUCT FACTORY v2.4 · ALWAYS DARK MODE</div>}
      />

      <main style={{ padding: '24px', minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ color: '#8b94a7', fontSize: '10px', letterSpacing: '0.12em', marginBottom: '4px' }}>
              KAAYO PRODUCT FACTORY / ADMIN OS
            </div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#f2f5fa' }}>
              Telemetry Control Panel
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <TechnocracyActionCTA variant="secondary" label="Run Diagnostics" onClick={() => setIsModalOpen(true)} />
            <TechnocracyActionCTA variant="primary" label="Deploy Upgrade" iconLeft={<Terminal size={14} />} />
          </div>
        </div>

        {!alertDismissed && (
          <div style={{ marginBottom: '20px' }}>
            <TechnocracyAlertBanner
              variant="warning"
              message="System Notice: Scheduled database index maintenance in 4 hours. No downtime expected."
              onDismiss={() => setAlertDismissed(true)}
            />
          </div>
        )}

        {/* Section 1 */}
        <TechnocracySectionLabel title="System Status Grid" marker="1" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <TechnocracyStatTile
            label="Active Connections"
            value="4,821"
            detail="▲ +12.4% vs last hour"
            badge={<TechnocracySignalBadge label="LIVE" color="green" />}
          />
          <TechnocracyStatTile
            label="API Latency"
            value="18ms"
            detail="Optimal response window"
            badge={<TechnocracySignalBadge label="FAST" color="blue" />}
          />
          <TechnocracyStatTile
            label="Error Rate"
            value="0.002%"
            detail="Within safe parameters"
            badge={<TechnocracySignalBadge label="PASS" color="green" />}
          />
        </div>

        {/* Section 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <TechnocracySectionLabel title="Cluster Node Telemetry" marker="2" />
            <TechnocracyGlassCard showCrosshair>
              <TechnocracyTelemetryTable columns={columns} data={telemetryData} caption="Active Node Performance Feed" />
            </TechnocracyGlassCard>
          </div>

          <div>
            <TechnocracySectionLabel title="Hardware Diagnostics" marker="3" />
            <TechnocracyDiagnosticPanel items={diagnostics} />
          </div>
        </div>

        {/* Modal */}
        <TechnocracyModalOverlay
          isOpen={isModalOpen}
          title="System Diagnostics & Node Audit"
          onClose={() => setIsModalOpen(false)}
        >
          <p style={{ fontSize: '13px', color: '#8b94a7', lineHeight: 1.5 }}>
            Executing node health check across all registered data centers. All security certificates and API tokens are valid.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <TechnocracyActionCTA variant="secondary" label="Close" onClick={() => setIsModalOpen(false)} />
            <TechnocracyActionCTA variant="primary" label="Confirm Audit" onClick={() => setIsModalOpen(false)} />
          </div>
        </TechnocracyModalOverlay>
      </main>
    </div>
  )
}

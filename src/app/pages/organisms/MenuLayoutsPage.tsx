import { useState, useEffect } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { AndroidFrame } from '@/app/components/shared/AndroidFrame'
import { KayoBrutalistHeader } from '@/app/components/custom/kaayo/KayoBrutalistHeader'
import { KayoBrutalistBottomNav } from '@/app/components/custom/kaayo/KayoBrutalistBottomNav'
import { KayoBrutalistBrandedScreenBackdrop } from '@/app/components/custom/kaayo/KayoBrutalistBrandedScreenBackdrop'
import { KayoBrutalistBranchTabs } from '@/app/components/custom/kaayo/KayoBrutalistBranchTabs'
import { KayoBrutalistFab, DEFAULT_KAAYO_DASHBOARD_ACTIONS } from '@/app/components/custom/kaayo/KayoBrutalistFab'
import { KayoBrutalistKaayoLogo } from '@/app/components/custom/kaayo/KayoBrutalistKaayoLogo'
import {
  KayoStatusDot,
  KayoChip,
  KayoClayDial,
  KayoEnrollmentTag,
  KayoWarliVeil,
  KayoKhataFolder,
  KayoNotificationBanner,
  KayoClayPill,
  KayoBrutalistButton,
  KayoBrutalistAmountVisibilityToggle,
} from '@aumraa/breathe-react/kaayo'
import {
  Home,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Plus,
  Search,
  Phone,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertTriangle,
  ArrowRight,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sliders,
  DollarSign,
  Bell,
  Clock,
  X,
  UserPlus
} from 'lucide-react'

export function MenuLayoutsPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeAlertIdx, setActiveAlertIdx] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [paymentsPrivacyVisible, setPaymentsPrivacyVisible] = useState(false)

  useEffect(() => {
    const s = document.createElement('style')
    s.innerHTML = `
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(s)
  }, [])

  const alerts = [
    { title: 'Dev mode - auth bypassed', desc: 'Lock down before production rollout.' },
    { title: 'Attendance not marked', desc: '2 classes today need attendance marked.' },
    { title: 'Past dues alert', desc: '4 students in South Club have overdue fees.' },
  ]

  // Data for screens - matches Kaayo's BOTTOM_NAV specification
  const ITEMS_5 = [
    { key: 'dashboard',  label: 'Home',        icon: <Home size={22} /> },
    { key: 'students',   label: 'Students',    icon: <Users size={22} /> },
    { key: 'attendance', label: 'Attendance',  icon: <ClipboardList size={22} /> },
    { key: 'payments',   label: 'Payments',    icon: <BarChart3 size={22} /> },
    { key: 'settings',   label: 'Settings',    icon: <Settings size={22} /> },
  ]

  // Shared Header Config
  const demoUser = { name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }

  // Render Page Content inside phone viewport
  const renderScreenContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fdfcfb', position: 'relative' }}>
            {/* Fixed Branded Header Bar (pinned overlay via AppShell) */}
            <div style={{
              paddingTop: '28px',
              paddingBottom: '8px',
              paddingInline: '16px',
              backgroundColor: '#970103',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #3b3d3f',
              zIndex: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KayoBrutalistKaayoLogo variant="symbol" tone="white" size={28} />
              </div>
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
                title="Notifications"
              >
                <Bell size={20} color="#ffffff" strokeWidth={2.2} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }} className="no-scrollbar">
              <KayoBrutalistBrandedScreenBackdrop
                variant="dashboard"
                safeAreaTop={false}
                title="Welcome back, Ram."
              >
                {/* Next Class Section inside canopy */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #17191D',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '4px 4px 0px #17191D',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.5px' }}>
                          NEXT CLASS
                        </span>
                        <KayoChip label="AD-HOC" tone="primary" size="sm" />
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 800, color: '#17191D', lineHeight: 1 }}>19:00</span>
                        <KayoChip label="Starts in 25m" tone="secondary" size="sm" dot="live" />
                      </div>

                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#17191D' }}>
                        MMA Advanced · Main Branch
                      </span>
                    </div>

                    {/* Batches Today Clay Dial */}
                    <div style={{ flexShrink: 0 }}>
                      <KayoClayDial
                        variant="inset"
                        colors={['#01971A', '#01971A', '#F5590B']}
                        value={3}
                        caption="BATCHES"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                    <div style={{ flex: 1 }}>
                      <KayoBrutalistButton
                        label="Mark Attendance"
                        variant="primary"
                        size="sm"
                        tonal
                        fullWidth
                      />
                    </div>
                    <KayoBrutalistButton
                      label="Cancel"
                      variant="secondary"
                      size="sm"
                    />
                  </div>
                </div>
              </KayoBrutalistBrandedScreenBackdrop>

              {/* Page content scrolling below the canopy */}
              <div style={{ padding: '16px 12px 24px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Notifications Carousel v3 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <KayoNotificationBanner
                    category={activeAlertIdx === 0 ? 'positive' : activeAlertIdx === 1 ? 'alert' : 'negative'}
                    title={alerts[activeAlertIdx].title}
                    message={alerts[activeAlertIdx].desc}
                    dateLabel="TODAY 5:30 PM"
                    actionLabel="Review"
                    sticker={
                      activeAlertIdx === 0 ? (
                        <CheckCircle size={32} color="#01971A" />
                      ) : activeAlertIdx === 1 ? (
                        <AlertTriangle size={32} color="#F5590B" />
                      ) : (
                        <Bell size={32} color="#DC2626" />
                      )
                    }
                  />
                  {/* Carousel navigation dots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    {alerts.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveAlertIdx(i)}
                        style={{
                          width: activeAlertIdx === i ? '16px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          backgroundColor: activeAlertIdx === i ? '#970103' : '#d1d5db',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Fee Status Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.5px' }}>
                    FEE STATUS BY BRANCH
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                      { branch: 'Main Branch', pct: 75, paid: 12, unpaid: 4 },
                      { branch: 'Annex', pct: 100, paid: 8, unpaid: 0 },
                      { branch: 'South Club', pct: 40, paid: 4, unpaid: 6 },
                      { branch: 'West Hub', pct: 85, paid: 11, unpaid: 2 },
                    ].map((t, idx) => {
                      const color = t.pct >= 80 ? '#137333' : t.pct >= 50 ? '#d97706' : '#970103'
                      return (
                        <div
                          key={idx}
                          style={{
                            flexBasis: 'calc(50% - 4px)',
                            flexGrow: 1,
                            backgroundColor: '#ffffff',
                            border: '2px solid #3b3d3f',
                            borderRadius: '8px',
                            padding: '10px',
                            boxShadow: '3px 3px 0px #3b3d3f',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            boxSizing: 'border-box',
                            cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b3d3f', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {t.branch}
                          </span>
                          <span style={{ fontSize: '18px', fontWeight: 800, color: color, marginTop: '2px' }}>{t.pct}%</span>
                          <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600 }}>
                            {t.paid} paid · {t.unpaid} unpaid
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Kaayo Dashboard FAB with 4 Quick Actions */}
            <KayoBrutalistFab
              actions={DEFAULT_KAAYO_DASHBOARD_ACTIONS}
              position="absolute"
              bottom={16}
              right={16}
            />
          </div>
        )
      case 'students':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div style={{ paddingTop: '28px', backgroundColor: '#ffffff' }}>
              <KayoBrutalistHeader variant="mobile" pageTitle="Students" user={demoUser} />
            </div>
            {/* Sub Nav Branch Tabs using KayoBrutalistBranchTabs */}
            <div style={{
              padding: '8px 12px',
              backgroundColor: '#ffffff',
              borderBottom: '2px solid #3b3d3f'
            }}>
              <KayoBrutalistBranchTabs
                branches={[
                  { id: 'main', name: 'Main Branch' },
                  { id: 'annex', name: 'Annex' },
                ]}
                selectedId={selectedBranch}
                onSelect={setSelectedBranch}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#fdfcfb' }} className="no-scrollbar">
              {/* Search Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '2px solid #3b3d3f',
                borderRadius: '8px',
                padding: '6px 10px',
                gap: '8px',
                boxShadow: '2px 2px 0px #3b3d3f'
              }}>
                <Search size={16} color="#6b7280" />
                <input
                  type="text"
                  placeholder="Search students..."
                  disabled
                  style={{ border: 'none', outline: 'none', fontSize: '12px', flex: 1, backgroundColor: 'transparent' }}
                />
              </div>

              {/* Student Cards with EnrollmentTag and StatusDot */}
              {[
                { name: 'Aravind Swamy', branch: 'MAIN · MMA KIDS', dot: 'active', status: 'Active' },
                { name: 'Catherine D\'Souza', branch: 'ANNEX · KICKBOXING', dot: 'live', status: 'In class' },
                { name: 'Bala Subramanian', branch: 'MAIN · MMA KIDS', dot: 'inactive', status: 'Overdue' },
                { name: 'Divya Rajasekar', branch: 'ANNEX · KARATE', dot: 'active', status: 'Active' },
                { name: 'Eshwar Prasath', branch: 'MAIN · KICKBOXING', dot: 'pending', status: 'Pending' },
              ].map((stud, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #17191D',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    boxShadow: '2px 2px 0px #17191D',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <KayoStatusDot status={stud.dot as any} size={8} breathing={stud.dot === 'live'} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#17191D' }}>{stud.name}</span>
                    </div>
                    <KayoEnrollmentTag label={stud.branch} tone="tertiary" />
                  </div>
                </div>
              ))}
            </div>

            {/* Student FAB */}
            <KayoBrutalistFab
              position="absolute"
              bottom={16}
              right={16}
              icon={<UserPlus size={22} strokeWidth={2.5} />}
              onClick={() => {}}
            />
          </div>
        )
      case 'attendance':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ paddingTop: '28px', backgroundColor: '#ffffff' }}>
              <KayoBrutalistHeader variant="mobile" pageTitle="Attendance" user={demoUser} />
            </div>
            
            {/* Date Selector Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: '#ffffff',
              borderBottom: '2px solid #3b3d3f'
            }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={18} color="#3b3d3f" /></button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#3b3d3f' }}>
                <Calendar size={14} color="#970103" />
                <span>Monday, July 13</span>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronRight size={18} color="#3b3d3f" /></button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#fdfcfb' }} className="no-scrollbar">
              {/* Batch list cards */}
              {[
                { name: 'MMA Kids - Beginner', time: '17:30 - 18:30', tutor: 'Bala', status: 'Marked', count: '12/15', active: true },
                { name: 'Kickboxing Adults', time: '19:00 - 20:30', tutor: 'Ram', status: 'Not Marked', count: '0/14', active: false },
                { name: 'Karate Advanced', time: '20:30 - 21:30', tutor: 'Catherine', status: 'Not Marked', count: '0/8', active: false }
              ].map((batch, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #3b3d3f',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '3px 3px 0px #3b3d3f',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h6 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#3b3d3f' }}>{batch.name}</h6>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>{batch.time} · Trainer: {batch.tutor}</span>
                    </div>
                    <span style={{
                      fontSize: '9px',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      fontWeight: 700,
                      border: '1px solid #3b3d3f',
                      backgroundColor: batch.active ? '#e6f4ea' : '#fff9db',
                      color: batch.active ? '#137333' : '#f59f00'
                    }}>
                      {batch.status}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px dashed #e5e7eb',
                    paddingTop: '8px',
                    marginTop: '2px'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280' }}>Attended: {batch.count}</span>
                    <button style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '4px',
                      border: '2px solid #3b3d3f',
                      backgroundColor: batch.active ? '#ffffff' : '#970103',
                      color: batch.active ? '#3b3d3f' : '#ffffff',
                      boxShadow: '2px 2px 0px #3b3d3f',
                      cursor: 'pointer'
                    }}>
                      {batch.active ? 'Edit' : 'Mark'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'payments':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ paddingTop: '28px', backgroundColor: '#ffffff' }}>
              <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #17191D' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#17191D' }}>Payments</span>
                <KayoBrutalistAmountVisibilityToggle
                  visible={paymentsPrivacyVisible}
                  onToggle={() => setPaymentsPrivacyVisible(!paymentsPrivacyVisible)}
                />
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fdfcfb' }} className="no-scrollbar">
              {/* KhataFolder Overview Card with WarliVeil */}
              <KayoKhataFolder
                tab="OCTOBER 2026 KHATA"
                aside={<KayoChip label="4 overdue" tone="alert" size="sm" dot="pending" />}
                bodyStyle={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Collected Total</span>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#01971A', marginTop: '2px' }}>
                      <KayoWarliVeil value={31000} visible={paymentsPrivacyVisible} kind="amount" />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', color: '#970103', fontWeight: 600, textTransform: 'uppercase' }}>Pending Fees</span>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#970103', marginTop: '2px' }}>
                      <KayoWarliVeil value={11500} visible={paymentsPrivacyVisible} kind="amount" />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px dashed #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>
                    Expected: <KayoWarliVeil value={42500} visible={paymentsPrivacyVisible} kind="amount" textStyle={{ fontSize: '11px', fontWeight: 600 }} />
                  </span>
                  <KayoClayPill label="Remind all" onClick={() => {}} />
                </div>
              </KayoKhataFolder>

              {/* Transactions Title */}
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#17191D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recent Fees (October)
              </span>

              {/* Payment entries with WarliVeil and StatusDot */}
              {[
                { name: 'Aravind Swamy', amount: 2500, status: 'Paid', dot: 'active' },
                { name: 'Catherine D\'Souza', amount: 3000, status: 'Overdue', dot: 'inactive' },
                { name: 'Bala Subramanian', amount: 1500, status: 'Partial', dot: 'pending' },
                { name: 'Divya Rajasekar', amount: 2500, status: 'Paid', dot: 'active' },
                { name: 'Eshwar Prasath', amount: 2500, status: 'Paid', dot: 'active' },
              ].map((record, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #17191D',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    boxShadow: '2px 2px 0px #17191D',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <KayoStatusDot status={record.dot as any} size={6} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#17191D' }}>{record.name}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>Due Date: Oct 10</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#17191D' }}>
                      <KayoWarliVeil value={record.amount} visible={paymentsPrivacyVisible} kind="amount" />
                    </div>
                    <span style={{
                      fontSize: '9px',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      fontWeight: 700,
                      border: '1px solid #17191D',
                      backgroundColor: record.status === 'Paid' ? '#CCEAD1' : record.status === 'Overdue' ? '#F8D4D4' : '#FDDECE',
                      color: record.status === 'Paid' ? '#096F1C' : record.status === 'Overdue' ? '#9E2224' : '#AF4511'
                    }}>
                      {record.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'settings':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ paddingTop: '28px', backgroundColor: '#ffffff' }}>
              <KayoBrutalistHeader variant="mobile" pageTitle="Settings" user={demoUser} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fdfcfb' }} className="no-scrollbar">
              {/* Profile Card */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '2px solid #3b3d3f',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '3px 3px 0px #3b3d3f',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  backgroundColor: '#970103',
                  border: '2px solid #3b3d3f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px'
                }}>
                  RK
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b3d3f' }}>Ram Kumar</span>
                  <span style={{ fontSize: '10px', padding: '1px 5px', backgroundColor: '#fff0f0', border: '1px solid #fca5a5', color: '#970103', borderRadius: '4px', fontWeight: 600, width: 'fit-content' }}>
                    Owner · Master Trainer
                  </span>
                </div>
              </div>

              {/* Setting List Groups */}
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>
                Operational Setup
              </span>

              {[
                { label: 'Class Types & Fees', desc: 'Configure batch timings and monthly fees', icon: <Sliders size={15} /> },
                { label: 'Branches & Locations', desc: 'Manage branch parameters & contact detail', icon: <MapPin size={15} /> },
                { label: 'WhatsApp Fee Settings', desc: 'Configure automations & templates', icon: <DollarSign size={15} /> },
              ].map((opt, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #3b3d3f',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    boxShadow: '3px 3px 0px #3b3d3f',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: '2px solid #3b3d3f',
                    backgroundColor: '#fff0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#970103'
                  }}>
                    {opt.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b3d3f' }}>{opt.label}</span>
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>{opt.desc}</span>
                  </div>
                  <ArrowRight size={14} color="#c1c1c1" style={{ marginLeft: 'auto' }} />
                </div>
              ))}

              <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>
                App Settings
              </span>

              <div style={{
                backgroundColor: '#ffffff',
                border: '2px solid #3b3d3f',
                borderRadius: '8px',
                padding: '10px 12px',
                boxShadow: '3px 3px 0px #3b3d3f',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b3d3f' }}>Biometric Shield</span>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>Require face unlock for payment tabs</span>
                </div>
                {/* Simulated switch */}
                <div style={{
                  width: '38px',
                  height: '22px',
                  borderRadius: '11px',
                  backgroundColor: '#970103',
                  border: '2px solid #3b3d3f',
                  position: 'relative',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '7px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #3b3d3f',
                    position: 'absolute',
                    top: '2px',
                    right: '2px'
                  }} />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <ComponentPageLayout
      title="Menu Layouts"
      description="Interactive high-fidelity layout switcher for an app's main menus. Click tabs on the Bottom Navigation inside the Android mobile simulator to evaluate the look and feel."
      level="Organism"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Kaayo App Simulator',
          description: 'Fully interactive Pixel-style mockup showcasing all 5 primary menu screens under the Android OS container.',
          products: ['kaayo'],
          preview: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBlock: '12px' }}>
              <AndroidFrame
                width={340}
                height={700}
                screenBg={['dashboard', 'students', 'attendance'].includes(activeTab) ? '#970103' : '#ffffff'}
                statusBarTheme={['dashboard', 'students', 'attendance'].includes(activeTab) ? 'light' : 'dark'}
                bleedStatusBar={true}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                  {/* Active Screen Viewport */}
                  <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    {renderScreenContent()}
                  </div>
                  {/* Bottom Navigation fixed at the bottom of the viewport */}
                  <div style={{ zIndex: 60 }}>
                    <KayoBrutalistBottomNav
                      variant="mobile"
                      activeKey={activeTab}
                      onPress={setActiveTab}
                      items={ITEMS_5}
                    />
                  </div>
                </div>
              </AndroidFrame>
            </div>
          ),
          code: {
            react: `// React router mapping inside Kaayo Mobile Shell
import { AppShell } from '@breathe/templates'
import { Slot } from 'expo-router'

export default function Layout() {
  return (
    <AppShell activeKey={activeKey} onNavPress={handleNav}>
      <Slot />
    </AppShell>
  )
}`
          }
        }
      ]}
    />
  )
}

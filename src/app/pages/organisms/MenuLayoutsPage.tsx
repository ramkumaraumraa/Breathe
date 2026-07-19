import { useState, useEffect } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { AndroidFrame } from '@/app/components/shared/AndroidFrame'
import { KayoBrutalistHeader } from '@/app/components/custom/kaayo/KayoBrutalistHeader'
import { KayoBrutalistBottomNav } from '@/app/components/custom/kaayo/KayoBrutalistBottomNav'
import { KayoBrutalistBrandedScreenBackdrop } from '@/app/components/custom/kaayo/KayoBrutalistBrandedScreenBackdrop'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CreditCard,
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
  DollarSign
} from 'lucide-react'

const placeholder = (
  <div style={{ color: '#6b7280', padding: 16 }}>Switch to Kaayo theme to preview</div>
)

export function MenuLayoutsPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'
  const [activeTab, setActiveTab] = useState('dashboard')

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


  // Data for screens
  const ITEMS_5 = [
    { key: 'dashboard',  label: 'Home',        icon: <LayoutDashboard size={22} /> },
    { key: 'students',   label: 'Students',    icon: <Users size={22} /> },
    { key: 'attendance', label: 'Attendance',  icon: <ClipboardList size={22} /> },
    { key: 'payments',   label: 'Payments',    icon: <CreditCard size={22} /> },
    { key: 'settings',   label: 'Settings',    icon: <Settings size={22} /> },
  ]

  // Shared Header Config
  const demoUser = { name: 'Ram Kumar', role: 'Master · Owner', initials: 'RK' }

  // Render Page Content inside phone viewport
  const renderScreenContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fdfcfb' }}>
            <div style={{ flex: 1, overflowY: 'auto' }} className="no-scrollbar">
              <KayoBrutalistBrandedScreenBackdrop
                variant="dashboard"
                safeAreaTop={true}
                eyebrow="Today"
                title="Welcome back, Ram."
                subtitle="Keep classes, attendance, and fee follow-ups in view."
                metricSlot={
                  <div style={{
                    minWidth: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    border: '2px solid #3b3d3f',
                    borderRadius: '8px',
                    backgroundColor: '#fff9db',
                    boxShadow: '2px 2px 0px #3b3d3f',
                    fontFamily: "'DM Sans', sans-serif"
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#970103', lineHeight: 1 }}>3</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#6b7280', textAlign: 'center', marginTop: '2px', lineHeight: 1.1 }}>batches today</span>
                  </div>
                }
              >
                {/* Next Class Section overlapping the backdrop */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #3b3d3f',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '4px 4px 0px #3b3d3f',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.5px' }}>
                      NEXT CLASS
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#970103', cursor: 'pointer' }}>
                      <Plus size={12} strokeWidth={2.5} />
                      <span style={{ fontSize: '11px', fontWeight: 700 }}>Add class</span>
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: '#3b3d3f', lineHeight: 1 }}>19:00</span>
                    <span style={{ padding: '2px 6px', backgroundColor: '#fff0f0', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '9px', fontWeight: 700, color: '#970103' }}>
                      AD-HOC
                    </span>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b3d3f' }}>
                    MMA Advanced · Main Branch
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#6b7280' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      <span>Today</span>
                    </div>
                    <span>·</span>
                    <span>14 Enrolled</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button style={{
                      flex: 1,
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: '#970103',
                      color: '#ffffff',
                      border: '2px solid #3b3d3f',
                      borderRadius: '6px',
                      boxShadow: '2px 2px 0px #3b3d3f',
                      cursor: 'pointer'
                    }}>
                      Mark Attendance
                    </button>
                    <button style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: '#ffffff',
                      color: '#6b7280',
                      border: '2px solid #3b3d3f',
                      borderRadius: '6px',
                      boxShadow: '2px 2px 0px #3b3d3f',
                      cursor: 'pointer'
                    }}>
                      Cancel class
                    </button>
                  </div>
                </div>
              </KayoBrutalistBrandedScreenBackdrop>

              {/* Page content scrolling below the canopy */}
              <div style={{ padding: '16px 12px 24px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Alert Banners */}
                <div style={{
                  backgroundColor: '#fff0f0',
                  border: '2px solid #3b3d3f',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '3px 3px 0px #3b3d3f',
                }}>
                  <AlertTriangle size={18} color="#970103" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#3b3d3f', fontFamily: "'DM Sans', sans-serif" }}>
                    Dev mode - auth bypassed. Lock down.
                  </span>
                </div>

                <div style={{
                  backgroundColor: '#fffbeb',
                  border: '2px solid #3b3d3f',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '3px 3px 0px #3b3d3f',
                }}>
                  <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#3b3d3f', fontFamily: "'DM Sans', sans-serif" }}>
                    Attendance: 2 classes today not marked.
                  </span>
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
                            boxSizing: 'border-box'
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
            {/* FAB */}
            <div style={{ position: 'absolute', bottom: '72px', right: '16px', zIndex: 50 }}>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                backgroundColor: '#970103',
                border: '2px solid #3b3d3f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 0px #3b3d3f',
                color: '#ffffff',
                cursor: 'pointer'
              }}>
                <Plus size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )
      case 'students':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ paddingTop: '28px', backgroundColor: '#ffffff' }}>
              <KayoBrutalistHeader variant="mobile" pageTitle="Students" user={demoUser} />
            </div>
            {/* Sub Nav Branch Tabs */}
            <div style={{
              display: 'flex',
              padding: '8px 12px',
              gap: '6px',
              backgroundColor: '#ffffff',
              borderBottom: '2px solid #3b3d3f'
            }}>
              {['All', 'Main Branch', 'Annex'].map((tab, idx) => (
                <button
                  key={tab}
                  style={{
                    flex: 1,
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '6px 0',
                    borderRadius: '4px',
                    border: '2px solid #3b3d3f',
                    backgroundColor: idx === 0 ? '#fff0f0' : '#ffffff',
                    color: idx === 0 ? '#970103' : '#3b3d3f',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
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

              {/* Student Cards */}
              {[
                { name: 'Aravind Swamy', batch: 'MMA Kids (Tue/Thu)', status: 'Active', active: true },
                { name: 'Catherine D\'Souza', batch: 'Kickboxing Adults', status: 'Active', active: true },
                { name: 'Bala Subramanian', batch: 'MMA Kids (Tue/Thu)', status: 'Inactive', active: false },
                { name: 'Divya Rajasekar', batch: 'Karate Intermediate', status: 'Active', active: true },
                { name: 'Eshwar Prasath', batch: 'Kickboxing Adults', status: 'Active', active: true },
              ].map((stud, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #3b3d3f',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    boxShadow: '3px 3px 0px #3b3d3f',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b3d3f' }}>{stud.name}</span>
                      <span style={{
                        fontSize: '9px',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        fontWeight: 700,
                        border: '1px solid #3b3d3f',
                        backgroundColor: stud.active ? '#e6f4ea' : '#f1f3f4',
                        color: stud.active ? '#137333' : '#5f6368'
                      }}>
                        {stud.status}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>{stud.batch}</span>
                  </div>
                  <button style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '4px',
                    border: '2px solid #3b3d3f',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <Phone size={12} color="#3b3d3f" />
                  </button>
                </div>
              ))}
            </div>

            {/* FAB */}
            <div style={{ position: 'absolute', bottom: '72px', right: '16px', zIndex: 50 }}>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                backgroundColor: '#970103',
                border: '2px solid #3b3d3f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 0px #3b3d3f',
                color: '#ffffff',
                cursor: 'pointer'
              }}>
                <Plus size={22} strokeWidth={2.5} />
              </button>
            </div>
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
              <KayoBrutalistHeader variant="mobile" pageTitle="Payments" user={demoUser} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fdfcfb' }} className="no-scrollbar">
              {/* Mini metrics header */}
              <div style={{
                display: 'flex',
                gap: '8px',
                backgroundColor: '#ffffff',
                border: '2px solid #3b3d3f',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '3px 3px 0px #3b3d3f'
              }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '9px', color: '#6b7280', fontWeight: 600 }}>Expected</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b3d3f' }}>₹42,500</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '9px', color: '#15803d', fontWeight: 600 }}>Collected</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#15803d' }}>₹31,000</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '9px', color: '#970103', fontWeight: 600 }}>Pending</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#970103' }}>₹11,500</span>
                </div>
              </div>

              {/* Transactions Title */}
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b3d3f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recent Fees (July)
              </span>

              {/* Payment entries */}
              {[
                { name: 'Aravind Swamy', amount: '₹2,500', status: 'Paid', type: 'success' },
                { name: 'Catherine D\'Souza', amount: '₹3,000', status: 'Overdue', type: 'danger' },
                { name: 'Bala Subramanian', amount: '₹1,500', status: 'Partial', type: 'warning' },
                { name: 'Divya Rajasekar', amount: '₹2,500', status: 'Paid', type: 'success' },
                { name: 'Eshwar Prasath', amount: '₹2,500', status: 'Paid', type: 'success' },
              ].map((record, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #3b3d3f',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    boxShadow: '3px 3px 0px #3b3d3f',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b3d3f' }}>{record.name}</span>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>Due Date: July 10</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#3b3d3f' }}>{record.amount}</span>
                    <span style={{
                      fontSize: '9px',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      fontWeight: 700,
                      border: '1px solid #3b3d3f',
                      backgroundColor: record.type === 'success' ? '#e6f4ea' : record.type === 'danger' ? '#fce8e6' : '#fff9db',
                      color: record.type === 'success' ? '#137333' : record.type === 'danger' ? '#c5221f' : '#f59f00'
                    }}>
                      {record.status}
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
      description="Interactive high-fidelity layout switcher for the main menus in the Kaayo app. Click tabs on the Bottom Navigation inside the Android mobile simulator to evaluate the look and feel."
      level="Organism"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Kaayo App Simulator',
          description: 'Fully interactive Pixel-style mockup showcasing all 5 primary menu screens under the Android OS container.',
          preview: isKaayo ? (
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
          ) : placeholder,
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

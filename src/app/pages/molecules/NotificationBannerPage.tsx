import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoNotificationBanner, type NotifierCategory } from '@aumraa/breathe-react/kaayo'
import { Bell, Trophy, Calendar, AlertTriangle } from 'lucide-react'

export function NotificationBannerPage() {
  const [category, setCategory] = useState<NotifierCategory>('positive')

  const categories: NotifierCategory[] = ['positive', 'alert', 'negative', 'supportive', 'neutral']

  const demoProps: Record<NotifierCategory, { title: string; message: string; date: string; action: string }> = {
    positive: {
      title: 'Class Completed & Logged',
      message: 'All 14 students attended MMA Advanced. Daily streak extended to 18 days.',
      date: 'SAT 12 OCT 5:30 PM',
      action: 'View report',
    },
    alert: {
      title: 'Upcoming Dues Reminder',
      message: '4 students in South Club have fees expiring within the next 48 hours.',
      date: 'MON 14 OCT 9:00 AM',
      action: 'Send reminder',
    },
    negative: {
      title: 'Class Cancelled',
      message: 'Boxing Beginners was called off due to coach unavailability. Parents notified.',
      date: 'FRI 11 OCT 4:00 PM',
      action: 'Reschedule',
    },
    supportive: {
      title: 'New Biometric Features',
      message: 'Face ID and fingerprint unlock can now be enabled for quick payments collection.',
      date: 'SYSTEM UPDATE',
      action: 'Configure',
    },
    neutral: {
      title: 'Weekly Ledger Generated',
      message: 'Summary of past 7 days cash and UPI receipts is ready for download.',
      date: 'SUN 13 OCT',
      action: 'Download',
    },
  }

  const d = demoProps[category]

  return (
    <ComponentPageLayout
      title="NotificationBanner"
      description="The v3 ambient soft-clay carousel card from Kaayo Home. Features category-tinted surface, organic SVG waves with drop-shadow and inner-light filters, category pill, sticker slot, and a tonal brutalist pill CTA."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Interactive Banner Playground',
          products: ['kaayo'],
          description: 'Switch category to see coordinated wave hues, tint overlays, and tonal CTAs.',
          preview: (
            <div className="flex flex-col gap-6 max-w-lg w-full">
              <KayoNotificationBanner
                category={category}
                title={d.title}
                message={d.message}
                dateLabel={d.date}
                actionLabel={d.action}
                sticker={
                  category === 'positive' ? (
                    <Trophy size={36} color="#01971A" />
                  ) : category === 'alert' ? (
                    <AlertTriangle size={36} color="#F5590B" />
                  ) : (
                    <Bell size={36} color="#266FDC" />
                  )
                }
                onClick={() => alert(`Clicked ${d.action}`)}
              />

              {/* Controls */}
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border capitalize transition-all ${
                      category === c
                        ? 'bg-[#970103] text-white border-[#970103]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ),
          code: {
            react: `import { KayoNotificationBanner } from '@aumraa/breathe-react/kaayo'
import { Trophy } from 'lucide-react'

<KayoNotificationBanner
  category="${category}"
  title="${d.title}"
  message="${d.message}"
  dateLabel="${d.date}"
  actionLabel="${d.action}"
  sticker={<Trophy size={36} color="#01971A" />}
  onClick={() => {}}
/>`,
            reactNative: `import { NotificationBanner } from '@aumraa/breathe-native/kaayo'

<NotificationBanner
  category="${category}"
  title="${d.title}"
  message="${d.message}"
  dateLabel="${d.date}"
  actionLabel="${d.action}"
  sticker={<Trophy size={36} />}
  onPress={() => {}}
/>`,
          },
        },
      ]}
    />
  )
}
export default NotificationBannerPage


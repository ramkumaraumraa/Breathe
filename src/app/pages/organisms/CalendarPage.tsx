import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Calendar } from '@/app/components/ui/calendar'
import { useState } from 'react'

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: new Date(),
  })

  return (
    <ComponentPageLayout
      title="Calendar"
      description="Date picker and date range selector. Used for scheduling, filtering, and date input."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Single date',
          preview: (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border border-border"
            />
          ),
          code: {
            react: `import { Calendar } from '@aumraa/breathe/components/ui/calendar'
import { useState } from 'react'

const [date, setDate] = useState<Date>()

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border"
/>`,
          },
        },
        {
          title: 'Date range',
          description: 'For filtering reports by date range.',
          preview: (
            <Calendar
              mode="range"
              selected={range}
              onSelect={(r) => setRange(r ?? { from: undefined })}
              className="rounded-lg border border-border"
              numberOfMonths={2}
            />
          ),
          code: {
            react: `<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>`,
          },
        },
      ]}
    />
  )
}

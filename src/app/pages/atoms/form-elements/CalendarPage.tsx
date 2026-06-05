import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Calendar } from '@/app/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { useState } from 'react'

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: new Date(),
  })

  // Date & Time Picker state
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState("10")
  const [minute, setMinute] = useState("30")
  const [ampm, setAmpm] = useState("AM")

  return (
    <ComponentPageLayout
      title="Calendar"
      description="Date picker and Date & Time selector. Used for scheduling, filtering, and time-sensitive entry."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Single Date Picker',
          preview: (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border border-border bg-white dark:bg-slate-900"
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
          title: 'Date & Time Picker',
          description: 'Combined date calendar and time inputs for schedules.',
          preview: (
            <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-border">
              <Calendar
                mode="single"
                selected={dateTime}
                onSelect={setDateTime}
                className="rounded-lg border border-border bg-white dark:bg-slate-900 shrink-0"
              />
              <div className="space-y-4 border border-border rounded-lg p-4 bg-white dark:bg-slate-900 w-full sm:w-56">
                <div className="font-semibold text-sm">Select Time</div>
                <div className="flex gap-1.5 items-center justify-between">
                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="w-16">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground font-semibold">:</span>
                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-16">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {["00", "15", "30", "45"].map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={ampm} onValueChange={setAmpm}>
                    <SelectTrigger className="w-18">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground pt-3 border-t border-border mt-3 space-y-1">
                  <div className="font-medium text-slate-700 dark:text-slate-300">Selected Schedule:</div>
                  <div>
                    {dateTime ? dateTime.toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'No date'}
                  </div>
                  <div className="text-teal-600 dark:text-teal-400 font-semibold">
                    at {hour}:{minute} {ampm}
                  </div>
                </div>
              </div>
            </div>
          ),
          code: {
            react: `import { Calendar } from '@aumraa/breathe/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@aumraa/breathe/components/ui/select'
import { useState } from 'react'

const [date, setDate] = useState<Date | undefined>(new Date())
const [hour, setHour] = useState("10")
const [minute, setMinute] = useState("30")
const [ampm, setAmpm] = useState("AM")

<div className="flex flex-col sm:flex-row gap-4 items-start">
  <Calendar mode="single" selected={date} onSelect={setDate} />
  <div className="space-y-4 border rounded-lg p-4 w-full sm:w-56">
    <div className="text-sm font-medium">Select Time</div>
    <div className="flex gap-1.5 items-center">
      <Select value={hour} onValueChange={setHour}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {/* Hour Items (01-12) */}
        </SelectContent>
      </Select>
      <span>:</span>
      <Select value={minute} onValueChange={setMinute}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {/* Minute Items */}
        </SelectContent>
      </Select>
      <Select value={ampm} onValueChange={setAmpm}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</div>`,
          },
        },
        {
          title: 'Date Range Picker',
          description: 'For filtering by a start and end date.',
          preview: (
            <Calendar
              mode="range"
              selected={range}
              onSelect={(r) => setRange(r ?? { from: undefined })}
              className="rounded-lg border border-border bg-white dark:bg-slate-900"
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

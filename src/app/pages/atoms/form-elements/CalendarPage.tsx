import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Calendar } from '@/app/components/atoms/form-elements/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/atoms/form-elements/select'
import { useState } from 'react'
import { useProductTheme } from '@/app/context/ProductThemeContext'

function KayoCalendarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      border: '2px solid var(--kayo-color-border, #3b3d3f)',
      borderRadius: 8,
      boxShadow: '2px 2px 0 #191b1f',
      backgroundColor: '#ffffff',
      display: 'inline-block',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}

export function CalendarPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 5, 10))
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: new Date(2026, 5, 2),
    to: new Date(2026, 5, 8),
  })
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState('10')
  const [minute, setMinute] = useState('30')
  const [ampm, setAmpm] = useState('AM')

  return (
    <ComponentPageLayout
      title="Calendar"
      description="Date picker and Date & Time selector. Used for scheduling, filtering, and time-sensitive entry."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default',
          description: 'Calendar with no pre-selected date. User taps to select.',
          preview: isKaayo ? (
            <KayoCalendarWrapper>
              <Calendar
                mode="single"
                selected={defaultDate}
                onSelect={setDefaultDate}
                className="bg-white"
              />
            </KayoCalendarWrapper>
          ) : (
            <Calendar
              mode="single"
              selected={defaultDate}
              onSelect={setDefaultDate}
              className="rounded-lg border border-border bg-white dark:bg-slate-900"
            />
          ),
          code: {
            react: `import { Calendar } from '@aumraa/breathe/components/ui/calendar'
import { useState } from 'react'

const [date, setDate] = useState<Date | undefined>()

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border"
/>`,
            reactNative: `import { Calendar } from '@kaayo/components/atoms/Calendar'
import { useState } from 'react'

const [date, setDate] = useState<Date | undefined>()

<Calendar
  value={date}
  onChange={setDate}
/>

// Token reference:
// Container: border 2px, borderColor theme.border.strong (#3b3d3f), radius 8
// Container shadow: kayoShadow.sm → '2px 2px 0 #191b1f'
// Today indicator: underline dot, color theme.brand.primary (#970103)
// Header nav arrows: color theme.foreground.default (#3b3d3f)`,
          },
        },
        {
          title: 'Selected Date',
          description: 'Calendar with a pre-selected date clearly highlighted in brand colour.',
          preview: isKaayo ? (
            <KayoCalendarWrapper>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                defaultMonth={new Date(2026, 5)}
                className="bg-white"
              />
            </KayoCalendarWrapper>
          ) : (
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              defaultMonth={new Date(2026, 5)}
              className="rounded-lg border border-border bg-white dark:bg-slate-900"
            />
          ),
          code: {
            react: `import { Calendar } from '@aumraa/breathe/components/ui/calendar'
import { useState } from 'react'

// June 10, 2026 pre-selected
const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 10))

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
            reactNative: `import { Calendar } from '@kaayo/components/atoms/Calendar'

<Calendar
  value={new Date(2026, 5, 10)}
  onChange={setDate}
/>

// Selected day:
//   bg = theme.brand.primary (#970103) — crimson circle
//   text = theme.text.onPrimary (#ffffff)
// Unselected hover: bg = theme.surface.sunken (#f9fafb)`,
          },
        },
        {
          title: 'Date Range Picker',
          description: 'For filtering by a start and end date.',
          preview: isKaayo ? (
            <KayoCalendarWrapper>
              <Calendar
                mode="range"
                selected={range}
                onSelect={(r) => setRange(r ?? { from: undefined })}
                defaultMonth={new Date(2026, 5)}
                className="bg-white"
              />
            </KayoCalendarWrapper>
          ) : (
            <Calendar
              mode="range"
              selected={range}
              onSelect={(r) => setRange(r ?? { from: undefined })}
              defaultMonth={new Date(2026, 5)}
              className="rounded-lg border border-border bg-white dark:bg-slate-900"
              numberOfMonths={2}
            />
          ),
          code: {
            react: `const [range, setRange] = useState<{ from: Date | undefined; to?: Date }>({
  from: new Date(2026, 5, 2),
  to: new Date(2026, 5, 8),
})

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>`,
            reactNative: `import { Calendar } from '@kaayo/components/atoms/Calendar'

<Calendar
  mode="range"
  value={range}
  onChange={setRange}
/>

// Range fill:
//   Start + end day: bg = theme.brand.primary (#970103), circle
//   In-range days:   bg = theme.brand.primaryLight (crimson 15% opacity)
//   In-range text:   color = theme.brand.primary`,
          },
        },
        {
          title: 'Date & Time Picker',
          description: 'Combined date calendar and time inputs for scheduling.',
          preview: isKaayo ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: 16,
              border: '2px solid var(--kayo-color-border, #3b3d3f)',
              borderRadius: 8,
              boxShadow: '4px 4px 0 #191b1f',
              backgroundColor: '#f9fafb',
            }}>
              <KayoCalendarWrapper>
                <Calendar
                  mode="single"
                  selected={dateTime}
                  onSelect={setDateTime}
                  className="bg-white"
                />
              </KayoCalendarWrapper>
              <div style={{
                border: '2px solid var(--kayo-color-border, #3b3d3f)',
                borderRadius: 8,
                padding: 16,
                backgroundColor: '#ffffff',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#3b3d3f', marginBottom: 12 }}>
                  Select Time
                </div>
                <div className="flex gap-1.5 items-center justify-between">
                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="w-16"><SelectValue placeholder="HH" /></SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span style={{ color: '#6c6d70', fontWeight: 600 }}>:</span>
                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-16"><SelectValue placeholder="MM" /></SelectTrigger>
                    <SelectContent>
                      {['00', '15', '30', '45'].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={ampm} onValueChange={setAmpm}>
                    <SelectTrigger className="w-18"><SelectValue placeholder="AM/PM" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid var(--kayo-color-border, #3b3d3f)',
                  fontSize: 12,
                  color: '#6c6d70',
                }}>
                  <div style={{ fontWeight: 500, color: '#3b3d3f', marginBottom: 2 }}>Selected Schedule:</div>
                  <div>{dateTime ? dateTime.toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'No date'}</div>
                  <div style={{ color: 'var(--kayo-color-primary, #970103)', fontWeight: 700 }}>
                    at {hour}:{minute} {ampm}
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                    <SelectTrigger className="w-16"><SelectValue placeholder="HH" /></SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground font-semibold">:</span>
                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-16"><SelectValue placeholder="MM" /></SelectTrigger>
                    <SelectContent>
                      {['00', '15', '30', '45'].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={ampm} onValueChange={setAmpm}>
                    <SelectTrigger className="w-18"><SelectValue placeholder="AM/PM" /></SelectTrigger>
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
        <SelectContent>{/* Hour Items 01–12 */}</SelectContent>
      </Select>
      <span>:</span>
      <Select value={minute} onValueChange={setMinute}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {["00","15","30","45"].map(m => <SelectItem value={m}>{m}</SelectItem>)}
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
            reactNative: `import { Calendar } from '@kaayo/components/atoms/Calendar'
import { TimePicker } from '@kaayo/components/atoms/TimePicker'

<View style={{ gap: 16 }}>
  <Calendar value={date} onChange={setDate} />
  <TimePicker
    value={{ hour, minute, ampm }}
    onChange={setTime}
  />
</View>

// TimePicker token reference:
// Dropdown border: 2px, borderColor theme.border.strong
// Selected time text: color theme.brand.primary (#970103)
// Container shadow: kayoShadow.md → '4px 4px 0 #191b1f'`,
          },
        },
      ]}
    />
  )
}

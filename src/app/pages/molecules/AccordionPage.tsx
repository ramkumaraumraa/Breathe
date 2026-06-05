import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion'
import { FileText, Settings, Bell, CreditCard, Users } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistAccordion } from '@/app/components/custom/kaayo/KayoBrutalistAccordion'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function AccordionPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Accordion"
      description="Vertically stacked sections that expand to reveal content. Use for FAQs, settings groups, and collapsible details."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Single Expand',
          description: 'Only one section open at a time — default type. Each item is its own shadow block.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'dues',    trigger: 'How are dues calculated?',          content: 'Dues are calculated based on the maintenance amount set for your flat, billed on the 1st of each month.' },
                  { value: 'payment', trigger: 'What payment methods are accepted?', content: 'UPI, bank transfer, and cash payments are all recorded in Kaayo.' },
                  { value: 'receipt', trigger: 'Can I get a receipt?',               content: 'Yes — receipts are auto-generated and sent via email on payment confirmation.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="dues">
                <AccordionTrigger>How are dues calculated?</AccordionTrigger>
                <AccordionContent>Dues are calculated based on the maintenance amount set for your flat, billed on the 1st of each month.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>UPI, bank transfer, and cash payments are all recorded in Lemniscate.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="receipt">
                <AccordionTrigger>Can I get a receipt?</AccordionTrigger>
                <AccordionContent>Yes — receipts are auto-generated and sent via email on payment confirmation.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `import { KayoBrutalistAccordion } from '@breathe/kaayo'

<KayoBrutalistAccordion
  type="single"
  items={[
    { value: 'dues',    trigger: 'How are dues calculated?',          content: 'Dues are calculated...' },
    { value: 'payment', trigger: 'What payment methods are accepted?', content: 'UPI, bank transfer...' },
    { value: 'receipt', trigger: 'Can I get a receipt?',               content: 'Yes — receipts...' },
  ]}
/>`,
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native'

function KayoAccordion({ items }) {
  const [open, setOpen] = useState(null)
  const toggle = (val) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpen(open === val ? null : val)
  }
  return (
    <View style={{ gap: 8 }}>
      {items.map(item => (
        <View key={item.value} style={{
          borderWidth: 2, borderColor: '#3b3d3f', borderRadius: 6, backgroundColor: '#fff',
          shadowColor: '#191b1f',
          shadowOffset: { width: open === item.value ? 4 : 2, height: open === item.value ? 4 : 2 },
          shadowOpacity: 1, shadowRadius: 0 }}>
          <TouchableOpacity onPress={() => toggle(item.value)}
            style={{ padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#3b3d3f', fontFamily: 'DMSans-SemiBold', flex: 1 }}>
              {item.trigger}
            </Text>
            <Text style={{ fontSize: 16, color: '#3b3d3f' }}>{open === item.value ? '∧' : '∨'}</Text>
          </TouchableOpacity>
          {open === item.value && (
            <View style={{ borderTopWidth: 2, borderTopColor: '#3b3d3f', padding: 12 }}>
              <Text style={{ fontSize: 13, color: '#3b3d3f', lineHeight: 20, fontFamily: 'DMSans-Regular' }}>
                {item.content}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  )
}`,
          },
        },
        {
          title: 'Multiple Expand',
          description: 'Multiple sections can be open simultaneously — pass type="multiple".',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="multiple"
                defaultOpen={['rules', 'amenity']}
                items={[
                  { value: 'rules',   trigger: 'Building Rules',    content: 'No loud music after 10 PM. Pets allowed in common areas on a leash.' },
                  { value: 'amenity', trigger: 'Amenity Booking',   content: 'Book the gym or pool via the Kaayo app. 2-hour slots, 1 booking per day per flat.' },
                  { value: 'parking', trigger: 'Parking Guidelines', content: 'Each flat is allocated one covered slot. Visitor parking available at Gate 2.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="multiple" className="w-full max-w-sm">
              <AccordionItem value="a"><AccordionTrigger>Building Rules</AccordionTrigger><AccordionContent>Community rules and regulations.</AccordionContent></AccordionItem>
              <AccordionItem value="b"><AccordionTrigger>Amenity Booking</AccordionTrigger><AccordionContent>How to book shared amenities.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  type="multiple"
  defaultOpen={['rules', 'amenity']}
  items={[...]}
/>`,
          },
        },
        {
          title: 'With Icons',
          description: 'Prefix icons in each trigger — use to categorise content visually.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'fees',     trigger: 'Fee Structure',    icon: <CreditCard size={16} />, content: 'Monthly tuition: ₹3,000. Annual registration: ₹500. Late fee: ₹200 after the 10th.' },
                  { value: 'students', trigger: 'Student Policies', icon: <Users size={16} />,      content: 'Attendance of 75% is mandatory to appear for term exams.' },
                  { value: 'docs',     trigger: 'Documents',        icon: <FileText size={16} />,   content: 'Submit report cards, ID proof, and bank details during enrolment.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="fees"><AccordionTrigger>Fee Structure</AccordionTrigger><AccordionContent>Monthly tuition: ₹3,000.</AccordionContent></AccordionItem>
              <AccordionItem value="students"><AccordionTrigger>Student Policies</AccordionTrigger><AccordionContent>Attendance of 75%.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `import { CreditCard, Users, FileText } from 'lucide-react'

<KayoBrutalistAccordion
  items={[
    { value: 'fees',     trigger: 'Fee Structure',    icon: <CreditCard size={16} />, content: '...' },
    { value: 'students', trigger: 'Student Policies', icon: <Users size={16} />,      content: '...' },
  ]}
/>`,
          },
        },
        {
          title: 'With Badge',
          description: 'Numeric badge next to the trigger label — shows count of nested items.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'alerts',    trigger: 'Pending Alerts',  badge: 3, content: 'Payment overdue: Flat 12A, 14B, 22C.' },
                  { value: 'approvals', trigger: 'Approvals',       badge: 7, content: '7 leave applications pending review.' },
                  { value: 'settings',  trigger: 'Batch Settings',  icon: <Settings size={16} />, content: 'Configure schedule, holidays, and communication preferences.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="a">
                <AccordionTrigger>Pending Alerts <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 rounded-full">3</span></AccordionTrigger>
                <AccordionContent>Payment overdue items.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  items={[
    { value: 'alerts', trigger: 'Pending Alerts', badge: 3, content: '...' },
  ]}
/>`,
          },
        },
        {
          title: 'With Disabled Item',
          description: 'Disabled items are visually muted — border lightens, shadow removed, click blocked.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                items={[
                  { value: 'schedule', trigger: 'Class Schedule',   content: 'Mon–Fri, 4 PM to 6 PM. Saturday optional sessions.' },
                  { value: 'exams',    trigger: 'Exam Access',      disabled: true, content: 'Accessible after enrolment confirmation.' },
                  { value: 'reports',  trigger: 'Progress Reports', content: 'Monthly reports shared via email and in-app.' },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="schedule"><AccordionTrigger>Class Schedule</AccordionTrigger><AccordionContent>Mon–Fri, 4 PM to 6 PM.</AccordionContent></AccordionItem>
              <AccordionItem value="exams" disabled><AccordionTrigger>Exam Access</AccordionTrigger><AccordionContent>Accessible after confirmation.</AccordionContent></AccordionItem>
              <AccordionItem value="reports"><AccordionTrigger>Progress Reports</AccordionTrigger><AccordionContent>Monthly reports.</AccordionContent></AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  items={[
    { value: 'schedule', trigger: 'Class Schedule', content: '...' },
    { value: 'exams',    trigger: 'Exam Access',    disabled: true, content: '...' },
    { value: 'reports',  trigger: 'Progress Reports', content: '...' },
  ]}
/>`,
          },
        },
        {
          title: 'With Action in Content',
          description: 'Expanded content includes a KayoBrutalistButton — for contextual next actions.',
          preview: isKaayo ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <KayoBrutalistAccordion
                type="single"
                defaultOpen="notifications"
                items={[
                  {
                    value: 'notifications',
                    trigger: 'Notification Settings',
                    icon: <Bell size={16} />,
                    content: (
                      <div>
                        <p style={{ marginBottom: '12px' }}>SMS alerts for payments and attendance are enabled. Email digests sent weekly.</p>
                        <KayoBrutalistButton label="Manage Notifications" size="sm" variant="secondary" />
                      </div>
                    ),
                  },
                  {
                    value: 'documents',
                    trigger: 'Documents',
                    icon: <FileText size={16} />,
                    badge: 2,
                    content: (
                      <div>
                        <p style={{ marginBottom: '12px' }}>2 documents pending upload: ID proof and bank statement.</p>
                        <KayoBrutalistButton label="Upload Now" size="sm" variant="primary" />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="notifications">
                <AccordionTrigger>Notification Settings</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3 text-sm">SMS alerts for payments and attendance are enabled.</p>
                  <button className="text-sm underline">Manage Notifications →</button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: {
            react: `<KayoBrutalistAccordion
  items={[
    {
      value: 'notifications',
      trigger: 'Notification Settings',
      icon: <Bell size={16} />,
      content: (
        <div>
          <p style={{ marginBottom: '12px' }}>SMS alerts enabled. Email digests sent weekly.</p>
          <KayoBrutalistButton label="Manage Notifications" size="sm" variant="secondary" />
        </div>
      ),
    },
  ]}
/>`,
          },
        },
      ]}
    />
  )
}

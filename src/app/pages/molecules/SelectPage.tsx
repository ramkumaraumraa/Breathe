import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

export function SelectPage() {
  return (
    <ComponentPageLayout
      title="Select"
      description="Dropdown for choosing one option from a list. Use when there are 5+ options — for fewer, consider Radio Group."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
          ),
          code: {
            react: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@breathe/ui'

<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`,
          },
        },
        {
          title: 'Disabled',
          preview: (
            <Select disabled>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Not available" />
              </SelectTrigger>
            </Select>
          ),
          code: {
            react: `<Select disabled>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Not available" />
  </SelectTrigger>
</Select>`,
          },
        },
      ]}
    />
  )
}

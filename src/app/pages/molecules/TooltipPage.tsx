import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { Button } from '@/app/components/ui/button'

export function TooltipPage() {
  return (
    <ComponentPageLayout
      title="Tooltip"
      description="Contextual label that appears on hover or focus. Use for icon-only buttons and supplementary information — never for critical content."
      level="Molecule"
      status="Stable"
      sections={[
        {
          title: 'Default',
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Helpful context here</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@breathe/ui'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful context here</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
          },
        },
      ]}
    />
  )
}

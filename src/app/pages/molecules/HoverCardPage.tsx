import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/app/components/ui/hover-card'
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'

export function HoverCardPage() {
  return (
    <ComponentPageLayout
      title="Hover Card"
      description="Reveals supplementary information when hovering over a trigger element. Non-critical context, not actions."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Resident hover card',
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto">
                  Ramkumar G — Flat A-101
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>RG</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ramkumar G</p>
                    <p className="text-xs text-muted-foreground">Owner · Flat A-101</p>
                    <p className="text-xs text-muted-foreground">
                      Member since Jan 2024 · ₹2,500/month
                    </p>
                    <div className="flex items-center gap-1 pt-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs text-green-600">Dues cleared</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: {
            react: `import { HoverCard, HoverCardTrigger, HoverCardContent } from '@aumraa/breathe/components/ui/hover-card'

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">Ramkumar G</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    {/* Resident summary */}
  </HoverCardContent>
</HoverCard>`,
          },
        },
      ]}
    />
  )
}

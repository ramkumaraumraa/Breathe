import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { Button } from '@/app/components/ui/button'
import { HelpCircle, Info, ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistTooltip } from '@/app/components/custom/kaayo/KayoBrutalistTooltip'
import { KayoBrutalistButton } from '@/app/components/custom/kaayo/KayoBrutalistButton'

export function TooltipPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Tooltip"
      description="Contextual label that appears on hover or focus. Use for icon-only buttons and supplementary information — never for critical content."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Positions',
          description: '4 icon buttons, each with a tooltip on a different side.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '24px 0' }}>
              {(['top', 'right', 'bottom', 'left'] as const).map(side => {
                const icons = {
                  top: <ArrowUp size={16} />,
                  right: <ArrowRight size={16} />,
                  bottom: <ArrowDown size={16} />,
                  left: <ArrowLeft size={16} />,
                }
                return (
                  <KayoBrutalistTooltip key={side} content={`Tooltip on ${side}`} side={side}>
                    <button
                      type="button"
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid var(--kayo-color-border, #3b3d3f)',
                        borderRadius: 6,
                        background: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0 #191b1f',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      {icons[side]}
                    </button>
                  </KayoBrutalistTooltip>
                )
              })}
            </div>
          ) : (
            <div className="flex gap-6 items-center py-6">
              <TooltipProvider>
                {(['top', 'right', 'bottom', 'left'] as const).map(side => (
                  <Tooltip key={side}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        {side === 'top' && <ArrowUp className="h-4 w-4" />}
                        {side === 'right' && <ArrowRight className="h-4 w-4" />}
                        {side === 'bottom' && <ArrowDown className="h-4 w-4" />}
                        {side === 'left' && <ArrowLeft className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}><p>Tooltip on {side}</p></TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          ),
          code: {
            react: `import { KayoBrutalistTooltip } from '@breathe/kaayo'

<KayoBrutalistTooltip content="Tooltip on top" side="top">
  <button>↑</button>
</KayoBrutalistTooltip>

<KayoBrutalistTooltip content="Tooltip on right" side="right">
  <button>→</button>
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'On Button',
          description: 'Tooltip wrapping a primary KayoBrutalistButton — "Saves all pending changes" on hover.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip content="Saves all pending changes" side="top">
              <KayoBrutalistButton label="Save changes" />
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>Save changes</Button>
                </TooltipTrigger>
                <TooltipContent><p>Saves all pending changes</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip content="Saves all pending changes" side="top">
  <KayoBrutalistButton label="Save changes" />
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'On Icon',
          description: 'Help icon with a tooltip explaining a form field — a common pattern in settings forms.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f' }}>
              <span>Maintenance Fund</span>
              <KayoBrutalistTooltip content="Monthly contribution to the society maintenance reserve" side="right">
                <HelpCircle size={16} style={{ cursor: 'help', color: '#6b7280' }} />
              </KayoBrutalistTooltip>
            </div>
          ) : (
            <TooltipProvider>
              <div className="flex items-center gap-2 text-sm">
                <span>Maintenance Fund</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right"><p>Monthly contribution to the society maintenance reserve</p></TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip
  content="Monthly contribution to the society maintenance reserve"
  side="right"
>
  <HelpCircle size={16} style={{ cursor: 'help' }} />
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'Long Content',
          description: 'Tooltip with a two-line description — max-width 240px, wraps naturally.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip
              content={'Late fee is charged at 2% per month\nafter the 10th of each month.'}
              side="bottom"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: '#3b3d3f', cursor: 'default' }}>
                <Info size={16} style={{ color: '#6b7280' }} />
                <span>Late fee policy</span>
              </div>
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center gap-1.5 text-sm cursor-default">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span>Late fee policy</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p>Late fee is charged at 2% per month after the 10th of each month.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip
  content={"Late fee at 2% per month\\nafter the 10th of each month."}
  side="bottom"
>
  <Info size={16} />
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'On Disabled Element',
          description: 'A wrapper div over a disabled button allows tooltip to fire — disabled elements block mouse events.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip content="Requires admin role to perform this action" side="top">
              <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
                <KayoBrutalistButton label="Delete all records" variant="destructive" disabled />
              </div>
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-not-allowed">
                    <Button variant="destructive" disabled style={{ pointerEvents: 'none' }}>
                      Delete all records
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Requires admin role to perform this action</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `{/* Wrap disabled button in a div — disabled elements swallow mouse events */}
<KayoBrutalistTooltip content="Requires admin role" side="top">
  <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
    <KayoBrutalistButton label="Delete all records" variant="destructive" disabled />
  </div>
</KayoBrutalistTooltip>`,
          },
        },
        {
          title: 'No Delay',
          description: '`delay={0}` — tooltip appears instantly on hover.',
          preview: isKaayo ? (
            <KayoBrutalistTooltip content="Instant tooltip — no delay" side="top" delay={0}>
              <KayoBrutalistButton label="Hover me" variant="secondary" />
            </KayoBrutalistTooltip>
          ) : (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent><p>Instant tooltip — no delay</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: {
            react: `<KayoBrutalistTooltip content="Instant tooltip" delay={0}>
  <KayoBrutalistButton label="Hover me" variant="secondary" />
</KayoBrutalistTooltip>`,
          },
        },
      ]}
    />
  )
}

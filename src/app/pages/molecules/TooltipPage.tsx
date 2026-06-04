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
import { Button } from '@breathe/ui'

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
            reactNative: `import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false)
  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPressIn={() => setVisible(true)} onPressOut={() => setVisible(false)}>
        {children}
      </TouchableOpacity>
      {visible && (
        <View style={{
          position: 'absolute', bottom: '110%', left: '50%', transform: [{ translateX: -60 }],
          backgroundColor: '#1E293B', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, minWidth: 120
        }}>
          <Text style={{ color: '#fff', fontSize: 12 }}>{content}</Text>
        </View>
      )}
    </View>
  )
}`,
            ios: `import SwiftUI

struct TooltipView: View {
    @State private var showTooltip = false

    var body: some View {
        Button("Hover me") { showTooltip.toggle() }
            .popover(isPresented: $showTooltip) {
                Text("Helpful context here").padding(10)
                    .presentationCompactAdaptation(.popover)
            }
    }
}`,
            android: `// TooltipCompat in Android for long-press tooltip:
TooltipCompat.setTooltipText(button, "Helpful context here")`,
            tailwind: `<!-- Custom Tooltip via CSS / Tailwind peer hover -->
<div class="group relative inline-block">
  <button class="rounded-lg border px-4 py-2 text-sm">Hover me</button>
  <div class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 scale-90 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
    <div class="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white">Helpful context here</div>
  </div>
</div>`,
          },
        },
      ]}
    />
  )
}

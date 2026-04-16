import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from '@/app/components/ui/carousel'
import { Card, CardContent } from '@/app/components/ui/card'

const slides = [
  { label: 'Total Collection', value: '₹1,24,500', sub: 'April 2026' },
  { label: 'Outstanding Dues', value: '₹18,000',  sub: '6 flats pending' },
  { label: 'Fund Balance',     value: '₹82,300',  sub: 'As of today' },
  { label: 'Expenses MTD',     value: '₹24,100',  sub: 'April 2026' },
]

export function CarouselPage() {
  return (
    <ComponentPageLayout
      title="Carousel"
      description="A scrollable series of items. Use for KPI cards, onboarding steps, and image galleries."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'KPI card carousel',
          preview: (
            <div className="w-full max-w-sm mx-auto">
              <Carousel>
                <CarouselContent>
                  {slides.map((s, i) => (
                    <CarouselItem key={i}>
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                          <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                          <p className="text-3xl font-bold">{s.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ),
          code: {
            react: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@aumraa/breathe/components/ui/carousel'

<Carousel>
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i}>
        <Card><CardContent>{item.content}</CardContent></Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
          },
        },
      ]}
    />
  )
}

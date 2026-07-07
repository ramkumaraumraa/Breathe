import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistCarousel } from '@/app/components/custom/kaayo/KayoBrutalistCarousel'
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from '@/app/components/organisms/carousel'
import { Card, CardContent } from '@/app/components/molecules/card'

// ─── Module-level helpers ────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ border: '2px solid #3b3d3f', borderRadius: 6, padding: '20px 24px',
      boxShadow: '2px 2px 0 #191b1f', backgroundColor: '#fff', minHeight: 120,
      fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase',
        letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#3b3d3f' }}>{value}</div>
      <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

const STAT_SLIDES_5 = [
  { label: 'Students',      value: '124',   sub: '+12 this month' },
  { label: 'Revenue',       value: '₹48K',  sub: '+8% vs last month' },
  { label: 'Attendance',    value: '91%',   sub: '7-day average' },
  { label: 'Pending',       value: '₹6.2K', sub: '14 overdue' },
  { label: 'Active Classes',value: '6',     sub: '3 branches' },
]
const STAT_SLIDES_6 = [...STAT_SLIDES_5, { label: 'New This Week', value: '3', sub: 'enrolled' }]

const IMG_COLORS = ['#fff0f0', '#f0fff4', '#fffbeb', '#f0f9ff', '#faf5ff']

// ─── Legacy shadcn slides ────────────────────────────────────────────────────

const legacySlides = [
  { label: 'Total Collection', value: '₹1,24,500', sub: 'April 2026' },
  { label: 'Outstanding Dues', value: '₹18,000',   sub: '6 flats pending' },
  { label: 'Fund Balance',     value: '₹82,300',   sub: 'As of today' },
  { label: 'Expenses MTD',     value: '₹24,100',   sub: 'April 2026' },
]

function LegacyCarousel() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Carousel>
        <CarouselContent>
          {legacySlides.map((s, i) => (
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
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function CarouselPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Carousel"
      description="Scrollable item series with arrow and dot navigation, multi-slide view, and optional autoplay."
      level="Organism"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        // ── 1. Single slide ──────────────────────────────────────────────────
        {
          title: 'Single slide',
          description: 'One card visible at a time, with arrows and dots.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              showArrows
              showDots
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  showArrows
  showDots
/>`
              : `<Carousel>
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i}><Card><CardContent>{item}</CardContent></Card></CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
          },
        },

        // ── 2. Two slides visible ─────────────────────────────────────────────
        {
          title: 'Two slides visible',
          description: 'Two cards are visible simultaneously.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_6.map(s => <StatCard key={s.label} {...s} />)}
              slidesVisible={2}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  slidesVisible={2}
/>`
              : `<Carousel opts={{ slidesToScroll: 2 }}>
  {/* ... */}
</Carousel>`,
          },
        },

        // ── 3. Three slides visible ───────────────────────────────────────────
        {
          title: 'Three slides visible',
          description: 'Three cards visible at once — useful for wide viewports.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_6.map(s => <StatCard key={s.label} {...s} />)}
              slidesVisible={3}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  slidesVisible={3}
/>`
              : `<Carousel opts={{ slidesToScroll: 3 }}>
  {/* ... */}
</Carousel>`,
          },
        },

        // ── 4. No arrows ─────────────────────────────────────────────────────
        {
          title: 'No arrows',
          description: 'Dots-only navigation — arrows are hidden.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              showArrows={false}
              showDots
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  showArrows={false}
  showDots
/>`
              : `<Carousel>
  {/* omit CarouselPrevious / CarouselNext */}
</Carousel>`,
          },
        },

        // ── 5. No dots ───────────────────────────────────────────────────────
        {
          title: 'No dots',
          description: 'Arrow-only navigation — dot indicators are hidden.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              showDots={false}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  showDots={false}
/>`
              : `<Carousel>
  <CarouselPrevious />
  <CarouselNext />
  {/* dots not rendered by shadcn by default */}
</Carousel>`,
          },
        },

        // ── 6. No controls ───────────────────────────────────────────────────
        {
          title: 'No controls',
          description: 'No arrows and no dots — purely programmatic or touch-driven.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              showArrows={false}
              showDots={false}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  showArrows={false}
  showDots={false}
/>`
              : `<Carousel>
  <CarouselContent>{/* no nav buttons */}</CarouselContent>
</Carousel>`,
          },
        },

        // ── 7. Auto-play ─────────────────────────────────────────────────────
        {
          title: 'Auto-play',
          description: 'Advances every 2 seconds automatically.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              autoPlay
              interval={2000}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  autoPlay
  interval={2000}
/>`
              : `<Carousel plugins={[Autoplay({ delay: 2000 })]}>
  {/* ... */}
</Carousel>`,
          },
        },

        // ── 8. No loop ───────────────────────────────────────────────────────
        {
          title: 'No loop',
          description: 'Prev is disabled on the first slide; Next is disabled on the last.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              loop={false}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  loop={false}
/>`
              : `<Carousel opts={{ loop: false }}>
  {/* ... */}
</Carousel>`,
          },
        },

        // ── 9. Loop enabled ──────────────────────────────────────────────────
        {
          title: 'Loop enabled',
          description: 'Wraps from the last slide back to the first.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              loop
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={slides.map(s => <StatCard {...s} />)}
  loop
/>`
              : `<Carousel opts={{ loop: true }}>
  {/* ... */}
</Carousel>`,
          },
        },

        // ── 10. Mixed card heights ────────────────────────────────────────────
        {
          title: 'Mixed card heights',
          description: 'Cards of varying height — the track stretches to the tallest.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={[120, 160, 100, 180, 140].map((h, i) => (
                <div key={i} style={{ border: '2px solid #3b3d3f', borderRadius: 6, padding: '20px 24px', boxShadow: '2px 2px 0 #191b1f', backgroundColor: '#fff', minHeight: h, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#3b3d3f' }}>Card {i + 1}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>Height {h}px</div>
                </div>
              ))}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `<KayoBrutalistCarousel
  items={[120,160,100,180,140].map((h, i) => (
    <div key={i} style={{ minHeight: h, /* brutalist styles */ }}>
      Card {i + 1}
    </div>
  ))}
/>`
              : `<Carousel>{/* vary CardContent height per item */}</Carousel>`,
          },
        },

        // ── 11. Image cards ──────────────────────────────────────────────────
        {
          title: 'Image cards',
          description: 'Coloured placeholder divs simulating image slides.',
          preview: isKaayo ? (
            <KayoBrutalistCarousel
              items={IMG_COLORS.map((bg, i) => (
                <div key={i} style={{ height: 160, backgroundColor: bg, border: '2px solid #3b3d3f', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, fontWeight: 600, color: '#3b3d3f' }}>
                  Slide {i + 1}
                </div>
              ))}
            />
          ) : (
            <LegacyCarousel />
          ),
          code: {
            react: isKaayo
              ? `const IMG_COLORS = ['#fff0f0','#f0fff4','#fffbeb','#f0f9ff','#faf5ff']

<KayoBrutalistCarousel
  items={IMG_COLORS.map((bg, i) => (
    <div key={i} style={{ height: 160, backgroundColor: bg, border: '2px solid #3b3d3f', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Slide {i + 1}
    </div>
  ))}
/>`
              : `<Carousel>
  {images.map((src, i) => (
    <CarouselItem key={i}>
      <img src={src} alt={\"Slide \" + (i + 1)} />
    </CarouselItem>
  ))}
</Carousel>`,
          },
        },

        // ── 12. Narrow (mobile-width) ─────────────────────────────────────────
        {
          title: 'Narrow (mobile-width)',
          description: 'Constrained to 375 px — simulates a phone viewport.',
          preview: isKaayo ? (
            <div style={{ maxWidth: 375, margin: '0 auto' }}>
              <KayoBrutalistCarousel
                items={STAT_SLIDES_5.map(s => <StatCard key={s.label} {...s} />)}
              />
            </div>
          ) : (
            <div className="max-w-sm mx-auto">
              <LegacyCarousel />
            </div>
          ),
          code: {
            react: isKaayo
              ? `<div style={{ maxWidth: 375, margin: '0 auto' }}>
  <KayoBrutalistCarousel
    items={slides.map(s => <StatCard {...s} />)}
  />
</div>`
              : `<div className="max-w-sm mx-auto">
  <Carousel>{/* ... */}</Carousel>
</div>`,
          },
        },
      ]}
    />
  )
}

import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistPagination } from '@/app/components/custom/kaayo/KayoBrutalistPagination'

function InteractiveDemo() {
  const [current, setCurrent] = useState(1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <span style={{ fontSize: 12, color: '#6b7280' }}>
        Page <strong style={{ color: '#3b3d3f' }}>{current}</strong> of 15
      </span>
      <KayoBrutalistPagination total={15} current={current} onChange={setCurrent} />
    </div>
  )
}

export function PaginationPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Pagination"
      description="Navigates through paged content. Use for lists, tables, and search results exceeding a single view."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'Default (5 pages)',
          description: 'Pages 1–5, current=3 — no ellipsis needed.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={5}
              current={3}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `import { KayoBrutalistPagination } from '@breathe/kaayo'

<KayoBrutalistPagination total={5} current={3} onChange={page => setPage(page)} />`,
          },
        },
        {
          title: 'Many Pages (with ellipsis)',
          description: 'total=20, current=10 — shows `1 … 9 10 11 … 20`.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={20}
              current={10}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">9</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>10</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">11</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">20</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={20} current={10} onChange={setPage} />`,
          },
        },
        {
          title: 'First Page',
          description: 'current=1 — Previous button is disabled.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={8}
              current={1}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={8} current={1} onChange={setPage} />`,
          },
        },
        {
          title: 'Last Page',
          description: 'current=total — Next button is disabled.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={8}
              current={8}
              onChange={() => {}}
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">6</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">7</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>8</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={8} current={8} onChange={setPage} />`,
          },
        },
        {
          title: 'With First/Last Buttons',
          description: '`showFirstLast=true` — adds « (first) and » (last) jump buttons.',
          preview: isKaayo ? (
            <KayoBrutalistPagination
              total={12}
              current={6}
              onChange={() => {}}
              showFirstLast
            />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationLink href="#">«</PaginationLink></PaginationItem>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>6</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">7</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">»</PaginationLink></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `<KayoBrutalistPagination total={12} current={6} onChange={setPage} showFirstLast />`,
          },
        },
        {
          title: 'Interactive Demo',
          description: 'Click the page buttons — the current page updates live.',
          preview: isKaayo ? (
            <InteractiveDemo />
          ) : (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `function Demo() {
  const [page, setPage] = useState(1)
  return (
    <KayoBrutalistPagination
      total={15}
      current={page}
      onChange={setPage}
    />
  )
}`,
          },
        },
      ]}
    />
  )
}

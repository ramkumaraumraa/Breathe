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

export function PaginationPage() {
  return (
    <ComponentPageLayout
      title="Pagination"
      description="Navigates through paged content. Use for lists, tables, and search results exceeding a single view."
      level="Molecule"
      status="Stable"
      implemented={['lemniscate', 'aumraa']}
      sections={[
        {
          title: 'Default',
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">12</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: {
            react: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from '@aumraa/breathe/components/ui/pagination'

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
          },
        },
      ]}
    />
  )
}

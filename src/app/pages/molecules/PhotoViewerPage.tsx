import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { KayoBrutalistPhotoViewer, KayoBrutalistButton } from '@aumraa/breathe-react/kaayo'
import { Image } from 'lucide-react'

export function PhotoViewerPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ComponentPageLayout
      title="Photo Viewer"
      description="Full-screen photo light-box modal for expanding student ID photos and payment receipt screenshots."
      level="Molecule"
      status="Stable"
      implemented={['kaayo']}
      sections={[
        {
          title: 'Full Screen Image Lightbox',
          description: 'Click to open the photo viewer.',
          preview: (
            <div>
              <KayoBrutalistButton
                variant="secondary"
                label="View Receipt Photo"
                iconLeft={<Image size={16} />}
                onClick={() => setIsOpen(true)}
              />
              <KayoBrutalistPhotoViewer
                isOpen={isOpen}
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop"
                alt="Payment Receipt"
                onClose={() => setIsOpen(false)}
              />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistPhotoViewer } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistPhotoViewer
  isOpen={isOpen}
  src="https://example.com/receipt.jpg"
  onClose={() => setIsOpen(false)}
/>`,
            reactNative: `import { PhotoViewer } from '@kaayo/components/atoms/PhotoViewer'

<PhotoViewer
  visible={visible}
  imageUri="https://example.com/receipt.jpg"
  onClose={onClose}
/>`,
          },
        },
      ]}
    />
  )
}

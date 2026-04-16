import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'

export function AvatarPage() {
  return (
    <ComponentPageLayout
      title="Avatar"
      description="Visual representation of a user or entity. Shows an image with a fallback to initials or a generic icon."
      level="Atom"
      status="Stable"
      sections={[
        {
          title: 'With image',
          preview: (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: {
            react: `import { Avatar, AvatarFallback, AvatarImage } from '@breathe/ui'

<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
          },
        },
        {
          title: 'Fallback',
          description: 'Shown when the image fails to load or no src is provided.',
          preview: (
            <div className="flex items-center gap-3">
              <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>RK</AvatarFallback></Avatar>
            </div>
          ),
          code: {
            react: `<Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
<Avatar><AvatarFallback>AB</AvatarFallback></Avatar>`,
          },
        },
      ]}
    />
  )
}

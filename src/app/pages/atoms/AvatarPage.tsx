import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/atoms/avatar'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistAvatar } from '@/app/components/custom/kaayo/KayoBrutalistAvatar'
import { KayoBrutalistStudentAvatar } from '@aumraa/breathe-react/kaayo'

export function AvatarPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Avatar"
      description="Visual representation of a user or entity. Shows an image with a fallback to initials or a generic icon, with specialized student avatar sub-components."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: 'With image',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <KayoBrutalistAvatar
                src="https://github.com/shadcn.png"
                alt="User"
                fallback="SC"
                size="md"
              />
            </div>
          ) : (
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
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
            reactNative: `import { StudentAvatar } from '@kaayo/components/atoms/StudentAvatar'

<StudentAvatar
  photoUrl="https://example.com/photo.jpg"
  name="Shadcn User"
  size={48}
/>`,
            ios: `AsyncImage(url: URL(string: "https://example.com/photo.jpg")) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
.frame(width: 40, height: 40)
.clipShape(Circle())
.overlay(Circle().stroke(Color(hex: "#3b3d3f"), lineWidth: 2))
.shadow(color: Color(hex: "#191b1f"), radius: 0, x: 2, y: 2)`,
            android: `Glide.with(context)
    .load("https://example.com/photo.jpg")
    .circleCrop()
    .into(imageView)`,
            tailwind: `<img
  class="h-10 w-10 rounded-full object-cover border-2 border-[#3b3d3f] shadow-[2px_2px_0_#191b1f]"
  src="https://github.com/shadcn.png"
  alt="User"
/>`,
          },
        },
        {
          title: 'Student Avatar (Kaayo Sub-Component)',
          description: 'Specialized student profile avatar with automatic initials calculation, press actions, and preset sizes (32, 48, 96, 240).',
          preview: (
            <div className="flex flex-wrap items-center gap-6">
              <KayoBrutalistStudentAvatar name="Aumraa Admin" size={32} />
              <KayoBrutalistStudentAvatar name="Ramesh Kumar" size={48} />
              <KayoBrutalistStudentAvatar name="Priya Sundaram" size={96} />
            </div>
          ),
          code: {
            react: `import { KayoBrutalistStudentAvatar } from '@aumraa/breathe-react/kaayo'

<KayoBrutalistStudentAvatar name="Aumraa Admin" size={32} />
<KayoBrutalistStudentAvatar name="Ramesh Kumar" size={48} />
<KayoBrutalistStudentAvatar name="Priya Sundaram" size={96} />`,
            reactNative: `import { StudentAvatar } from '@kaayo/components/atoms/StudentAvatar'

<StudentAvatar name="Aumraa Admin" size={32} />
<StudentAvatar name="Ramesh Kumar" size={48} />
<StudentAvatar name="Priya Sundaram" size={96} />`,
          },
        },
        {
          title: 'Fallback',
          description: 'Shown when no image is provided or the image fails to load.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <KayoBrutalistAvatar fallback="JD" size="md" />
              <KayoBrutalistAvatar fallback="AB" size="md" />
              <KayoBrutalistAvatar fallback="RK" size="md" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>RK</AvatarFallback></Avatar>
            </div>
          ),
          code: {
            react: `<Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
<Avatar><AvatarFallback>AB</AvatarFallback></Avatar>`,
            reactNative: `<StudentAvatar name="John Doe" size={48} />
<StudentAvatar name="Alice Brown" size={48} />`,
          },
        },
        {
          title: 'Sizes',
          description: 'Three standard sizes: sm (32px), md (40px), lg (48px).',
          preview: isKaayo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <KayoBrutalistAvatar fallback="SM" size="sm" />
              <KayoBrutalistAvatar fallback="MD" size="md" />
              <KayoBrutalistAvatar fallback="LG" size="lg" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Avatar className="w-8 h-8"><AvatarFallback className="text-xs">SM</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
              <Avatar className="w-12 h-12"><AvatarFallback>LG</AvatarFallback></Avatar>
            </div>
          ),
          code: {
            react: `<Avatar className="w-8 h-8"><AvatarFallback>SM</AvatarFallback></Avatar>
<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
<Avatar className="w-12 h-12"><AvatarFallback>LG</AvatarFallback></Avatar>`,
            reactNative: `<StudentAvatar name="SM" size={32} />
<StudentAvatar name="MD" size={40} />
<StudentAvatar name="LG" size={48} />`,
          },
        },
      ]}
    />
  )
}

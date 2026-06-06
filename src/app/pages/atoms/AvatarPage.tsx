import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistAvatar } from '@/app/components/custom/kaayo/KayoBrutalistAvatar'

export function AvatarPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  return (
    <ComponentPageLayout
      title="Avatar"
      description="Visual representation of a user or entity. Shows an image with a fallback to initials or a generic icon."
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

// Kaayo uses StudentAvatar for user/student photos
<StudentAvatar
  uri="https://example.com/photo.jpg"
  initials="SC"
  size={40}
/>

// Token reference:
// Shape:    circle (borderRadius: size / 2)
// Border:   2px solid theme.border.strong (#3b3d3f)
// Shadow:   kayoShadow.sm → '2px 2px 0 #191b1f'
// Fallback: bg = theme.brand.primary (#970103), text white`,
            ios: `import SwiftUI

AsyncImage(url: URL(string: "https://example.com/photo.jpg")) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
.frame(width: 40, height: 40)
.clipShape(Circle())
.overlay(Circle().stroke(Color(hex: "#3b3d3f"), lineWidth: 2))
.shadow(color: Color(hex: "#191b1f"), radius: 0, x: 2, y: 2)`,
            android: `// Using Glide
Glide.with(context)
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
            reactNative: `import { StudentAvatar } from '@kaayo/components/atoms/StudentAvatar'

// No uri — renders initials on crimson background
<StudentAvatar initials="JD" size={40} />
<StudentAvatar initials="AB" size={40} />
<StudentAvatar initials="RK" size={40} />`,
            ios: `Text("JD")
    .font(.subheadline).fontWeight(.bold).foregroundColor(.white)
    .frame(width: 40, height: 40)
    .background(Color(hex: "#970103"))
    .clipShape(Circle())
    .overlay(Circle().stroke(Color(hex: "#3b3d3f"), lineWidth: 2))
    .shadow(color: Color(hex: "#191b1f"), radius: 0, x: 2, y: 2)`,
            android: `<TextView
    android:layout_width="40dp"
    android:layout_height="40dp"
    android:text="JD"
    android:gravity="center"
    android:textColor="#ffffff"
    android:textStyle="bold"
    android:background="@drawable/circle_crimson" />`,
            tailwind: `<div class="h-10 w-10 rounded-full bg-[#970103] border-2 border-[#3b3d3f] shadow-[2px_2px_0_#191b1f] flex items-center justify-center text-white font-bold text-sm">
  JD
</div>`,
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
            reactNative: `<StudentAvatar initials="SM" size={32} />
<StudentAvatar initials="MD" size={40} />
<StudentAvatar initials="LG" size={48} />`,
          },
        },
      ]}
    />
  )
}

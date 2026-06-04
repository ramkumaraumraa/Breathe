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
  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
            reactNative: `import { Image, StyleSheet } from 'react-native'

<Image
  source={{ uri: 'https://github.com/shadcn.png' }}
  style={styles.avatar}
/>

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
})`,
            ios: `import SwiftUI

AsyncImage(url: URL(string: "https://github.com/shadcn.png")) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
.frame(width: 40, height: 40)
.clipShape(Circle())`,
            android: `// Using Glide to load image into CircleImageView
Glide.with(context)
    .load("https://github.com/shadcn.png")
    .circleCrop()
    .into(imageView)`,
            tailwind: `<img class="h-10 w-10 rounded-full object-cover" src="https://github.com/shadcn.png" alt="User" />`,
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
            reactNative: `import { View, Text } from 'react-native'

<View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center' }}>
  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>JD</Text>
</View>`,
            ios: `import SwiftUI

Text("JD")
    .font(.subheadline).fontWeight(.bold).foregroundColor(.white)
    .frame(width: 40, height: 40)
    .background(Color.teal)
    .clipShape(Circle())`,
            android: `<TextView
    android:layout_width="40dp"
    android:layout_height="40dp"
    android:text="JD"
    android:gravity="center"
    android:textColor="#ffffff"
    android:textStyle="bold"
    android:textSize="14sp"
    android:background="@drawable/circle_teal" />`,
            tailwind: `<div class="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-sm">
  JD
</div>`,
          },
        },
      ]}
    />
  )
}

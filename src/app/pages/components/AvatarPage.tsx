import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { PropsTable } from '../../components/shared/PropsTable';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { User } from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'circle' | 'square';
type StatusType = 'online' | 'offline' | 'away' | 'busy';

const sizeMap: Record<AvatarSize, { size: string; text: string; status: string }> = {
  xs: { size: 'w-6 h-6', text: '0.55rem', status: 'w-1.5 h-1.5' },
  sm: { size: 'w-8 h-8', text: '0.65rem', status: 'w-2 h-2' },
  md: { size: 'w-10 h-10', text: '0.75rem', status: 'w-2.5 h-2.5' },
  lg: { size: 'w-14 h-14', text: '0.875rem', status: 'w-3 h-3' },
  xl: { size: 'w-20 h-20', text: '1rem', status: 'w-3.5 h-3.5' },
};

const statusColor: Record<StatusType, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-500',
  busy: 'bg-rose-500',
};

const avatarColors = [
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
  'from-violet-400 to-violet-600',
  'from-rose-400 to-rose-600',
  'from-amber-400 to-amber-600',
  'from-sky-400 to-sky-600',
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function Avatar({ name, src, size = 'md', shape = 'circle', status, colorIndex = 0 }: {
  name?: string;
  src?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: StatusType;
  colorIndex?: number;
}) {
  const s = sizeMap[size];
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-xl';
  const gradient = avatarColors[colorIndex % avatarColors.length];

  return (
    <div className="relative inline-block">
      <div className={`${s.size} ${radius} flex items-center justify-center overflow-hidden shrink-0`}
           style={{ background: src ? undefined : `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : name ? (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
            <span className="text-white select-none" style={{ fontFamily: 'var(--font-sans)', fontSize: s.text, fontWeight: 600 }}>
              {getInitials(name)}
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
            <User size={parseInt(s.size.replace('w-', '')) * 2.5} className="text-slate-400 dark:text-slate-500" />
          </div>
        )}
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 ${s.status} ${statusColor[status]} rounded-full border-2 border-white dark:border-slate-900`} />
      )}
    </div>
  );
}

function AvatarGroup({ avatars, max = 4, size = 'md' }: {
  avatars: Array<{ name?: string; colorIndex?: number }>;
  max?: number;
  size?: AvatarSize;
}) {
  const shown = avatars.slice(0, max);
  const rest = avatars.length - max;
  const s = sizeMap[size];

  return (
    <div className="flex -space-x-2">
      {shown.map((av, i) => (
        <div key={i} className="ring-2 ring-white dark:ring-slate-900 rounded-full">
          <Avatar name={av.name} size={size} colorIndex={av.colorIndex ?? i} />
        </div>
      ))}
      {rest > 0 && (
        <div className={`${s.size} rounded-full ring-2 ring-white dark:ring-slate-900 flex items-center justify-center bg-slate-200 dark:bg-slate-700`}>
          <span className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: s.text, fontWeight: 600 }}>
            +{rest}
          </span>
        </div>
      )}
    </div>
  );
}

const avatarProps = [
  { name: 'name', type: 'string', description: 'Name used to generate initials when no image is provided.' },
  { name: 'src', type: 'string', description: 'URL of the avatar image.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the avatar.' },
  { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Shape of the avatar.' },
  { name: 'status', type: "'online' | 'offline' | 'away' | 'busy'", description: 'Presence indicator shown as a colored dot.' },
];

const users = [
  { name: 'Alice Kim' },
  { name: 'Bob Chen' },
  { name: 'Carol Day' },
  { name: 'David Lee' },
  { name: 'Eva Moore' },
  { name: 'Frank Hall' },
  { name: 'Grace Wu' },
];

export function AvatarPage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Avatar"
        description="Avatars represent users with an image, initials, or a placeholder icon. They communicate identity and presence at a glance."
        section="Components"
        badge="Stable"
      />

      <ComponentPreview
        title="Sizes"
        description="Five sizes from XS to XL."
        code={`<Avatar name="Alice Kim" size="xs" />
<Avatar name="Alice Kim" size="sm" />
<Avatar name="Alice Kim" size="md" />
<Avatar name="Alice Kim" size="lg" />
<Avatar name="Alice Kim" size="xl" />`}
        reactNativeCode={`import { View, Text } from 'react-native';

const sizes = {
  xs: { container: 24, text: 9 },
  sm: { container: 32, text: 11 },
  md: { container: 40, text: 14 },
  lg: { container: 56, text: 16 },
  xl: { container: 80, text: 20 },
};

function Avatar({ name, size = 'md', color = '#0D9488' }) {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '?';
  const s = sizes[size];
  return (
    <View style={{
      width: s.container, height: s.container, borderRadius: s.container / 2,
      backgroundColor: color, alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ color: '#fff', fontSize: s.text, fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

<View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
  <Avatar name="Alice Kim" size="xs" />
  <Avatar name="Alice Kim" size="sm" />
  <Avatar name="Alice Kim" size="md" />
  <Avatar name="Alice Kim" size="lg" />
  <Avatar name="Alice Kim" size="xl" />
</View>`}
        androidCode={`<!-- Avatar ImageView in different sizes -->
<LinearLayout android:orientation="horizontal" android:gravity="bottom" android:gap="12dp">

    <ImageView
        android:layout_width="24dp"
        android:layout_height="24dp"
        app:srcCompat="@drawable/ic_avatar_initials"
        android:background="@drawable/circle_teal"
        android:padding="4dp" />

    <ImageView
        android:layout_width="32dp"
        android:layout_height="32dp"
        app:srcCompat="@drawable/ic_avatar_initials"
        android:background="@drawable/circle_teal" />

    <ImageView
        android:layout_width="40dp"
        android:layout_height="40dp"
        app:srcCompat="@drawable/ic_avatar_initials"
        android:background="@drawable/circle_teal" />

    <ImageView
        android:layout_width="56dp"
        android:layout_height="56dp"
        app:srcCompat="@drawable/ic_avatar_initials"
        android:background="@drawable/circle_teal" />
</LinearLayout>

// Or use a third-party library like Glide for image loading:
// Glide.with(context).load(imageUrl).circleCrop().into(imageView)`}
        iosCode={`import SwiftUI

struct AvatarSizesView: View {
    let sizes: [(CGFloat, Font)] = [(24, .system(size: 9)), (32, .system(size: 11)),
                                    (40, .system(size: 14)), (56, .system(size: 16)),
                                    (80, .system(size: 20))]
    var body: some View {
        HStack(alignment: .bottom, spacing: 12) {
            ForEach(sizes, id: \\.0) { size, font in
                Text("AK")
                    .font(font).fontWeight(.bold).foregroundColor(.white)
                    .frame(width: size, height: size)
                    .background(Color.teal)
                    .clipShape(Circle())
            }
        }
        .padding()
    }
}`}
        className="mb-5"
        previewClassName="items-end"
      >
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
          <Avatar key={size} name="Alice Kim" size={size} colorIndex={0} />
        ))}
      </ComponentPreview>

      <ComponentPreview
        title="Initials"
        description="Auto-generated initials with color backgrounds."
        code={`<Avatar name="Alice Kim" />
<Avatar name="Bob Chen" />
<Avatar name="Carol Day" />`}
        reactNativeCode={`import { View, Text } from 'react-native';

const gradients = ['#0D9488', '#6366F1', '#8B5CF6', '#E11D48', '#F59E0B', '#0EA5E9'];

function Avatar({ name, colorIndex = 0 }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <View style={{ width: 40, height: 40, borderRadius: 20,
                   backgroundColor: gradients[colorIndex % gradients.length],
                   alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

const users = ['Alice Kim', 'Bob Chen', 'Carol Day', 'David Lee', 'Eva Moore'];
<View style={{ flexDirection: 'row', gap: 8 }}>
  {users.map((name, i) => <Avatar key={name} name={name} colorIndex={i} />)}
</View>`}
        androidCode={`// Using a custom InitialsAvatarView or a library like AvatarView
// Option 1: Custom TextView with circular background
<TextView
    android:layout_width="40dp"
    android:layout_height="40dp"
    android:text="AK"
    android:gravity="center"
    android:textColor="#ffffff"
    android:textStyle="bold"
    android:textSize="14sp"
    android:background="@drawable/circle_teal" />

// Option 2: Use AvatarView library (build.gradle):
// implementation 'com.github.ibrahimsn98:AvatarView:1.0.1'
<com.github.ibrahimsn98.lib.AvatarView
    android:layout_width="40dp"
    android:layout_height="40dp"
    app:av_text="AK"
    app:av_textSize="14sp"
    app:av_backgroundColor="#0D9488" />`}
        iosCode={`import SwiftUI

struct InitialsAvatarView: View {
    let name: String
    let color: Color

    var initials: String {
        name.split(separator: " ")
            .prefix(2)
            .compactMap { $0.first.map { String($0) } }
            .joined()
            .uppercased()
    }

    var body: some View {
        Text(initials)
            .font(.subheadline).fontWeight(.bold).foregroundColor(.white)
            .frame(width: 40, height: 40)
            .background(color)
            .clipShape(Circle())
    }
}

struct InitialsGroupView: View {
    let users = [("Alice Kim", Color.teal), ("Bob Chen", Color.indigo),
                 ("Carol Day", Color.purple), ("David Lee", Color.red)]
    var body: some View {
        HStack(spacing: 8) {
            ForEach(users, id: \\.0) { name, color in
                InitialsAvatarView(name: name, color: color)
            }
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        {users.slice(0, 6).map((u, i) => (
          <Avatar key={u.name} name={u.name} colorIndex={i} />
        ))}
      </ComponentPreview>

      <ComponentPreview
        title="With Status"
        description="Online, offline, away, and busy indicators."
        code={`<Avatar name="Alice" status="online" />
<Avatar name="Bob" status="away" />
<Avatar name="Carol" status="busy" />
<Avatar name="Dave" status="offline" />`}
        reactNativeCode={`import { View, Text } from 'react-native';

const statusColors = {
  online: '#10B981',
  away:   '#F59E0B',
  busy:   '#EF4444',
  offline:'#94A3B8',
};

function Avatar({ name, status, color = '#0D9488' }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <View style={{ position: 'relative', width: 40, height: 40 }}>
      <View style={{ width: 40, height: 40, borderRadius: 20,
                     backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>{initials}</Text>
      </View>
      {status && (
        <View style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 10, height: 10, borderRadius: 5,
          backgroundColor: statusColors[status],
          borderWidth: 2, borderColor: '#fff',
        }} />
      )}
    </View>
  );
}

<View style={{ flexDirection: 'row', gap: 12 }}>
  <Avatar name="Alice Kim" status="online"  color="#0D9488" />
  <Avatar name="Bob Chen"  status="away"    color="#6366F1" />
  <Avatar name="Carol Day" status="busy"    color="#E11D48" />
  <Avatar name="David Lee" status="offline" color="#F59E0B" />
</View>`}
        androidCode={`<!-- Avatar with status badge using FrameLayout overlay -->
<FrameLayout android:layout_width="40dp" android:layout_height="40dp">

    <de.hdodenhof.circleimageview.CircleImageView
        android:layout_width="40dp"
        android:layout_height="40dp"
        app:srcCompat="@drawable/avatar_alice" />

    <!-- Status dot -->
    <View
        android:layout_width="10dp"
        android:layout_height="10dp"
        android:layout_gravity="bottom|end"
        android:background="@drawable/circle_green_border_white" />
</FrameLayout>

// circle_green_border_white.xml
<shape xmlns:android="..." android:shape="oval">
    <solid android:color="#10B981" />
    <stroke android:width="2dp" android:color="#ffffff" />
</shape>`}
        iosCode={`import SwiftUI

struct StatusAvatarView: View {
    let name: String
    let status: String
    let color: Color

    var statusColor: Color {
        switch status {
        case "online":  return .green
        case "away":    return .orange
        case "busy":    return .red
        default:        return .gray
        }
    }

    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            Text(initials)
                .font(.subheadline).fontWeight(.bold).foregroundColor(.white)
                .frame(width: 40, height: 40).background(color).clipShape(Circle())

            Circle()
                .fill(statusColor)
                .frame(width: 10, height: 10)
                .overlay(Circle().stroke(Color.white, lineWidth: 2))
        }
    }

    var initials: String {
        name.split(separator: " ").prefix(2)
            .compactMap { $0.first.map(String.init) }.joined().uppercased()
    }
}`}
        className="mb-5"
      >
        <Avatar name="Alice Kim" status="online" colorIndex={0} />
        <Avatar name="Bob Chen" status="away" colorIndex={1} />
        <Avatar name="Carol Day" status="busy" colorIndex={3} />
        <Avatar name="David Lee" status="offline" colorIndex={4} />
      </ComponentPreview>

      <ComponentPreview
        title="Shapes"
        description="Circular (default) and square avatars."
        code={`<Avatar name="Alice Kim" shape="circle" />
<Avatar name="Alice Kim" shape="square" />`}
        reactNativeCode={`import { View, Text } from 'react-native';

function Avatar({ name, shape = 'circle', size = 40, color = '#0D9488' }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const borderRadius = shape === 'circle' ? size / 2 : 10;
  return (
    <View style={{ width: size, height: size, borderRadius,
                   backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: size * 0.35, fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
  <Avatar name="Alice Kim" shape="circle" size={40} color="#0D9488" />
  <Avatar name="Bob Chen"  shape="square" size={40} color="#6366F1" />
  <Avatar name="Carol Day" shape="circle" size={56} color="#8B5CF6" />
  <Avatar name="David Lee" shape="square" size={56} color="#E11D48" />
</View>`}
        androidCode={`<!-- Circular avatar using CircleImageView -->
<de.hdodenhof.circleimageview.CircleImageView
    android:layout_width="40dp"
    android:layout_height="40dp"
    app:srcCompat="@drawable/avatar_alice"
    app:civ_border_color="#0D9488"
    app:civ_border_width="0dp" />

<!-- Square avatar with rounded corners -->
<ImageView
    android:layout_width="40dp"
    android:layout_height="40dp"
    app:srcCompat="@drawable/avatar_bob"
    android:background="@drawable/rounded_corners_12dp"
    android:scaleType="centerCrop" />

<!-- rounded_corners_12dp.xml -->
<shape xmlns:android="..." android:shape="rectangle">
    <corners android:radius="12dp" />
</shape>`}
        iosCode={`import SwiftUI

struct AvatarShapesView: View {
    var body: some View {
        HStack(spacing: 16) {
            // Circle
            Text("AK")
                .font(.subheadline).fontWeight(.bold).foregroundColor(.white)
                .frame(width: 40, height: 40)
                .background(Color.teal)
                .clipShape(Circle())

            // Square (rounded)
            Text("BC")
                .font(.subheadline).fontWeight(.bold).foregroundColor(.white)
                .frame(width: 40, height: 40)
                .background(Color.indigo)
                .cornerRadius(10)

            // Larger circle
            Text("CD")
                .font(.headline).fontWeight(.bold).foregroundColor(.white)
                .frame(width: 56, height: 56)
                .background(Color.purple)
                .clipShape(Circle())

            // Larger square
            Text("DL")
                .font(.headline).fontWeight(.bold).foregroundColor(.white)
                .frame(width: 56, height: 56)
                .background(Color.red)
                .cornerRadius(14)
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <Avatar name="Alice Kim" shape="circle" colorIndex={0} />
        <Avatar name="Bob Chen" shape="square" colorIndex={1} />
        <Avatar name="Carol Day" shape="circle" size="lg" colorIndex={2} />
        <Avatar name="David Lee" shape="square" size="lg" colorIndex={3} />
      </ComponentPreview>

      <ComponentPreview
        title="Avatar Group"
        description="Stacked avatars showing a user group."
        code={`<AvatarGroup
  avatars={users}
  max={4}
  size="md"
/>`}
        reactNativeCode={`import { View, Text } from 'react-native';

const colors = ['#0D9488','#6366F1','#8B5CF6','#E11D48','#F59E0B','#0EA5E9','#10B981'];

function AvatarGroup({ avatars, max = 4, size = 40 }) {
  const shown = avatars.slice(0, max);
  const rest = avatars.length - max;
  const radius = size / 2;
  const overlap = size * 0.35;

  return (
    <View style={{ flexDirection: 'row' }}>
      {shown.map((av, i) => {
        const initials = av.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) ?? '?';
        return (
          <View key={i} style={{
            width: size, height: size, borderRadius: radius,
            backgroundColor: colors[i % colors.length],
            alignItems: 'center', justifyContent: 'center',
            borderWidth: 2, borderColor: '#fff',
            marginLeft: i > 0 ? -overlap : 0, zIndex: shown.length - i,
          }}>
            <Text style={{ color: '#fff', fontSize: size * 0.3, fontWeight: '700' }}>{initials}</Text>
          </View>
        );
      })}
      {rest > 0 && (
        <View style={{
          width: size, height: size, borderRadius: radius,
          backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center',
          borderWidth: 2, borderColor: '#fff', marginLeft: -overlap,
        }}>
          <Text style={{ fontSize: size * 0.28, fontWeight: '700', color: '#475569' }}>+{rest}</Text>
        </View>
      )}
    </View>
  );
}

const users = [
  { name: 'Alice Kim' }, { name: 'Bob Chen' }, { name: 'Carol Day' },
  { name: 'David Lee' }, { name: 'Eva Moore' }, { name: 'Frank Hall' },
];

<AvatarGroup avatars={users} max={4} size={40} />`}
        androidCode={`<!-- Avatar group using negative margins -->
<LinearLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <de.hdodenhof.circleimageview.CircleImageView
        android:layout_width="40dp"
        android:layout_height="40dp"
        app:srcCompat="@drawable/avatar_alice"
        app:civ_border_color="#ffffff"
        app:civ_border_width="2dp" />

    <de.hdodenhof.circleimageview.CircleImageView
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginStart="-14dp"
        app:srcCompat="@drawable/avatar_bob"
        app:civ_border_color="#ffffff"
        app:civ_border_width="2dp" />

    <de.hdodenhof.circleimageview.CircleImageView
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginStart="-14dp"
        app:srcCompat="@drawable/avatar_carol"
        app:civ_border_color="#ffffff"
        app:civ_border_width="2dp" />

    <!-- Overflow count -->
    <TextView
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginStart="-14dp"
        android:text="+3"
        android:gravity="center"
        android:background="@drawable/circle_gray"
        android:textColor="@color/slate_600"
        android:textStyle="bold" />
</LinearLayout>`}
        iosCode={`import SwiftUI

struct AvatarGroupView: View {
    let names = ["Alice Kim", "Bob Chen", "Carol Day", "David Lee", "Eva Moore", "Frank Hall"]
    let max = 4
    let colors: [Color] = [.teal, .indigo, .purple, .red, .orange, .blue]

    var body: some View {
        HStack(spacing: -14) {
            ForEach(Array(names.prefix(max).enumerated()), id: \\.offset) { i, name in
                let initials = name.split(separator: " ")
                    .prefix(2).compactMap { $0.first.map(String.init) }
                    .joined().uppercased()
                Text(initials)
                    .font(.caption).fontWeight(.bold).foregroundColor(.white)
                    .frame(width: 40, height: 40)
                    .background(colors[i % colors.count])
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.white, lineWidth: 2))
                    .zIndex(Double(max - i))
            }
            if names.count > max {
                Text("+\\(names.count - max)")
                    .font(.caption).fontWeight(.bold).foregroundColor(.secondary)
                    .frame(width: 40, height: 40)
                    .background(Color(.systemGray5))
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.white, lineWidth: 2))
            }
        }
        .padding()
    }
}`}
        className="mb-5"
      >
        <AvatarGroup avatars={users} max={4} size="md" />
        <AvatarGroup avatars={users} max={3} size="lg" />
        <AvatarGroup avatars={users.slice(0, 3)} max={5} size="sm" />
      </ComponentPreview>

      <ComponentPreview
        title="Fallback"
        description="Default icon when no image or name is provided."
        code={`<Avatar />
<Avatar size="lg" />
<Avatar size="xl" />`}
        reactNativeCode={`import { View } from 'react-native';
import { User } from 'lucide-react-native';

function FallbackAvatar({ size = 40 }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center',
    }}>
      <User size={size * 0.45} color="#94A3B8" />
    </View>
  );
}

<View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
  <FallbackAvatar size={32} />
  <FallbackAvatar size={40} />
  <FallbackAvatar size={56} />
</View>`}
        androidCode={`<!-- Fallback avatar with person icon -->
<ImageView
    android:layout_width="40dp"
    android:layout_height="40dp"
    android:src="@drawable/ic_person"
    android:tint="@color/slate_400"
    android:background="@drawable/circle_gray_light"
    android:padding="10dp"
    android:scaleType="centerInside" />

// Or in Kotlin using Glide with a fallback placeholder:
Glide.with(context)
    .load(userImageUrl)
    .placeholder(R.drawable.ic_avatar_placeholder)
    .error(R.drawable.ic_avatar_placeholder)
    .circleCrop()
    .into(imageView)`}
        iosCode={`import SwiftUI

struct FallbackAvatarView: View {
    let size: CGFloat

    var body: some View {
        Image(systemName: "person.fill")
            .font(.system(size: size * 0.45))
            .foregroundColor(Color(.systemGray3))
            .frame(width: size, height: size)
            .background(Color(.systemGray6))
            .clipShape(Circle())
    }
}

struct FallbackAvatarsView: View {
    var body: some View {
        HStack(alignment: .bottom, spacing: 16) {
            FallbackAvatarView(size: 32)
            FallbackAvatarView(size: 40)
            FallbackAvatarView(size: 56)
        }
        .padding()
    }
}`}
        className="mb-8"
        previewClassName="items-end"
      >
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Avatar key={size} size={size} />
        ))}
      </ComponentPreview>

      <div className="mb-8">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Import</h2>
        <CodeBlock code={`import { Avatar, AvatarGroup } from '@breathe-ui/core';`} language="tsx" />
      </div>

      <PropsTable props={avatarProps} />

      <PageNavigation />
    </div>
  );
}

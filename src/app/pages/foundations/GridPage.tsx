import { PageHeader } from '../../components/shared/PageHeader';
import { ComponentPreview } from '../../components/shared/ComponentPreview';
import { CodeBlock } from '../../components/shared/CodeBlock';
import { PageNavigation } from '../../components/shared/PageNavigation';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

const breakpoints = [
  { name: 'Mobile', key: 'xs', minWidth: '0px', maxWidth: '639px', columns: 4, gutter: '16px', margin: '16px', icon: Smartphone },
  { name: 'Mobile L', key: 'sm', minWidth: '640px', maxWidth: '767px', columns: 8, gutter: '16px', margin: '24px', icon: Smartphone },
  { name: 'Tablet', key: 'md', minWidth: '768px', maxWidth: '1023px', columns: 8, gutter: '24px', margin: '32px', icon: Tablet },
  { name: 'Tablet L', key: 'lg', minWidth: '1024px', maxWidth: '1279px', columns: 12, gutter: '24px', margin: '48px', icon: Tablet },
  { name: 'Desktop', key: 'xl', minWidth: '1280px', maxWidth: '1535px', columns: 12, gutter: '32px', margin: '64px', icon: Monitor },
  { name: 'Desktop L', key: '2xl', minWidth: '1536px', maxWidth: '∞', columns: 12, gutter: '32px', margin: '80px', icon: Monitor },
];

const containerMaxWidths = [
  { breakpoint: 'sm', maxWidth: '640px' },
  { breakpoint: 'md', maxWidth: '768px' },
  { breakpoint: 'lg', maxWidth: '1024px' },
  { breakpoint: 'xl', maxWidth: '1280px' },
  { breakpoint: '2xl', maxWidth: '1536px' },
];

export function GridPage() {
  return (
    <div className="max-w-4xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Grid System"
        description="Breathe uses a flexible, responsive 12-column grid system that adapts seamlessly across mobile, tablet, and desktop devices. The grid creates consistent layouts and maintains visual hierarchy across all screen sizes."
        section="Foundations"
        badge="Layout"
      />

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Overview
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
          The grid system is built on three core concepts:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Columns', value: '4-12', desc: 'Flexible column count based on device' },
            { label: 'Gutters', value: '16-32px', desc: 'Space between grid items' },
            { label: 'Margins', value: '16-80px', desc: 'Outer container padding' },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="text-teal-600 dark:text-teal-400 mb-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600 }}>
                {item.value}
              </div>
              <div className="text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                {item.label}
              </div>
              <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Breakpoints */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Breakpoints
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Responsive breakpoints define how layouts adapt to different screen sizes.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                {['Device', 'Breakpoint', 'Range', 'Columns', 'Gutter', 'Margin'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {breakpoints.map((bp, i) => {
                const Icon = bp.icon;
                return (
                  <tr key={bp.key} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                    <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-slate-400 dark:text-slate-600" />
                        <span className="text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                          {bp.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {bp.key}
                      </code>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <code className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        {bp.minWidth}–{bp.maxWidth}
                      </code>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {bp.columns}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {bp.gutter}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {bp.margin}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visual Grid Demonstration */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-6 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Grid Visualization
        </h2>
        
        {/* 12-column grid */}
        <div className="mb-8">
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
            12-Column Grid (Desktop)
          </p>
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-teal-100 dark:bg-teal-900/40 border border-teal-300 dark:border-teal-700 rounded-lg h-12 flex items-center justify-center"
              >
                <span className="text-teal-700 dark:text-teal-400 text-xs font-mono">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8-column grid */}
        <div className="mb-8">
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
            8-Column Grid (Tablet)
          </p>
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 rounded-lg h-12 flex items-center justify-center"
              >
                <span className="text-purple-700 dark:text-purple-400 text-xs font-mono">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4-column grid */}
        <div>
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
            4-Column Grid (Mobile)
          </p>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700 rounded-lg h-12 flex items-center justify-center"
              >
                <span className="text-blue-700 dark:text-blue-400 text-xs font-mono">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Layout Examples */}
      <ComponentPreview
        title="Responsive Grid Layout"
        description="A typical responsive layout that adapts from 1 column on mobile to 4 columns on desktop."
        code={`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl">
    <h3>Item 1</h3>
    <p>Content here</p>
  </div>
  <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl">
    <h3>Item 2</h3>
    <p>Content here</p>
  </div>
  <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl">
    <h3>Item 3</h3>
    <p>Content here</p>
  </div>
  <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl">
    <h3>Item 4</h3>
    <p>Content here</p>
  </div>
</div>`}
        cssCode={`/* Responsive grid using CSS Grid */
.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 24px;
}

.grid-item {
  background-color: #F0FDFA;
  padding: 24px;
  border-radius: 12px;
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 4 columns */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 💡 TIP: Adapting from Tailwind CSS
 * Tailwind class "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
 * translates to the media queries shown above.
 * 
 * - grid-cols-1 → grid-template-columns: 1fr
 * - sm: prefix → @media (min-width: 640px)
 * - lg: prefix → @media (min-width: 1024px)
 * - gap-6 → gap: 24px (6 × 4px = 24px)
 */`}
        androidCode={`<!-- res/layout/responsive_grid.xml -->
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="@dimen/grid_margin">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/gridRecyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutManager="androidx.recyclerview.widget.GridLayoutManager"
        app:spanCount="@integer/grid_columns" />

</androidx.constraintlayout.widget.ConstraintLayout>

<!-- res/values/dimens.xml (mobile) -->
<resources>
    <integer name="grid_columns">1</integer>
    <dimen name="grid_margin">16dp</dimen>
    <dimen name="grid_gutter">16dp</dimen>
</resources>

<!-- res/values-sw600dp/dimens.xml (tablet) -->
<resources>
    <integer name="grid_columns">2</integer>
    <dimen name="grid_margin">32dp</dimen>
    <dimen name="grid_gutter">24dp</dimen>
</resources>

<!-- res/values-sw1024dp/dimens.xml (desktop) -->
<resources>
    <integer name="grid_columns">4</integer>
    <dimen name="grid_margin">48dp</dimen>
    <dimen name="grid_gutter">32dp</dimen>
</resources>

// Kotlin
class GridAdapter : RecyclerView.Adapter<GridViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GridViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.grid_item, parent, false)
        return GridViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: GridViewHolder, position: Int) {
        holder.bind(items[position])
    }
}`}
        iosCode={`import SwiftUI

struct ResponsiveGrid: View {
    let items = ["Item 1", "Item 2", "Item 3", "Item 4"]
    
    var body: some View {
        GeometryReader { geometry in
            let columns = columnsForWidth(geometry.size.width)
            
            LazyVGrid(
                columns: Array(
                    repeating: GridItem(.flexible(), spacing: spacing),
                    count: columns
                ),
                spacing: spacing
            ) {
                ForEach(items, id: \\.self) { item in
                    GridItemView(title: item)
                }
            }
            .padding(margin)
        }
    }
    
    private func columnsForWidth(_ width: CGFloat) -> Int {
        if width >= 1024 { return 4 }
        if width >= 768 { return 2 }
        return 1
    }
    
    private var spacing: CGFloat {
        UIScreen.main.bounds.width >= 1024 ? 32 : 24
    }
    
    private var margin: CGFloat {
        UIScreen.main.bounds.width >= 1024 ? 48 : 16
    }
}

struct GridItemView: View {
    let title: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.headline)
            Text("Content here")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(24)
        .background(Color.teal.opacity(0.1))
        .cornerRadius(12)
    }
}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl border border-teal-100 dark:border-teal-800/40">
              <h3 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
                Item {item}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                Content here
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Column Spanning */}
      <ComponentPreview
        title="Column Spanning"
        description="Items can span multiple columns to create asymmetric layouts."
        code={`<div className="grid grid-cols-4 gap-6">
  <div className="col-span-4 md:col-span-2 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
    <h3>Spans 2 columns</h3>
  </div>
  <div className="col-span-2 md:col-span-1 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
    <h3>1 column</h3>
  </div>
  <div className="col-span-2 md:col-span-1 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
    <h3>1 column</h3>
  </div>
  <div className="col-span-4 bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
    <h3>Full width (4 columns)</h3>
  </div>
</div>`}
        cssCode={`/* Column spanning with CSS Grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.span-2 {
  grid-column: span 2; /* Spans 2 columns */
}

.span-1 {
  grid-column: span 1; /* Single column */
}

.span-full {
  grid-column: 1 / -1; /* Full width */
}

.grid-item {
  padding: 24px;
  border-radius: 12px;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .span-2,
  .span-full {
    grid-column: 1 / -1; /* Full width on mobile */
  }
}

/* 💡 TIP: Adapting from Tailwind CSS
 * "col-span-4 md:col-span-2" becomes:
 * 
 * Default (mobile): grid-column: span 4 (full width on small grid)
 * md: breakpoint: grid-column: span 2
 * 
 * The "1 / -1" syntax means "start at line 1, end at the last line"
 * which creates a full-width element regardless of column count.
 */`}
        androidCode={`<!-- res/layout/column_spanning.xml -->
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- Use GridLayout for column spanning -->
    <GridLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:columnCount="4"
        android:rowCount="2"
        app:layout_constraintTop_toTopOf="parent">

        <!-- Item spanning 2 columns -->
        <com.google.android.material.card.MaterialCardView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_columnSpan="2"
            android:layout_columnWeight="1"
            android:layout_margin="8dp"
            app:cardBackgroundColor="@color/purple_50">
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Spans 2 columns"
                android:padding="24dp" />
        </com.google.android.material.card.MaterialCardView>

        <!-- Single column items -->
        <com.google.android.material.card.MaterialCardView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_columnWeight="1"
            android:layout_margin="8dp">
            <TextView
                android:text="1 column"
                android:padding="24dp" />
        </com.google.android.material.card.MaterialCardView>

    </GridLayout>
</androidx.constraintlayout.widget.ConstraintLayout>`}
        iosCode={`import SwiftUI

struct ColumnSpanning: View {
    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible())
    ]
    
    var body: some View {
        LazyVGrid(columns: columns, spacing: 24) {
            // Span 2 columns
            VStack {
                Text("Spans 2 columns")
                    .font(.headline)
            }
            .frame(maxWidth: .infinity)
            .padding(24)
            .background(Color.purple.opacity(0.1))
            .cornerRadius(12)
            .gridCellColumns(2)
            
            // Single column
            VStack {
                Text("1 column")
                    .font(.headline)
            }
            .frame(maxWidth: .infinity)
            .padding(24)
            .background(Color.blue.opacity(0.1))
            .cornerRadius(12)
            
            // Single column
            VStack {
                Text("1 column")
                    .font(.headline)
            }
            .frame(maxWidth: .infinity)
            .padding(24)
            .background(Color.blue.opacity(0.1))
            .cornerRadius(12)
            
            // Full width
            VStack {
                Text("Full width (4 columns)")
                    .font(.headline)
            }
            .frame(maxWidth: .infinity)
            .padding(24)
            .background(Color.pink.opacity(0.1))
            .cornerRadius(12)
            .gridCellColumns(4)
        }
        .padding()
    }
}`}
      >
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-4 md:col-span-2 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800/40">
            <h3 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
              Spans 2 columns
            </h3>
          </div>
          <div className="col-span-2 md:col-span-1 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/40">
            <h3 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
              1 column
            </h3>
          </div>
          <div className="col-span-2 md:col-span-1 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/40">
            <h3 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
              1 column
            </h3>
          </div>
          <div className="col-span-4 bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl border border-pink-100 dark:border-pink-800/40">
            <h3 className="text-slate-900 dark:text-white m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem' }}>
              Full width (4 columns)
            </h3>
          </div>
        </div>
      </ComponentPreview>

      {/* Container System */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-2 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Container Max Widths
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Containers have maximum widths at each breakpoint to prevent content from becoming too wide on large screens.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                {['Breakpoint', 'Container Max Width'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {containerMaxWidths.map((item, i) => (
                <tr key={item.breakpoint} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {item.breakpoint}
                    </code>
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <code className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {item.maxWidth}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Best Practices
        </h2>
        
        <div className="space-y-4">
          {[
            {
              title: 'Mobile First',
              desc: 'Design for mobile devices first, then progressively enhance for larger screens.',
              type: 'do'
            },
            {
              title: 'Consistent Gutters',
              desc: 'Use the defined gutter spacing at each breakpoint to maintain visual rhythm.',
              type: 'do'
            },
            {
              title: 'Test Breakpoints',
              desc: 'Always test layouts at the boundary of each breakpoint to ensure smooth transitions.',
              type: 'do'
            },
            {
              title: 'Avoid Fixed Widths',
              desc: "Don't use fixed pixel widths when percentages or flex properties can adapt better.",
              type: 'dont'
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`p-5 rounded-xl border ${
                item.type === 'do'
                  ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800/40'
                  : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${
                    item.type === 'do'
                      ? 'bg-teal-600 dark:bg-teal-700 text-white'
                      : 'bg-rose-600 dark:bg-rose-700 text-white'
                  }`}
                >
                  {item.type === 'do' ? 'DO' : "DON'T"}
                </span>
                <div className="flex-1">
                  <p className="text-slate-900 dark:text-white m-0 mb-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                    {item.title}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CSS/Tailwind Examples */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Implementation Examples
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-slate-700 dark:text-slate-300 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
              Tailwind CSS
            </h3>
            <CodeBlock
              code={`<!-- Responsive grid with breakpoints -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  <!-- Grid items -->
</div>

<!-- Container with max width -->
<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Column spanning -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-6 lg:col-span-4">Item 1</div>
  <div class="col-span-12 md:col-span-6 lg:col-span-8">Item 2</div>
</div>`}
              language="html"
            />
          </div>

          <div>
            <h3 className="text-slate-700 dark:text-slate-300 mb-3 m-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}>
              CSS Grid
            </h3>
            <CodeBlock
              code={`/* Mobile-first responsive grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(8, 1fr);
    gap: 24px;
    padding: 32px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(12, 1fr);
    gap: 32px;
    padding: 48px;
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* Column spanning */
.span-6 {
  grid-column: span 6;
}

.span-full {
  grid-column: 1 / -1;
}`}
              language="css"
            />
          </div>
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}
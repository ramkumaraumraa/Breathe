interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
  title?: string;
}

export function PropsTable({ props, title = 'Props' }: PropsTableProps) {
  return (
    <div className="mt-10">
      <h3 className="text-slate-900 dark:text-slate-100 mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>
        {title}
      </h3>
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60">
              <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem', width: '20%' }}>
                Prop
              </th>
              <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem', width: '25%' }}>
                Type
              </th>
              <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem', width: '15%' }}>
                Default
              </th>
              <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, i) => (
              <tr key={prop.name} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {prop.name}
                    </code>
                    {prop.required && (
                      <span className="text-rose-500 text-xs">*</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <code className="text-indigo-600 dark:text-indigo-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  {prop.default ? (
                    <code className="text-slate-500 dark:text-slate-500" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-slate-300 dark:text-slate-700" style={{ fontSize: '0.8rem' }}>—</span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-slate-400 dark:text-slate-600" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)' }}>
        <span className="text-rose-400">*</span> Required prop
      </p>
    </div>
  );
}

import { Link } from 'react-router';
import { ArrowLeft, Wind } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
           style={{ background: 'linear-gradient(135deg, #0D9488, #6366F1)' }}>
        <Wind size={28} className="text-white" />
      </div>
      <h1 className="text-slate-900 dark:text-white mb-3 m-0"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '3rem', lineHeight: 1.1 }}>
        404
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm"
         style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.7 }}>
        This page doesn't exist. It may have been moved or the URL might be incorrect.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { ThemeProvider } from '../../context/ThemeContext';
import { SearchProvider } from '../../context/SearchContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { SearchModal } from './SearchModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <SearchProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 overflow-hidden flex-col">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="relative w-64 h-full shadow-xl">
                <Sidebar onClose={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col">
            <TopBar
              onMenuToggle={() => setMobileMenuOpen(prev => !prev)}
              menuOpen={mobileMenuOpen}
            />
            <main className="flex-1">
              <ScrollToTop />
              <Outlet />
            </main>
          </div>
        </div>

        <SearchModal />
      </SearchProvider>
    </ThemeProvider>
  );
}
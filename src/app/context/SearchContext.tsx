import React, { createContext, useContext, useState, useEffect } from 'react';

interface SearchContextValue {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue>({
  isOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
  query: '',
  setQuery: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => { setIsOpen(false); setQuery(''); };

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch, query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);

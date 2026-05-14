'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface SearchQueryContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchQueryContext = createContext<SearchQueryContextValue | null>(null);

export const SearchQueryProvider = ({ children }: PropsWithChildren) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchQueryContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);

  if (!context) {
    throw new Error('useSearchQuery must be used within SearchQueryProvider');
  }

  return context;
};

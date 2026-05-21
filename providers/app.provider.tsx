'use client';

import { PropsWithChildren } from 'react';
import { CartProvider } from './cart.provider';
import { ReactQueryProvider } from './query.provider';
import { SearchQueryProvider } from './search-query.provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <SearchQueryProvider>
        <CartProvider>{children}</CartProvider>
      </SearchQueryProvider>
    </ReactQueryProvider>
  );
};

export default AppProvider;

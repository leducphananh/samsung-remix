import { PropsWithChildren } from 'react';
import { CartProvider } from './cart.provider';
import { SearchQueryProvider } from './search-query.provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <SearchQueryProvider>
      <CartProvider>{children}</CartProvider>
    </SearchQueryProvider>
  );
};

export default AppProvider;

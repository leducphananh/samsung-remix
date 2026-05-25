import { CartItem } from '@/types/cart.type';
import { Product } from '@/types/product.type';
import { Search } from 'lucide-react';
import ProductItem from './product-item';

interface Props {
  products: Product[];
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const ProductList = ({ products, onAddToCart }: Props) => {
  return (
    <section className="px-5 py-8">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Search className="text-surface-container-highest mx-auto mb-4 h-12 w-12" />
          <p className="text-secondary">Không tìm thấy sản phẩm phù hợp</p>
        </div>
      )}
    </section>
  );
};

export default ProductList;

import { formatPrice } from '@/utils/price.format';

export function StickyAddToCart({
  totalPrice,
  onAddToCart,
}: {
  totalPrice: number;
  onAddToCart: () => void;
}) {
  return (
    <div className="border-surface-container-highest fixed bottom-0 left-0 z-60 w-full border-t bg-white/95 p-5 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md sm:relative sm:mt-12 sm:bg-transparent sm:p-0 sm:shadow-none">
      <div className="mx-auto max-w-md sm:max-w-full">
        <div className="mb-4 flex items-end justify-between sm:hidden">
          <div>
            <p className="text-secondary text-[10px] font-bold tracking-wider uppercase">
              Tổng cộng
            </p>
            <p className="text-2xl font-extrabold">{formatPrice(totalPrice)}</p>
          </div>
          <div className="text-right">
            <p className="text-secondary text-[10px] font-bold tracking-wider uppercase">
              Hoặc từ
            </p>
            <p className="text-base font-extrabold">
              {formatPrice(Math.round(totalPrice / 12))}/tháng
            </p>
          </div>
        </div>
        <button
          onClick={onAddToCart}
          className="bg-primary w-full rounded-full py-4 text-sm font-bold text-white transition-all hover:bg-black/90 active:scale-[0.98]">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

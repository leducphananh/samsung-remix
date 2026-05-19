import { ChevronDown, Star, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

import { ProductDetail } from '@/types/product.type';
import { accordionItems, productFeatures } from '../_data/product.data';

function RatingsPanel({ product }: { product: ProductDetail }) {
  const ratingMax = Math.max(
    ...product.ratingBreakdown.map(item => item.count),
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5">
        <div className="grid gap-6 sm:grid-cols-[140px_1fr]">
          <div>
            <p className="text-5xl font-extrabold">{product.rating}</p>
            <div className="mt-2 flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className="h-4 w-4"
                  strokeWidth={0}
                  fill="#ffaa4e"
                />
              ))}
            </div>
            <p className="text-secondary mt-2 text-xs">
              {product.reviews.toLocaleString()} đánh giá đã xác minh
            </p>
          </div>
          <div className="space-y-2">
            {product.ratingBreakdown.map(row => (
              <div
                key={row.stars}
                className="grid grid-cols-[36px_1fr_44px] items-center gap-3 text-xs">
                <span className="font-bold">{row.stars} sao</span>
                <div className="bg-surface-container h-2 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-[#ffaa4e]"
                    style={{ width: `${(row.count / ratingMax) * 100}%` }}
                  />
                </div>
                <span className="text-secondary text-right">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {product.reviewHighlights.map(highlight => (
          <span
            key={highlight}
            className="bg-surface-container-low rounded-full px-3 py-2 text-xs font-bold">
            {highlight}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {product.customerReviews.map(review => (
          <div key={review.name} className="rounded-xl bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{review.name}</p>
                <p className="text-secondary text-xs">
                  Người mua đã xác minh • {review.date}
                </p>
              </div>
              <div className="flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    fill="#ffaa4e"
                    strokeWidth={0}
                    className="h-4 w-4"
                  />
                ))}
              </div>
            </div>
            <h4 className="mt-3 text-sm font-bold">{review.title}</h4>
            <p className="text-secondary mt-1 text-xs leading-relaxed">
              {review.content}
            </p>
            <button className="text-secondary mt-4 flex items-center gap-2 text-xs font-bold">
              <ThumbsUp className="h-4 w-4" />
              Hữu ích
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccordionsSection({
  product,
  openAccordions,
  onToggle,
}: {
  product: ProductDetail;
  openAccordions: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <section className="border-surface-container-highest mt-12 border-t px-5">
      {accordionItems.map(item => (
        <div key={item} className="border-surface-container-highest border-b">
          <div
            onClick={() => onToggle(item)}
            className="flex cursor-pointer items-center justify-between py-5">
            <span className="text-sm font-bold">{item}</span>
            <motion.div
              animate={{ rotate: openAccordions.includes(item) ? 180 : 0 }}
              transition={{ duration: 0.2 }}>
              <ChevronDown className="text-secondary h-5 w-5" />
            </motion.div>
          </div>

          {openAccordions.includes(item) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="space-y-6 pb-6">
                {item === 'Tính năng nổi bật' &&
                  productFeatures['Tính năng nổi bật'].map((feature, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-primary text-sm font-bold">
                        {feature.title}
                      </h4>
                      <p className="text-secondary text-xs leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  ))}

                {item === 'Đánh giá & Xếp hạng' && (
                  <RatingsPanel product={product} />
                )}

                {item !== 'Tính năng nổi bật' &&
                  item !== 'Đánh giá & Xếp hạng' && (
                    <p className="text-secondary text-xs italic">
                      Thông tin đang được cập nhật...
                    </p>
                  )}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </section>
  );
}

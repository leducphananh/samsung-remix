import { Sparkles } from 'lucide-react';

export function PromoSection() {
  return (
    <section className="relative mx-5 my-12 flex min-h-40 flex-col justify-center overflow-hidden rounded-xl bg-black p-8 text-white">
      <div className="relative z-10">
        <h3 className="text-xl font-bold">Galaxy AI đã xuất hiện.</h3>
        <p className="mt-1 text-sm opacity-80">
          Trải nghiệm kỷ nguyên mới của trí tuệ di động.
        </p>
        <button className="mt-4 text-xs font-bold underline">
          Tìm hiểu thêm
        </button>
      </div>
      <Sparkles className="absolute -right-4 -bottom-4 h-40 w-40 rotate-12 opacity-20" />
    </section>
  );
}

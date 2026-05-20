export default function ProductListLoading() {
  return (
    <div className="bg-surface min-h-screen px-5 pt-6">
      <div className="bg-surface-container-low border-surface-container-highest border-b pb-6">
        <div className="bg-surface-container-high h-7 w-48 animate-pulse rounded-lg" />
        <div className="bg-surface-container-high mt-4 h-12 w-full animate-pulse rounded-xl" />
        <div className="mt-4 flex gap-2">
          <div className="bg-surface-container-high h-9 w-20 animate-pulse rounded-full" />
          <div className="bg-surface-container-high h-9 w-20 animate-pulse rounded-full" />
          <div className="bg-surface-container-high h-9 w-20 animate-pulse rounded-full" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest border-surface-container-highest flex h-full flex-col rounded-xl border p-4">
            <div className="bg-surface-container-low mb-4 aspect-square w-full animate-pulse rounded-lg" />
            <div className="bg-surface-container-high h-4 w-3/4 animate-pulse rounded-md" />
            <div className="bg-surface-container-high mt-2 h-3 w-1/2 animate-pulse rounded-md" />
            <div className="bg-surface-container-high mt-4 h-4 w-1/3 animate-pulse rounded-md" />
            <div className="bg-surface-container-high mt-4 h-8 w-full animate-pulse rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

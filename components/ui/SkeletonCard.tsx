export default function SkeletonCard({ large = false }: { large?: boolean }) {
  return (
    <div className="bg-stone-900 border border-stone-800/60 overflow-hidden animate-pulse_slow">
      {/* Image skeleton */}
      <div className={`skeleton ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`} />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-20 rounded-none" />
        <div className="skeleton h-5 w-4/5 rounded-none" />
        <div className="skeleton h-4 w-3/5 rounded-none" />

        <div className="h-px bg-stone-800 my-4" />

        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-4 w-8 rounded-none" />
          ))}
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="space-y-1">
            <div className="skeleton h-3 w-12 rounded-none" />
            <div className="skeleton h-7 w-32 rounded-none" />
          </div>
          <div className="skeleton h-9 w-24 rounded-none" />
        </div>
      </div>
    </div>
  );
}

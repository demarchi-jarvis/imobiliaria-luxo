import SkeletonCard from "@/components/ui/SkeletonCard";

export default function PropertyDetailLoading() {
  return (
    <main className="bg-stone-950 min-h-screen">
      {/* Hero skeleton */}
      <div className="skeleton h-[70vh] w-full" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery skeleton */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[520px]">
              <div className="skeleton col-span-2 row-span-2" />
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
            </div>

            {/* Specs skeleton */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-24" />
              ))}
            </div>

            {/* Text skeleton */}
            <div className="space-y-3">
              <div className="skeleton h-7 w-48" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-4/6" />
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-4">
            <div className="skeleton h-64" />
            <div className="skeleton h-40" />
          </div>
        </div>
      </div>
    </main>
  );
}

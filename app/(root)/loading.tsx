import SkeletonLoading from "@/components/loaders/SkeletonLoading";

export default function HomeLoading() {
  return (
    <div className="wrapper py-8 flex flex-col gap-12">
      {/* Hero skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 animate-pulse">
        <div className="flex flex-col gap-5 justify-center">
          <div className="h-4 w-32 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-10 w-full rounded-xl bg-gray-200 dark:bg-slate-700" />
          <div className="h-10 w-3/4 rounded-xl bg-gray-200 dark:bg-slate-700" />
          <div className="h-5 w-full rounded bg-gray-200 dark:bg-slate-700" />
          <div className="flex gap-3">
            <div className="h-12 w-40 rounded-full bg-gray-200 dark:bg-slate-700" />
            <div className="h-12 w-40 rounded-full bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-72 h-80 rounded-xl bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-gray-200 dark:bg-slate-700" />
        ))}
      </div>

      {/* Events heading skeleton */}
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-64 rounded-xl bg-gray-200 dark:bg-slate-700" />
        <div className="h-12 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
          ))}
        </div>
      </div>

      {/* Cards skeleton */}
      <SkeletonLoading type="cards_grid" />
    </div>
  );
}

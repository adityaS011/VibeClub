export default function NearbyEventsLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="bg-primary-50 dark:bg-[#000114] py-8 md:py-12">
        <div className="wrapper flex flex-col gap-3">
          <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-10 w-56 rounded-xl bg-gray-200 dark:bg-slate-700" />
          <div className="h-5 w-96 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Search bar skeleton */}
      <div className="wrapper mt-8 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-14 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="h-14 w-48 rounded-full bg-gray-200 dark:bg-slate-700" />
      </div>

      {/* Empty state skeleton */}
      <div className="wrapper my-8">
        <div className="flex flex-col items-center gap-4 py-20 rounded-2xl border border-dashed border-grey-400/20 dark:border-slate-700">
          <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-72 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

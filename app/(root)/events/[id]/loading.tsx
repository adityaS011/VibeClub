export default function EventDetailLoading() {
  return (
    <div className="flex justify-center bg-primary-50 dark:bg-[#040D12]">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full 2xl:max-w-7xl animate-pulse">
        {/* Image skeleton */}
        <div className="h-[300px] md:h-[500px] m-4 rounded-3xl bg-gray-200 dark:bg-slate-700" />

        {/* Info skeleton */}
        <div className="flex flex-col gap-5 p-5 md:p-10 bg-slate-100 dark:bg-slate-900">
          <div className="h-9 w-3/4 rounded-xl bg-gray-200 dark:bg-slate-700" />
          <div className="flex gap-3">
            <div className="h-8 w-16 rounded-full bg-gray-200 dark:bg-slate-700" />
            <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-slate-700" />
          </div>

          {/* Countdown skeleton */}
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 w-14 rounded-xl bg-gray-200 dark:bg-slate-700" />
            ))}
          </div>

          {/* Button skeleton */}
          <div className="h-12 w-44 rounded-full bg-gray-200 dark:bg-slate-700" />

          {/* Date/location */}
          <div className="flex flex-col gap-3 pt-4 border-t border-grey-400/10 dark:border-slate-700">
            <div className="h-5 w-48 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 w-36 rounded bg-gray-200 dark:bg-slate-700" />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 pt-4 border-t border-grey-400/10 dark:border-slate-700">
            <div className="h-5 w-32 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

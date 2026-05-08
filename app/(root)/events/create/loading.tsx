export default function CreateEventLoading() {
  return (
    <div className="wrapper py-8 animate-pulse">
      {/* Page header */}
      <div className="bg-primary-50 dark:bg-[#000114] rounded-2xl py-8 px-6 mb-8">
        <div className="h-9 w-56 rounded-xl bg-gray-200 dark:bg-slate-700 mx-auto" />
      </div>

      {/* Form skeleton */}
      <div className="flex flex-col gap-5 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="h-40 w-full rounded-2xl bg-gray-200 dark:bg-slate-700" />
          <div className="h-40 w-full rounded-2xl bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="flex flex-col md:flex-row gap-5">
          <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="h-14 w-full rounded-full bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

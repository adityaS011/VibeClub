import React from "react";

type SkeletonLoadingProps = {
  type: "header_Image" | "card" | "cards_grid";
};

const CardSkeleton = () => (
  <div className="flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800/80 shadow-md border border-grey-400/10 dark:border-slate-700 animate-pulse">
    <div className="flex-grow bg-gray-200 dark:bg-slate-700 min-h-[200px]" />
    <div className="flex flex-col gap-3 p-5">
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
      </div>
      <div className="h-4 w-36 rounded bg-gray-200 dark:bg-slate-700" />
      <div className="h-5 w-full rounded bg-gray-200 dark:bg-slate-700" />
      <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
      <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700 mt-auto" />
    </div>
  </div>
);

const SkeletonLoading = ({ type }: SkeletonLoadingProps) => {
  if (type === "header_Image") {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-slate-700 w-72 md:w-80 rounded-xl max-h-[80vh] 2xl:max-h-[50vh] h-[500px]" />
    );
  }

  if (type === "card") {
    return <CardSkeleton />;
  }

  if (type === "cards_grid") {
    return (
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-center w-full">
            <CardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoading;

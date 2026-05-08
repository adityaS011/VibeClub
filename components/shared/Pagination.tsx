"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(page);

  const onClick = (direction: "prev" | "next") => {
    const pageValue =
      direction === "next" ? currentPage + 1 : currentPage - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="lg"
        variant="outline"
        className="w-28 dark:border-slate-600 dark:text-white"
        onClick={() => onClick("prev")}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </Button>
      <span className="text-sm text-grey-500 dark:text-grey-400 px-2">
        {currentPage} / {totalPages}
      </span>
      <Button
        size="lg"
        variant="outline"
        className="w-28 dark:border-slate-600 dark:text-white"
        onClick={() => onClick("next")}
        disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;

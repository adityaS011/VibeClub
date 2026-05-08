"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type Category = { _id: string; name: string };

type CategoryFilterProps = {
  categories: Category[];
};

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const onSelectCategory = (category: string) => {
    let newUrl: string;
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category", "page"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
          currentCategory === "All"
            ? "bg-primary-500 text-white border-primary-500"
            : "bg-white dark:bg-slate-800 text-grey-600 dark:text-grey-400 border-grey-400/30 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelectCategory(cat.name)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
            currentCategory === cat.name
              ? "bg-primary-500 text-white border-primary-500"
              : "bg-white dark:bg-slate-800 text-grey-600 dark:text-grey-400 border-grey-400/30 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

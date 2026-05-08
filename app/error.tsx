"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-primary-50 dark:bg-[#000114] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="h2-bold dark:text-white">Something went wrong</h1>
        <p className="p-regular-18 text-grey-500 dark:text-grey-400 max-w-sm">
          An unexpected error occurred. We&apos;ve been notified and are working
          on a fix.
        </p>
      </div>

      <Button size="lg" className="button" onClick={reset}>
        Try Again
      </Button>

      {error.digest && (
        <p className="p-medium-12 text-grey-400 dark:text-grey-500 font-mono">
          ID: {error.digest}
        </p>
      )}
    </div>
  );
}

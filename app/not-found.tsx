import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-primary-50 dark:bg-[#000114] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
        <CalendarX className="h-10 w-10 text-primary-500" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="h2-bold dark:text-white">Page Not Found</h1>
        <p className="p-regular-18 text-grey-500 dark:text-grey-400 max-w-sm">
          Looks like this event has left the building. Let&apos;s get you back to
          the party.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="button">
          <Link href="/" className="dark:text-white">
            Back to Home
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="button dark:border-slate-600 dark:text-white">
          <Link href="/#events">Browse Events</Link>
        </Button>
      </div>

      <p className="p-medium-14 text-grey-400 dark:text-grey-500">
        Error 404
      </p>
    </div>
  );
}

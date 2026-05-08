import Collection from "@/components/shared/Collection";
import NearbyEventsClient from "@/components/shared/NearbyEventsClient";
import { getEventsByLocation } from "@/lib/actions/events.actions";
import { MapPin, Compass } from "lucide-react";
import { Suspense } from "react";
import SkeletonLoading from "@/components/loaders/SkeletonLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Events | VibeClub",
  description: "Discover events happening near you.",
};

export default async function NearbyEventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const city = (searchParams?.city as string) || "";
  const page = Number(searchParams?.page) || 1;

  const eventsResult = city
    ? await getEventsByLocation({ location: city, limit: 6, page })
    : null;

  return (
    <>
      {/* Page Header + Search */}
      <section className="bg-primary-50 dark:bg-[#000114] bg-dotted-pattern bg-cover bg-center py-6 md:py-8">
        <div className="wrapper flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary-500">
            <MapPin className="h-5 w-5" />
            <span className="p-semibold-14 uppercase tracking-widest">Location-based discovery</span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="h2-bold dark:text-white">Join Events</h1>
            <p className="p-regular-16 text-grey-500 dark:text-grey-400 max-w-xl">
              Detect your location or search by city to find events near you.
            </p>
          </div>
          <Suspense fallback={null}>
            <NearbyEventsClient
              currentCity={city}
              totalEvents={eventsResult?.data?.length ?? 0}
            />
          </Suspense>
        </div>
      </section>

      {/* Events or empty prompt */}
      <section className="wrapper my-8">
        {!city ? (
          /* No city selected yet */
          <div className="flex flex-col items-center justify-center gap-6 py-20 rounded-2xl border border-dashed border-grey-400/30 dark:border-slate-700">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
              <Compass className="h-8 w-8 text-primary-500" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="p-bold-20 dark:text-white">No location selected</p>
              <p className="p-regular-16 text-grey-500 dark:text-grey-400 max-w-sm">
                Use the &quot;Detect My Location&quot; button above, or type a
                city name to start finding events near you.
              </p>
            </div>
          </div>
        ) : (
          /* City selected — show results */
          <Suspense fallback={<SkeletonLoading type="cards_grid" />}>
            <Collection
              data={eventsResult?.data || []}
              emptyTitle={`No events found in "${city}"`}
              emptyStateSubtext="Try a nearby city or broaden your search term."
              collectionType="All_Events"
              limit={6}
              page={page}
              totalPages={eventsResult?.totalPages}
              urlParamName="page"
            />
          </Suspense>
        )}
      </section>
    </>
  );
}

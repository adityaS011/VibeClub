import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import EventCountdown from "@/components/shared/EventCountdown";
import ShareButton from "@/components/shared/ShareButton";
import MotionSection from "@/components/shared/animated/MotionSection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/events.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const event = await getEventById(id);
  if (!event) return { title: "Event Not Found | VibeClub" };
  return {
    title: `${event.title} | VibeClub`,
    description: event.description ?? "Join this event on VibeClub.",
    openGraph: {
      title: event.title,
      description: event.description ?? "Join this event on VibeClub.",
      images: [{ url: event.imageUrl }],
    },
  };
}
import Image from "next/image";
import Link from "next/link";

const EventDetail = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);
  if (!event) return null;

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain dark:bg-[#040D12]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl items-start">
          {/* Event Image */}
          <div className="relative">
            <Image
              src={event.imageUrl}
              alt="Event Image"
              width={1000}
              height={1000}
              className="h-full min-h-[300px] md:max-h-[500px] w-full object-cover object-center p-4 rounded-3xl"
            />
          </div>

          {/* Event Info */}
          <div className="flex flex-col gap-6 justify-center p-5 md:p-10 dark:bg-slate-900 bg-slate-100">
            {/* Title & Badges */}
            <div className="flex flex-col gap-4">
              <h2 className="h2-bold dark:text-slate-100">{event.title}</h2>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="p-bold-16 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 px-5 py-2">
                  {event.isFree ? "FREE" : `$${event.price}`}
                </span>
                <span className="p-medium-16 rounded-full bg-grey-500/10 dark:bg-slate-700 px-4 py-2 text-grey-500 dark:text-grey-400">
                  {event.category.name}
                </span>
                <p className="p-medium-16 dark:text-grey-400">
                  By{" "}
                  <span className="text-primary-500 font-semibold">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            {/* Countdown */}
            <EventCountdown
              startDateTime={event.startDateTime}
              endDateTime={event.endDateTime}
            />

            {/* Checkout + Share */}
            <div className="flex flex-wrap gap-3">
              <CheckoutButton event={event} />
              <ShareButton />
            </div>

            {/* Date & Location */}
            <div className="flex flex-col gap-4 border-t border-grey-400/20 dark:border-slate-700 pt-4">
              <div className="flex gap-3 items-start">
                <CalendarDays className="h-5 w-5 text-primary-500 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <p className="p-medium-15 dark:text-white font-medium">
                    {formatDateTime(event.startDateTime).dateOnly}
                    {" · "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p className="p-regular-14 text-grey-500 dark:text-grey-400">
                    Ends {formatDateTime(event.endDateTime).dateOnly}
                    {" · "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5 shrink-0" />
                <p className="p-medium-16 dark:text-white">{event.location}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 border-t border-grey-400/20 dark:border-slate-700 pt-4">
              <p className="p-bold-18 text-grey-600 dark:text-slate-300">
                About this Event
              </p>
              <p className="p-regular-16 dark:text-grey-400 leading-relaxed">
                {event.description}
              </p>
              {event.url && (
                <Link
                  href={event.url}
                  target="_blank"
                  className="flex items-center gap-1.5 text-primary-500 p-medium-14 mt-1 hover:underline w-fit"
                >
                  <ExternalLink className="h-4 w-4" />
                  Event Website
                </Link>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Related Events */}
      {relatedEvents && relatedEvents.data.length > 0 && (
        <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
          <h2 className="h2-bold dark:text-white">Related Events</h2>
          <Collection
            data={relatedEvents.data}
            emptyTitle="No related events"
            emptyStateSubtext="No other events in this category"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents.totalPages}
            urlParamName="page"
          />
        </section>
      )}
    </>
  );
};

export default EventDetail;

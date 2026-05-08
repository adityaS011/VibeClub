import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  event: IEvent;
};

const Card = ({ hasOrderLink, hidePrice, event }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isOrganizer = event.organizer?._id.toString() === userId;

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:min-h-[438px] dark:bg-slate-800/80 dark:shadow-slate-900/50 border border-transparent hover:border-primary-500/20 dark:border-slate-700">
      {/* Image with gradient overlay */}
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="relative flex-grow bg-gray-50 bg-cover bg-center text-grey-400 min-h-[200px]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Organizer controls */}
      {isOrganizer && !hidePrice && (
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-900/95 rounded-xl shadow-lg p-2 flex flex-col gap-2 z-10">
          <Link
            href={`/events/${event._id}/update`}
            className="hover:scale-110 transition-transform"
          >
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      {/* Card Body */}
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[190px] flex-col gap-3 p-5"
      >
        {/* Price + Category */}
        {!hidePrice && (
          <div className="flex gap-2 flex-wrap">
            <span className="p-semibold-14 rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-1 text-green-700 dark:text-green-400">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            {event.category && (
              <span className="p-semibold-14 rounded-full px-4 py-1 bg-primary-500/10 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400">
                {event.category.name}
              </span>
            )}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-1.5 text-grey-500 dark:text-grey-400">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <p className="p-medium-14">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
        </div>

        {/* Title */}
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 font-black dark:text-white leading-snug">
          {event.title}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between w-full pt-1 border-t border-grey-400/10 dark:border-slate-700">
          {event.organizer && (
            <p className="p-medium-14 text-grey-500 dark:text-grey-400 truncate max-w-[140px]">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
          )}
          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="flex items-center gap-1 text-primary-500 dark:text-primary-400 hover:underline shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="p-medium-14">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;

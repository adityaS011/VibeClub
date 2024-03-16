import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
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
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden  rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] dark:bg-slate-500/10 dark:shadow-slate-700/30">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-400"
      />
      {isOrganizer && !hidePrice && (
        <div className="absolute top-5 right-5 bg-white dark:bg-slate-900/90 transition-all rounded-xl shadow-lg p-2 flex flex-col gap-2">
          <Link href={`/events/${event._id}/update`} className="hover:scale-105 transition-all">
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
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-2 p-5 md:gap-3"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            {event.category && (
              <p className="p-semibold-14 w-max rounded-full px-4 py-1 bg-grey-500/10 text-grey-600 dark:bg-grey-400 dark:text-black">
                {event.category.name}
              </p>
            )}
          </div>
        )}
        <p className="p-medium-16 dark:text-white">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 font-black dark:text-white">
          {event.title}
        </p>
        <div className="flex-between w-full">
          {event.organizer && (
            <p className="p-medium-14 md:p-medium-16 text-grey-400">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
          )}
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="p-medium-14 text-primary-500 dark:text-primary-400">
                Order Details
              </p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
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

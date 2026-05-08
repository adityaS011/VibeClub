import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import Collection from "@/components/shared/Collection";
import { buttonVariants } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/events.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { cn } from "@/lib/utils";
import type { IOrder } from "@/lib/database/models/order.model";
import type { SearchParamProps } from "@/types";
import { CalendarDays, Ticket, PlusCircle } from "lucide-react";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const user = await currentUser();

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const [orders, organizedEvents] = await Promise.all([
    getOrdersByUser({ userId, page: ordersPage }),
    getEventsByUser({ userId, page: eventsPage }),
  ]);

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
    <>
      {/* User Info Header */}
      <section className="bg-primary-50 dark:bg-[#000114] bg-dotted-pattern bg-cover bg-center py-8 md:py-12">
        <div className="wrapper flex flex-col sm:flex-row items-center gap-6">
          {user?.imageUrl && (
            <Image
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
              width={96}
              height={96}
              className="rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
            />
          )}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="h3-bold dark:text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="p-medium-16 text-grey-500 dark:text-grey-400">
              @{user?.username ?? user?.emailAddresses[0]?.emailAddress}
            </p>
            <div className="flex justify-center sm:justify-start gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-grey-600 dark:text-grey-400">
                <Ticket className="h-4 w-4 text-primary-500" />
                <span className="p-medium-14">
                  {orders?.data.length ?? 0} ticket
                  {orders?.data.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-grey-600 dark:text-grey-400">
                <CalendarDays className="h-4 w-4 text-primary-500" />
                <span className="p-medium-14">
                  {organizedEvents?.data.length ?? 0} event
                  {organizedEvents?.data.length !== 1 ? "s" : ""} organized
                </span>
              </div>
            </div>
          </div>
          <div className="sm:ml-auto">
            <Link
              href="/events/create"
              className={cn(
                buttonVariants({ size: "lg" }),
                "button dark:text-white dark:bg-primary-500 gap-2"
              )}
            >
              <PlusCircle className="h-4 w-4" />
              Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="bg-grey-50 dark:bg-[#000114]/60 py-4 md:py-6">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left dark:text-white">
            My Tickets
          </h3>
          <Link
            href="/#events"
            className={cn(
              buttonVariants({ size: "lg" }),
              "button hidden dark:text-white dark:bg-blue-500 sm:flex"
            )}
          >
            Browse Events
          </Link>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet."
          emptyStateSubtext="No worries — plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Organized Events */}
      <section className="bg-grey-50 dark:bg-[#000114]/60 py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center dark:text-slate-100 sm:text-left">
            Events Organized
          </h3>
          <Link
            href="/events/create"
            className={cn(
              buttonVariants({ size: "lg" }),
              "button dark:text-slate-100 dark:bg-blue-500 hidden sm:flex"
            )}
          >
            Organize New Event
          </Link>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="You haven't organized any events yet."
          emptyStateSubtext="Host your first event and start connecting people!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default Profile;

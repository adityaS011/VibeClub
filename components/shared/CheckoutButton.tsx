"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { IEvent } from "@/lib/database/models/event.model";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import Link from "next/link";

type CheckoutButtonProps = {
  event: IEvent;
};

const CheckoutButton = ({ event }: CheckoutButtonProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  const onCheckout = async () => {
    await checkoutOrder({
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    });
  };

  if (hasEventFinished) {
    return (
      <p className="p-2 text-red-500 dark:text-red-400 font-medium">
        This event has already ended.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <Button asChild size="lg" className="button w-full sm:w-fit">
          <Link href="/sign-in" className="dark:text-white">
            <Ticket className="mr-2 h-4 w-4" />
            Get Tickets
          </Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <form action={onCheckout} className="w-full sm:w-fit">
          <Button
            type="submit"
            size="lg"
            className="button w-full sm:w-fit bg-primary-500 hover:bg-primary-500/90"
          >
            <Ticket className="mr-2 h-4 w-4" />
            {event.isFree ? "Get Free Ticket" : `Buy Ticket · $${event.price}`}
          </Button>
        </form>
      </SignedIn>
    </div>
  );
};

export default CheckoutButton;

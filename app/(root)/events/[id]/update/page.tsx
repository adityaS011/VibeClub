import { auth } from "@clerk/nextjs";
import EventForm from "@/components/shared/EventForm";
import MotionSection from "@/components/shared/animated/MotionSection";
import { getEventById } from "@/lib/actions/events.actions";
import { SearchParamProps } from "@/types";

const UpdateEvent = async ({ params: { id } }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.3 }}
        className="bg-primary-50 bg-dotted-pattern dark:bg-[#000114]/10 bg-cover bg-center py-5 md:py-10"
      >
        <h3 className="wrapper h3-bold text-center sm:text-left dark:text-white">
          Update Event
        </h3>
      </MotionSection>
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.4 }}
        className="wrapper my-8"
      >
        <EventForm type="Edit" userId={userId} event={event} eventId={event?._id} />
      </MotionSection>
    </>
  );
};

export default UpdateEvent;

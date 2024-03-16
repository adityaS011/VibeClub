import EventForm from "@/components/shared/EventForm";
import MotionSection from "@/components/shared/animated/MotionSection";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.5 }}
        className="bg-primary-50 bg-dotted-pattern dark:bg-[#000114]/10 bg-cover bg-center py-5 md:py-10"
      >
        <h3 className="wrapper h3-bold text-center sm:text-left dark:text-white">
          Create Event
        </h3>
      </MotionSection>
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.5 }}
        className="wrapper my-8"
      >
        <EventForm userId={userId} type="Create" />
      </MotionSection>
    </>
  );
};

export default CreateEvent;

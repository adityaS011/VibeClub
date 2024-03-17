import Collection from "@/components/shared/Collection";
import MotionSection from "@/components/shared/animated/MotionSection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/events.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    limit: 4,
    page: 1,
    category: "",
  });

  return (
    <>
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.5 }}
        className="py-5 md:py-10"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold dark:text-white">
            Connecting people. Creating experiences. Celebrating life.
            </h1>
            <p className="p-regular-18 md:p-regular-20 dark:text-gray-400">
            Craft meaningful connections. We create unforgettable offline experiences for your brand or celebration. 
            </p>
            <Button
              size="lg"
              asChild
              className="button w-full font-semibold sm:w-fit"
            >
              <Link href="#events" className="dark:text-white font-semibold">
                Join an Event Today!
              </Link>
            </Button>
          </div>
          <div className="flex md:ml-6 justify-center">
            <Image
              src="/assets/images/hero.jpg"
              alt="Hero Image"
              width={1000}
              height={700}
              className="object-contain w-72 md:w-80 rounded-xl max-h-[80vh] 2xl:max-h-[50vh] object-center"
            />
          </div>
        </div>
      </MotionSection>

      <section
        id="features"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold dark:text-white">
          Exciting Features
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Feature Box 1 */}
          <div className="feature-box flex-1 bg-slate-300 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Easy Booking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quickly book tickets to your favorite events hassle-free.
            </p>
          </div>
          {/* Feature Box 2 */}
          <div className="feature-box flex-1 bg-blue-400 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Diverse Events
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore a wide range of events spanning various categories.
            </p>
          </div>
          {/* Feature Box 3 */}
          <div className="feature-box flex-1 bg-red-300 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Expert Advice
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Gain insights and tips from industry experts at our events.
            </p>
          </div>
          {/* Feature Box 4 */}
          <div className="feature-box flex-1 bg-yellow-200 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Community Engagement
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with like-minded individuals in our vibrant community.
            </p>
          </div>
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold dark:text-white">
          Trust by <br /> Thousands of Events
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* <Search />
          <CategoryFilter /> */}
          <Collection
            data={events?.data || []}
            emptyTitle="No events found"
            emptyStateSubtext="Check back later for more events"
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={1}
          />
        </div>
      </section>
    </>
  );
}

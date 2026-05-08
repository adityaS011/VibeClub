import SkeletonLoading from "@/components/loaders/SkeletonLoading";
import Collection from "@/components/shared/Collection";
import MotionSection from "@/components/shared/animated/MotionSection";
import PartyUFO from "@/components/ui/PartyUfo";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/events.actions";
import { getAllCategories } from "@/lib/actions/category.actions";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Search } from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { CalendarDays, Ticket, Star, Users } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const features = [
  {
    icon: Ticket,
    title: "Easy Booking",
    description: "Quickly book tickets to your favorite events hassle-free.",
    color: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: CalendarDays,
    title: "Diverse Events",
    description: "Explore a wide range of events spanning various categories.",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Star,
    title: "Expert Advice",
    description: "Gain insights and tips from industry experts at our events.",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with like-minded individuals in our vibrant community.",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

const stats = [
  { value: "10K+", label: "Events Hosted" },
  { value: "500K+", label: "Happy Attendees" },
  { value: "150+", label: "Cities" },
  { value: "4.9★", label: "Average Rating" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;
  const query = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const [eventsResult, categories] = await Promise.all([
    getAllEvents({ query, limit: 6, page, category }),
    getAllCategories(),
  ]);

  return (
    <ErrorBoundary>
      {/* Hero Section */}
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.3 }}
        className="py-5 md:py-10"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 mt-6">
          <PartyUFO />

          <div className="flex flex-col justify-center gap-8 px-6 md:px-2">
            <div className="inline-flex items-center gap-2 bg-primary-500/10 dark:bg-primary-500/20 text-primary-500 rounded-full px-4 py-1.5 text-sm font-medium w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
              Next-gen event platform
            </div>
            <h1 className="h2-bold dark:text-white">
              Connecting people.{" "}
              <span className="text-primary-500">Creating</span> experiences.{" "}
              <span className="text-primary-500">Celebrating</span> life.
            </h1>
            <p className="p-regular-18 md:p-regular-20 dark:text-gray-400">
              Craft meaningful connections. We create unforgettable offline
              experiences for your brand or celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="button w-full font-semibold sm:w-fit"
              >
                <Link href="#events" className="dark:text-white font-semibold">
                  Explore Events
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="button w-full sm:w-fit dark:border-slate-600 dark:text-white"
              >
                <Link href="/events/create">Host an Event</Link>
              </Button>
            </div>
          </div>

          <div className="flex md:ml-6 justify-center">
            <Suspense fallback={<SkeletonLoading type="header_Image" />}>
              <Image
                src="/assets/images/hero.jpg"
                alt="Hero Image"
                width={1000}
                height={700}
                className="object-contain w-72 md:w-80 rounded max-h-[90vh] 2xl:max-h-[70vh] object-center translate-x-4 rotate-6 bg-transparent"
              />
            </Suspense>
          </div>
        </div>
      </MotionSection>

      {/* Stats Banner */}
      <section className="wrapper my-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-slate-800/60 shadow-sm border border-grey-400/10 dark:border-slate-700"
            >
              <span className="text-2xl md:text-3xl font-bold text-primary-500">
                <AnimatedCounter target={stat.value} />
              </span>
              <span className="text-sm text-grey-500 dark:text-grey-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex flex-col gap-2">
          <h2 className="h2-bold dark:text-white">Exciting Features</h2>
          <p className="p-regular-16 text-grey-500 dark:text-grey-400">
            Everything you need to host and attend amazing events
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, color, iconColor }) => (
            <div
              key={title}
              className={`${color} rounded-2xl p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/50 dark:bg-black/20 ${iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold dark:text-white">{title}</h3>
              <p className="text-sm text-grey-600 dark:text-grey-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex flex-col gap-2">
          <h2 className="h2-bold dark:text-white">
            Trusted by Thousands of Events
          </h2>
          <p className="p-regular-16 text-grey-500 dark:text-grey-400">
            Discover what's happening near you
          </p>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Suspense fallback={null}>
              <Search placeholder="Search events..." />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <CategoryFilter categories={categories || []} />
          </Suspense>
        </div>

        <Collection
          data={eventsResult?.data || []}
          emptyTitle="No events found"
          emptyStateSubtext="Check back later for more events"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={eventsResult?.totalPages}
          urlParamName="page"
        />
      </section>
    </ErrorBoundary>
  );
}

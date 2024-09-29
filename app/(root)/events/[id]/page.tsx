import MotionSection from '@/components/shared/animated/MotionSection';
import {
  getEventById,
  getRelatedEventsByCategory,
} from '@/lib/actions/events.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import { format } from 'path';

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
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ delay: 0.5 }}
      className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain dark:bg-[#040D12]'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl  items-center'>
        <Image
          src={event.imageUrl}
          alt='Image Event'
          width={1000}
          height={1000}
          className='h-full min-h-[300px] md:max-h-[400px] md:max-w-[600px] object-cover object-center p-4 rounded-3xl'
        />
        <div className='flex flex-col gap-8 justify-center p-5 md:p-10 dark:bg-slate-900 bg-slate-200'>
          <div className='flex flex-col gap-6'>
            <h2 className='h2-bold dark:text-slate-200'>{event.title}</h2>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='flex gap-3'>
                <p className='p-bold-20 rounded-full bg-green-500/10 text-green-700 px-5 py-2'>
                  {event.isFree ? 'FREE' : `$ ${event.price}`}
                </p>
                <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                  {event.category.name}
                </p>
              </div>
              <p className='p-medium-18 ml-2 mt-2 sm:mt-0 dark:text-grey-400'>
                By{' '}
                <span className='text-primary-500'>
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex gap-2 md:gap-3'>
              <Image
                src={'/assets/icons/calendar.svg'}
                width={32}
                height={32}
                alt='calendar'
              />
              <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                <p className='dark:text-white'>
                  {formatDateTime(event.startDateTime).dateOnly} -{' '}
                  {formatDateTime(event.startDateTime).timeOnly} /{' '}
                </p>
                <p className='dark:text-white'>
                  {formatDateTime(event.endDateTime).dateOnly} -{' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>
            <div className='p-regular-20 flex items-center gap-3'>
              <Image
                src={'/assets/icons/location.svg'}
                width={32}
                height={32}
                alt='location'
              />
              <p className='dark:text-white'>{event.location}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='p-bold-20 text-grey-600 dark:text-grey-400'>
              What You will Learn in this Event:
            </p>
            <p className='p-medium-16 lg:p-regular-20 dark:text-grey-400/90'>
              {event.description}
            </p>
            <p className='p-medium-16 lg:p-regular-20 truncate text-primary-500 underline'>
              {event.url}
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default EventDetail;

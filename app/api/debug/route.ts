import { NextResponse } from 'next/server';
import { getAllEvents } from '@/lib/actions/events.actions';

export async function GET() {
  const envVars = {
    MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? '✅ Set' : '❌ Missing',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing',
  };

  try {
    // Test the getAllEvents function directly
    const events = await getAllEvents({
      query: '',
      limit: 4,
      page: 1,
      category: '',
    });

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      variables: envVars,
      eventsTest: {
        success: true,
        count: events?.data?.length || 0,
        totalPages: events?.totalPages || 0,
        data: events?.data || []
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      environment: process.env.NODE_ENV,
      variables: envVars,
      eventsTest: {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      timestamp: new Date().toISOString(),
    });
  }
}

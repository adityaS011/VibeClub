import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? '✅ Set' : '❌ Missing',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing',
  };

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    variables: envVars,
    timestamp: new Date().toISOString(),
  });
}

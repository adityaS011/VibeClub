import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/events/:id",
    "/api/webhook/clerk",
    "/api/webhook/stripe", 
    "/api/uploadthing",
    "/api/debug",
  ],
  // Allow requests to proceed even if Clerk is not configured
  afterAuth: (auth, req) => {
    // If Clerk is not configured, allow the request to proceed
    if (!process.env.CLERK_SECRET_KEY || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      console.warn('Clerk environment variables not set, allowing public access');
      return;
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

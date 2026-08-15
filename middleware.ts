import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks/clerk(.*)",
  "/api/cron/cleanup(.*)",
  "/api/sessions(.*)",
  "/api/plan(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  if (request.nextUrl.pathname.startsWith('/api/plan')) {
    return;
  }

  if (!isPublicRoute(request)) {
    const authObj = await auth();

    if (!authObj.userId) {
      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return authObj.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|otf|webm|avif|mp4)).*)",
    "/(api|trpc)(.*)",
  ],
};
import { redirect } from "next/navigation";
import { GET as getUrlHandler } from "../api/url/[small_url]/route";
import { NextRequest } from "next/server";
import envVariables from "../config/env";

async function Page({ params }: { params: Promise<{ url: string }> }) {
  const { url } = await params;

  if (!url) {
    redirect("/");
  }

  try {
    const request = new NextRequest(
      new URL(
        `/api/url/${url}`,
        envVariables.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      )
    );

    const response = await getUrlHandler(request, {
      params: Promise.resolve({ small_url: url }),
    });

    // Check if the response is a redirect
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        redirect(location);
      } else {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error:", error);
    redirect("/");
  }
}

export default Page;

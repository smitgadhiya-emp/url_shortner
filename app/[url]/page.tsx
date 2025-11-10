"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import envVariables from "../config/env";

function Page() {
  const params = useParams();
  const url = params?.url as string;
  const router = useRouter();

  const fetchUrl = useCallback(async () => {
    if (!url) return;

    try {
      const response = await fetch(
        `${envVariables.NEXT_PUBLIC_APP_URL}/api/url/${url}`
      );
      const data = await response.json();
      const fetchedUrl = data.data?.original_url || "";

      // Redirect when URL is fetched
      if (fetchedUrl) {
        router.push(fetchedUrl);
        // window.location.href = fetchedUrl
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return (
    <div>
      
                <p>Redirecting...</p>
           
    </div>
  );
}

export default Page;

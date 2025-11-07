"use client";

import React, { useEffect, useState } from "react";

const Page = () => {

  const [data, setData] = useState<any>(null);

  const fetchUrl = async () => {
    try {
      const response = await fetch('/api/url/test123');
      const data = await response.json()
      console.log("Fetched Data:", data);
      setData(data?.data?.original_url);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  console.log(data);
  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div>
      Page Loaded
      <a href={data} >Fetch URL</a>
    </div>
  );
};

export default Page;

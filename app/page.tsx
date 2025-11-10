"use client"

import React, { useState } from "react";
import envVariables from "./config/env";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [smallUrl, setSmallUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const fetchUrl = async () => {
    if (!inputValue.trim()) {
      return;
    }
    
    try {
      const response = await fetch(`/api/url/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: inputValue }),
      });
      const data = await response.json();
      setSmallUrl(data?.data.small_url || "");
    } catch (err) {
      console.log("Fetch error:", err);
      setSmallUrl("");
    }
  };

  const copyToClipboard = async () => {
    const urlToCopy = `${envVariables.NEXT_PUBLIC_APP_URL}/${smallUrl}`;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Copy error:", err);
    }
  };

  return (
    <div style={{ 
      padding: "40px", 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ marginBottom: "30px" }}>URL Shortener</h1>
      
      <div style={{ gap: "20px", display: "flex", justifyContent: "center" }} >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter short URL"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />

        <button
          onClick={fetchUrl}
          style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
            cursor: "pointer"
        }}
        >
         Get Short URL
        </button>

            </div>
      {smallUrl && (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "10px",
          marginTop: "20px"
        }}>
          <a
            href={`${envVariables.NEXT_PUBLIC_APP_URL}/${smallUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "16px",
              color: "#0070f3",
              textDecoration: "underline",
              wordBreak: "break-all"
            }}
          >
            {`${envVariables.NEXT_PUBLIC_APP_URL}/${smallUrl}`}
          </a>
          <button
            onClick={copyToClipboard}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              backgroundColor: copied ? "#28a745" : "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap"
            }}
            title="Copy URL"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {copied ? (
                <>
                  <path d="M20 6L9 17l-5-5" />
                </>
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </>
              )}
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

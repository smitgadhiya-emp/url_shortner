// "use client";

// import React, { useState } from "react";
// import envVariables from "../config/env";

// const Page = () => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [originalUrl, setOriginalUrl] = useState<string>("");

//   const fetchUrl = async () => {
//     if (!inputValue.trim()) {
//       return;
//     }
    
//     try {
//       const response = await fetch(`/api/url/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ originalUrl: inputValue }),
//       });
//       const data = await response.json();
//       console.log("Fetched Data:", data?.data.small_url);
//       setOriginalUrl(data?.data.small_url || "");
//     } catch (err) {
//       console.log("Fetch error:", err);
//       setOriginalUrl("");
//     }
//   };

//   return (
//     <div style={{ 
//       padding: "40px", 
//       maxWidth: "600px", 
//       margin: "0 auto",
//       fontFamily: "Arial, sans-serif"
//     }}>
//       <h1 style={{ marginBottom: "30px" }}>URL Shortener</h1>
      
//       <div style={{ gap: "20px", display: "flex", justifyContent: "center" }} >
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Enter short URL"
//           style={{
//             width: "100%",
//             padding: "12px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             boxSizing: "border-box"
//           }}
//         />

//         <button
//           onClick={fetchUrl}
//           style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               backgroundColor: "#0070f3",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//             cursor: "pointer"
//         }}
//         >
//          Get Short URL
//         </button>

//             </div>
//       {originalUrl && (
//         <div>
//           <a
//             href={`${envVariables.NEXT_PUBLIC_APP_URL}/api/url/${originalUrl}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{
//               display: "block",
//               padding: "12px",
//               fontSize: "16px",
//               color: "#0070f3",
//               textDecoration: "underline",
//               wordBreak: "break-all"
//             }}
//           >
//             {`${envVariables.NEXT_PUBLIC_APP_URL}/api/url/${originalUrl}`}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

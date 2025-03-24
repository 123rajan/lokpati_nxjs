// import Main from "../Main";

// // Importing Mukta font from Google Fonts

// export const metadata = {
//   title: "Lokpati - Best News Portal of Nepal, नेपालको उत्कृष्ट न्युज पोर्टल",
//   description: "Lokpati offers real-time, reliable news coverage nationwide.",
//   icons: {
//     icon: "https://cms.lokpati.com/media/author/favicon-lokpati.png",
//   },
//   openGraph: {
//     title: "Lokpati - Best News Portal of Nepal, नेपालको उत्कृष्ट न्युज पोर्टल",
//     description: "Lokpati offers real-time, reliable news coverage nationwide.",
//     url: "https://lokpati.com/",
//     siteName: "Lokpati",
//     images: [
//       {
//         url: "https://cms.lokpati.com/media/author/favicon-lokpati.png",
//         width: 1260,
//         height: 800,
//       },
//     ],
//     type: "website",
//   },
// };

// export default function App() {
//   return (
//     <div>
//       <Main />
//     </div>
//   );
// }

"use client";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    notFound();
  }, []);
  return <div>Page not found</div>;
}

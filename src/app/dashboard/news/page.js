"use client";
import React from "react";
import dynamic from "next/dynamic";

const News = dynamic(
  () => import("../../Components/ChildComponent/DashboardComponents/News"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
// export const metadata = {
//   title: "Lokpati | Dashboard",
//   description:
//     "Lokpati offers real-time, reliable news coverage nationwide.",
// };
export default function page() {
  return (
    <div>
      <News />
    </div>
  );
}

"use client";
import React from "react";
import dynamic from "next/dynamic";
const Members = dynamic(
  () => import("../../Components/ChildComponent/DashboardComponents/Members"),
  { ssr: false }
);
import { useRouter } from "next/navigation";
// export const metadata = {
//   title: "KrishiSanjal | Dashboard",
//   description:
//     "Lokpati offers real-time, reliable news coverage nationwide.",
// };
export default function page() {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Members />
    </div>
  );
}

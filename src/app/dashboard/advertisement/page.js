import Advertisement from "../../Components/ChildComponent/DashboardComponents/Advertisement";
import React from "react";

export const metadata = {
  title: "Lokpati | Dashboard",
  description:
    "Lokpati offers real-time, reliable news coverage nationwide.",
};

export default function page() {
  return (
    <div>
      <Advertisement />
    </div>
  );
}

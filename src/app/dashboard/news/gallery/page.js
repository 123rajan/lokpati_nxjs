import React from "react";
import Gallery from "../../../Components/ChildComponent/DashboardComponents/Gallery";
export const metadata = {
  title: "Lokpati | Gallery",
  description:
    "Lokpati offers real-time, reliable news coverage nationwide.",
};
export default function page() {
  return (
    <div>
      <Gallery />
    </div>
  );
}

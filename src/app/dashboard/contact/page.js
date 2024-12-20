import React from "react";
import Contact from "../../Components/ChildComponent/DashboardComponents/Contact";

export const metadata = {
  title: "Lokpati | Dashboard",
  description:
    "Lokpati offers real-time, reliable news coverage nationwide.",
};
export default function page() {
  return (
    <div>
      <Contact />
    </div>
  );
}

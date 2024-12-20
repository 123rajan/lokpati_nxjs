import React from "react";
import Authors from "../../Components/ChildComponent/DashboardComponents/Authors";

export const metadata = {
  title: "Lokpati | Dashboard",
  description:
    "Lokpati offers real-time, reliable news coverage nationwide.",
};
export default function page() {
  return (
    <div>
      <Authors />
    </div>
  );
}

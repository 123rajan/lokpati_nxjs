import React from "react";
import Category from "../../Components/ChildComponent/DashboardComponents/Category";

export const metadata = {
  title: "Lokpati | Dashboard",
  description:
    "Lokpati offers real-time, reliable news coverage nationwide.",
};
export default function page() {
  return (
    <div>
      <Category />
    </div>
  );
}

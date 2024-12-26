import React from "react";
import Review from "../Components/ChildComponent/DashboardComponents/Review";

export const metadata = {
  title: "Lokpati | Dashboard",
  description:
    "Lokpati - Best News Portal of Nepal, नेपालको उत्कृष्ट न्युज पोर्टल",
};

export default function dashboard() {
  return (
    <div>
      <Review />
    </div>
  );
}

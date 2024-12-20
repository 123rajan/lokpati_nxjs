import IndividualAuthor from "../../../Components/MainComponents/IndividualAuthor";
import React from "react";

export const metadata = {
  title: "Lokpati | Author Page",
  description: "Author Page of Lokpati",
  icons: {
    icon: "https://cms.lokpati.com/media/author/favicon-lokpati.png",
  },
};

export default function page() {
  return (
    <div>
      <IndividualAuthor />
    </div>
  );
}

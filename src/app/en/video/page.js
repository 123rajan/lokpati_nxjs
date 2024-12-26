import React from "react";
import MyVideo from "../../Components/MainComponents/MyVideo";
export async function generateMetadata() {
  return {
    title: "Lokpati | Videos",
    description: "K",
  };
}
export default function page() {
  return <MyVideo />;
}

import React from "react";
import MyVideo from "../Components/MainComponents/MyVideo";
export async function generateMetadata() {
  return {
    title: "Lokpati | Videos",
    description: "Lokpati offers real-time, reliable news coverage nationwide.",
  };
}
export default function page() {
  return <MyVideo />;
}

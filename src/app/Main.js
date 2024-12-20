"use client";
import React, { useState } from "react";
import Hero from "../app/Components/ChildComponent/Others/Hero";
import Breadcrumb from "../app/Components/ChildComponent/Others/Breadcrumb";
import Ads from "../app/Components/ChildComponent/Advertisement/Ads";
import Card2 from "../app/Components/ChildComponent/Cards/Card2";
import Card3 from "../app/Components/ChildComponent/Cards/Card3";
import Both from "../app/Components/ChildComponent/SideBarComponents/Both";
import Card10 from "../app/Components/ChildComponent/Cards/Card10";
import ContentLayout from "../app/Components/MainComponents/ContentLayout";
import RoadBlocking from "../app/Components/ChildComponent/Advertisement/RoadBlocking"; // Import your RoadBlocking component
import { useTheme } from "../app/Components/Context/ThemeContext";
import { usePathname } from "next/navigation";

const Main = () => {
  const pathname = usePathname();
  const { bgColor } = useTheme();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  return (
    <div
      className="w-full flex justify-center "
      style={{ backgroundColor: bgColor }}
    >
      <div className="min-h-[400px] w-[97%] sm:w-[90%] mx-auto">
        <RoadBlocking name="H_roadblocking_ads" />
        <Ads name="H_landscape_above_breaking" />
        <Hero lge={lge} order={0} />
        <Ads name="H_landscape_after_breaking1" />
        <Hero lge={lge} order={1} />
        <Ads name="H_landscape_after_breaking2" />
        <Hero lge={lge} order={2} />
        <Ads name="H_landscape_after_breaking3" />
        <Hero lge={lge} order={3} />
        <Ads name="H_landscape_after_breaking4" />
        <Hero lge={lge} order={4} />
        <Ads name="H_landscape_after_breaking5" />

        <div className="mt-10">
          <div className="w-full grid grid-cols-10 gap-5">
            <div className="col-span-10 lg:col-span-7">
              <Breadcrumb
                addNews={true}
                myWord={lge === "en" ? "Highlights" : "राजनीति"}
              />
              <Card3 myWord={lge === "en" ? "News" : "राजनीति"} />
            </div>
            <div className="col-span-10 lg:col-span-3 h-full">
              <div className="sticky top-[60px]">
                <Both />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Ads name="H_landscape_after_rajniti" />
        </div>
        <div className="mt-20">
          <Breadcrumb myWord={lge === "en" ? "Agri-Tech" : "समाज"} />
          <Card2 myWord={lge === "en" ? "Agri-Tech" : "समाज"} />
        </div>
        <div>
          <Ads name="H_landscape_after_samachar" />
        </div>
        <div className="my-[60px]">
          <Card10 myWord1="अर्थतन्त्र" myWord2="विचार" myWord3="खेल" />
        </div>
        <div className="w-full">
          <Ads name="H_landscape_after_3-col" />
        </div>
        <div>
          <ContentLayout mukhyaShow={false} />
        </div>
      </div>
    </div>
  );
};

export default Main;

"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../ChildComponent/Others/Breadcrumb";
import SideContainer from "../ChildComponent/Others/SideContainer";
import Ads from "../ChildComponent/Advertisement/Ads";
import Card3 from "../ChildComponent/Cards/Card3";
import Card4 from "../ChildComponent/Cards/Card4";
import Card8 from "../ChildComponent/Cards/Card8";
import { Get } from "../Redux/API";
import SmallAds from "../ChildComponent/Advertisement/SmallAds";
import { usePathname } from "next/navigation";
import { useAds } from "../Context/AdsContext";

const ContentLayout = ({ mukhyaShow }) => {
  const [category, setCategory] = useState([]);
  const pathname = usePathname();
  const [isAds, setIsAds] = useState(false);
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");
  const { ads } = useAds();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await Get({ url: "/public/category/get-category" });
        const filteredResponse = response.filter(
          (item) => item.language === lge
        );
        // console.log(filteredResponse);
        setCategory(filteredResponse);
      } catch (error) {
        console.log("Error in category fetch: " + error);
        setCategory([]); // Handle errors by resetting categories
      }
    };
    fetchCategory();
    const filteredAd = ads.find(
      (ad) =>
        ad.ads_name === "H_sidebar_after_pravidi1" || "H_sidebar_after_pravidi2"
    );
    setIsAds(filteredAd ? true : false);
  }, [lge]);

  const safeCategory = (index) =>
    category[index] || { category_name: "N/A", id: null };

  return (
    <div className="grid grid-cols-10 gap-10 ">
      <div className="lg:col-span-7 col-span-10 flg:mr-5 h-full">
        <div className="h-auto ">
          <Breadcrumb
            showLinks={true}
            myWord={lge === "en" ? "Livestock and Fishery" : "विविधा"}
          />
          <div className="my-5">
            <Card4 myWord={lge === "en" ? "Livestock and Fishery" : "विविधा"} />
          </div>
          <div className="my-[45px]">
            <Ads name="H_landscape_after_bibidha" />
          </div>
        </div>
        <div className="h-auto mt-[20px]">
          <Breadcrumb
            showLinks={false}
            myWord={lge === "en" ? "Opinion/Blog" : "कला"}
          />
          <div className="my-5">
            <Card3 myWord={lge === "en" ? "Opinion | Blog" : "कला"} />
          </div>
          <Ads name="H_landscape_after_kala" />
        </div>
        {/* <div className="h-auto my-5">
          <div className="my-5">
            <Breadcrumb
              showLinks={false}
              myWord={lge === "en" ? "Farmer’s Story" : "कृषकको कथा"}
            />
            <Card5 myWord={lge === "en" ? "Farmer’s Story" : "कृषकको कथा"} />
          </div>
          <Ads name="H_landscape_after_krishakkokatha" />
        </div>

        
        <div className="h-auto my-5 mb-[80px]">
          <Breadcrumb
            showLinks={false}
            myWord={lge === "en" ? "Research Special" : "अनसुन्धान विषेश"}
          />
          <Card6
            myWord={lge === "en" ? "Research Special" : "अनसुन्धान विषेश"}
          />
        </div>
        <div className="h-auto my-5 mb-[80px]">
          <Breadcrumb
            showLinks={false}
            myWord={lge === "en" ? "Interview" : "अन्तर्वार्ता"}
          />
          <Card9 myWord={lge === "en" ? "Interview" : "अन्तर्वार्ता"} />
        </div> */}
        <div className="h-auto mt-[20px]">
          <div className="my-5">
            <Breadcrumb
              showLinks={false}
              addNews={false}
              video={true}
              myWord={lge === "en" ? "Video" : "भिडियो"}
            />
            <Card8 />
          </div>
        </div>
        <div className="sticky top-[60px]">
          <Ads name="H_landscape_after_video" />
        </div>
      </div>
      <div className="col-span-10 lg:col-span-3 border-lg ">
        <SideContainer mukhyaShow={mukhyaShow} />
      </div>
    </div>
  );
};

export default ContentLayout;

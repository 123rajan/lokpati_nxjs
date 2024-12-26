"use client";
import React, { useEffect, useState } from "react";
import { useNews } from "../../Context/NewsContext";
import { Spin } from "antd"; // Import Spin for loading indicator
import Breadcrumb from "../Others/Breadcrumb";
import { useTheme } from "../../Context/ThemeContext";
import PravidiBox from "./PrividiBox";
import { usePathname } from "next/navigation";

const nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

const toNepaliNumber = (num) => {
  return String(num)
    .split("")
    .map((digit) => nepaliNumbers[Number(digit)] || digit)
    .join("");
};

const Pravidi = () => {
  const { wholeNews } = useNews(); // Fetch news from context
  const [filteredNews, setFilteredNews] = useState([]);
  const { themeColor } = useTheme();
  const [loading, setLoading] = useState(false); // Loading state
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  useEffect(() => {
    // setLoading(true);
    const filterNews = () => {
      const news = wholeNews.filter(
        (item) =>
          item.category_name === (lge === "en" ? "Opinion | Blog" : "प्रविधि")
      );
      setFilteredNews(news.slice(0, 4)); // Limit to 4 items
      setLoading(false); // Set loading to false after filtering
    };

    if (wholeNews.length) {
      filterNews();
    } else {
      // setLoading(true); // Set loading while waiting for news
    }
  }, [wholeNews]); // Re-run when wholeNews changes

  return (
    <div className="flex flex-col gap-5 w-full">
      <Breadcrumb
        myWord={lge === "en" ? "Opinion/Blog" : "प्रविधि"}
        addNews={false}
      />
      <div className="flex flex-col gap-6 my-1">
        {loading ? (
          <div className="flex justify-center my-4">
            <Spin size="large" /> {/* Loading spinner */}
          </div>
        ) : (
          filteredNews.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="grid grid-cols-7  items-center">
                <div className="col-span-1 flex justify-center items-center">
                  <span
                    className="flex items-center justify-center text-white font-bold border"
                    style={{
                      backgroundColor: themeColor,
                      width: "10px", // Fixed width
                      height: "10px", // Fixed height
                      borderRadius: "50%", // Perfect circle
                      display: "flex",
                      alignItems: "center", // Center vertically
                      justifyContent: "center", // Center horizontally
                      fontSize: "14px", // Adjust font size as needed
                    }}
                  ></span>
                </div>
                <div className="col-span-6">
                  <PravidiBox
                    id={item.id}
                    created_date_ad={item.created_date_ad}
                    created_date_bs={item.created_date_bs}
                    title={item.news_title}
                    subtitle={item.subtitle}
                    image={
                      item.image ||
                      item.media_image ||
                      "https://cms.lokpati.com/media/author/favicon-lokpati.png"
                    }
                  />
                </div>
              </div>
              {index < filteredNews.length - 1 && (
                <hr className="bg-[#d1d1cf] mx-2 h-[2px]" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Pravidi;

"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import TrendingNewsBox from "./TrendingNewsBox";
import Breadcrumb from "../Others/Breadcrumb";
import { useTheme } from "../../Context/ThemeContext";
import { useNews } from "../../Context/NewsContext";
import { useCount } from "../../Context/CountContext";
import { usePathname } from "next/navigation";

const nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

const toNepaliNumber = (num) => {
  return String(num)
    .split("")
    .map((digit) => nepaliNumbers[Number(digit)])
    .join("");
};

const isWithinLastWeek = (dateString) => {
  const oneWeekAgo = dayjs().subtract(1, "week");
  return dayjs(dateString).isAfter(oneWeekAgo);
};

export default function TrendingNews() {
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");
  const { themeColor } = useTheme();
  const { wholeNews } = useNews();
  const { count } = useCount();
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const viewsResponse = await count;
        console.log("Views response:", viewsResponse); // Debug log
        if (!viewsResponse || !Array.isArray(viewsResponse)) {
          throw new Error("Invalid views response");
        }

        const sortedViews = viewsResponse.sort(
          (a, b) => b.visit_count - a.visit_count
        );

        const newsResponse = await wholeNews;
        console.log("News response:", newsResponse); // Debug log

        const trendingData = sortedViews
          .map((view) => {
            const matchingNews = newsResponse.find(
              (news) => String(news.id) === view.title && news.language === lge
            );
            if (
              matchingNews &&
              isWithinLastWeek(matchingNews.created_date_ad)
            ) {
              return {
                id: matchingNews.id,
                created_date_ad: matchingNews.created_date_ad,
                created_date_bs: matchingNews.created_date_bs,
                title: matchingNews.news_title,
                subtitle: matchingNews.news_sub_title,
                image: matchingNews.image,
              };
            }
            return null;
          })
          .filter((item) => item !== null);

        console.log("Trending data:", trendingData); // Debug log

        setTrendingNews(trendingData.slice(0, 5));
      } catch (error) {
        console.error("Error fetching trending news:", error);
        setError("Failed to fetch trending news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, [count, wholeNews, lge]);

  if (loading) {
    return <div className="px-5">Loading trending news...</div>;
  }

  if (error) {
    return <div className="px-5 text-red-500">{error}</div>;
  }

  if (trendingNews.length === 0) {
    return (
      <div className="px-5">No trending news found for the past week.</div>
    );
  }

  return (
    <div className="px-5">
      {trendingNews.map((news, index) => (
        <React.Fragment key={news.id}>
          <div className="grid grid-cols-7 gap-5 my-1">
            <div className="col-span-1 flex justify-center items-center">
              <span
                className="text-white font-bold border w-[30px] h-[30px] flex bg-blue-600 justify-center items-center"
                style={{
                  border: "1px solid black",
                  borderRadius: "100%",
                }}
              >
                {lge === "en" ? index + 1 : toNepaliNumber(index + 1)}
              </span>
            </div>
            <div className="col-span-6 ">
              <TrendingNewsBox
                id={news.id}
                created_date_ad={news.created_date_ad}
                created_date_bs={news.created_date_bs}
                title={news.title}
                subtitle={news.subtitle}
                image={
                  news.image ||
                  news.media_image ||
                  "https://cms.lokpati.com/media/author/favicon-lokpati.png"
                }
              />
            </div>
          </div>
          {index < trendingNews.length - 1 && (
            <hr className="bg-[#d1d1cf] mx-2 h-[2px] " />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

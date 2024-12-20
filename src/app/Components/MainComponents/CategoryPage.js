"use client";
import React, { useState, useEffect, useContext } from "react";
import { Skeleton } from "@mui/material";
import Breadcrumb from "../ChildComponent/Others/Breadcrumb";
import BigCardContentRight from "../ChildComponent/Boxes/BigCardContentRight";
import SmallCardContentBottom from "../ChildComponent/Boxes/SmallCardContentBottom";
import { Button } from "antd";
import Both from "../ChildComponent/SideBarComponents/Both";
import NotFound from "../ErrorPage/NotFound";
import { useNews } from "../Context/NewsContext";
import { useTheme } from "../Context/ThemeContext";
import { Get } from "../Redux/API";
import { usePathname } from "next/navigation";

const CategoryPage = ({ categoryName, isValidCategory }) => {
  const [visibleCount, setVisibleCount] = useState(11);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [filteredNews, setFilteredNews] = useState([]);
  const { wholeNews } = useNews();
  const { bgColor } = useTheme();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");
  useEffect(() => {
    const fetchNews = async () => {
      if (!wholeNews.length) {
        try {
          const newsData = await Get({ url: "/public/news/get-news" });
          const filtered = newsData.filter(
            (item) =>
              item.category_name === categoryName ||
              (item.sub_category === categoryName &&
                item.language === lge &&
                item.active === true)
          );
          setFilteredNews(filtered);
          setLoading(false);
        } catch (error) {
          console.log("Error fetching news:", error);
        }
      }

      const filtered = wholeNews.filter(
        (item) =>
          item.category_name === categoryName ||
          item.sub_category === categoryName
      );
      setFilteredNews(filtered);
      setLoading(false);
    };

    fetchNews();
  }, [categoryName, wholeNews, isValidCategory]);
  useEffect(() => {
    const scrollToTop = () => {
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Smooth scrolling
        });
      }
    };
    scrollToTop();
  }, []);
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (loading) {
    return (
      <div
        className="w-full flex justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <div className="w-[97%] sm:w-[90%]">
          <div className="w-full grid grid-cols-6 mt-10">
            <div className="col-span-6 md:col-span-4 px-3">
              <Breadcrumb
                showLinks={false}
                myWord={categoryName}
                addNews={false}
              />
              <Skeleton variant="rectangular" width="80%" height="60vh" />
            </div>
            <div className="col-span-6 md:col-span-2 mt-10">
              <div className="sticky top-[60px]">
                <Both />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isValidCategory === false) {
    return <NotFound />;
  }

  if (filteredNews.length === 0) {
    return (
      <div className="text-center text-lg font-semibold">No News Found</div>
    );
  }

  return (
    <div
      className="w-full flex justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-[97%] sm:w-[90%]">
        <div className="w-full grid grid-cols-6 mt-10">
          <div className="col-span-6 md:col-span-4 px-3">
            <Breadcrumb
              showLinks={false}
              myWord={categoryName}
              addNews={false}
            />
            <div className="mt-4">
              <BigCardContentRight
                showParagraph={true}
                id={filteredNews[0].id}
                title={filteredNews[0].news_title}
                sub_title={filteredNews[0].news_sub_title}
                post={filteredNews[0].news_post}
                image={filteredNews[0].image}
                created_date_ad={filteredNews[0].created_date_ad}
                created_date_bs={filteredNews[0].created_date_bs}
              />
              <div className="flex w-full flex-wrap justify-between  gap-[35px] sm:gap-[30px] mt-4">
                {filteredNews.slice(1, visibleCount).map((item) => (
                  <div
                    key={item.id}
                    className="w-[95%] sm:w-[80%] xl:w-[47%]  overflow-hidden   bg-blue-100 rounded-md"
                  >
                    <SmallCardContentBottom
                      lineClampTitle={2}
                      lineClampDes={2}
                      textBlack={true}
                      showParagraph={true}
                      showDate={false}
                      title={item.news_title}
                      sub_title={item.news_sub_title}
                      image={item.image}
                      id={item.id}
                      created_date_ad={item.created_date_ad}
                      created_date_bs={item.created_date_bs}
                    />
                  </div>
                ))}
              </div>
              {visibleCount < filteredNews.length && (
                <Button
                  onClick={handleLoadMore}
                  type="primary"
                  block
                  className="bg-blue-500 text-white my-3"
                >
                  Load More
                </Button>
              )}
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 mt-10">
            <div className="sticky top-[60px]">
              <Both />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

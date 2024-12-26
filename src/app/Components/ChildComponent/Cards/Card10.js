import React, { useEffect, useState } from "react";
import SmallCardContentBottom from "../Boxes/SmallCardContentBottom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNews } from "../../Context/NewsContext";
import { useTheme } from "../../Context/ThemeContext";
import Link from "next/link";

// Utility function to filter news items based on category/sub-category
const filterNews = (wholeNews, word) => {
  return wholeNews
    .filter((item) => item.category_name === word || item.sub_category === word)
    .slice(0, 3); // Get the top 3 news
};

const NewsSection = ({ word, news, isMiddle, themeColor }) => {
  return (
    <div
      className={`col-span-3 lg:col-span-1 flex flex-col items-center gap-5 shadow-lg rounded-lg ${isMiddle ? "bg-gray-200 " : ""}`}
      style={
        isMiddle
          ? { background: "linear-gradient(to top, #0288d1, #801725)" }
          : {}
      }
    >
      <Link
        href={`/${word}`}
        className="text-2xl font-bold text-center py-2 w-[95%]"
        style={{ color: themeColor, borderBottom: "1px solid #93b8cc" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {word}
      </Link>
      {news.length > 0 ? (
        news.map((item) => (
          <div
            key={item.id}
            className="w-[90%] sm:w-[70%] lg:w-[95%] h-[280px]"
          >
            <SmallCardContentBottom
              id={item.id}
              title={item.news_title}
              image={item.image || item.media_image}
              created_date_ad={item.created_date_ad}
              created_date_bs={item.created_date_bs}
              textBlack={isMiddle ? false : true}
            />
          </div>
        ))
      ) : (
        <div>No news available for {word}!</div>
      )}
    </div>
  );
};

const Card10 = ({ myWord1, myWord2, myWord3 }) => {
  const { wholeNews, loading } = useNews();
  const [news1, setNews1] = useState([]);
  const [news2, setNews2] = useState([]);
  const [news3, setNews3] = useState([]);

  const { themeColor } = useTheme();

  // Fetch news for all categories
  useEffect(() => {
    if (wholeNews.length) {
      setNews1(filterNews(wholeNews, myWord1));
      setNews2(filterNews(wholeNews, myWord2));
      setNews3(filterNews(wholeNews, myWord3));
    }
  }, [wholeNews, myWord1, myWord2, myWord3]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="h-[60vh] flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <div className="w-[90%] mx-auto lg:w-full grid grid-cols-3 gap-[40px] lg:gap-2">
          {/* Section for myWord1 */}
          <NewsSection
            word={myWord1}
            news={news1}
            isMiddle={false}
            themeColor={themeColor}
          />
          {/* Section for myWord2 - Middle section with a distinct background */}
          <NewsSection
            word={myWord2}
            news={news2}
            isMiddle={true}
            themeColor="white"
          />
          {/* Section for myWord3 */}
          <NewsSection
            word={myWord3}
            news={news3}
            isMiddle={false}
            themeColor={themeColor}
          />
        </div>
      )}
    </div>
  );
};

export default Card10;

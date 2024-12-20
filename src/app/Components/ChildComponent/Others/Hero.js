import React, { useEffect, useState } from "react";
import AuthorBredCrumb from "../Others/AuthorBredCrumb";
import { useNews } from "../../Context/NewsContext";
import Link from "next/link";
import { useTheme } from "../../Context/ThemeContext";
import FormatNepaliDate from "../../JS/FormatNepaliDate";
import { Skeleton } from "@mui/material";

const Hero = ({ lge = "np", order }) => {
  const [news, setNews] = useState(null);
  const [nepaliDate, setNepaliDate] = useState("");
  const [englishDate, setEnglishDate] = useState("");

  const { themeColor } = useTheme();
  const { wholeNews, loading } = useNews();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (wholeNews.length > 0) {
          // Get the current time
          const currentTime = new Date();

          // Filter news that is both breaking and created in the last 12 hours
          const filteredResponse = wholeNews.filter((item) => {
            if (item.breaking_news === true && item.created_date_ad) {
              const createdDate = new Date(item.created_date_ad); // Parse the date
              const hoursDifference =
                (currentTime - createdDate) / (1000 * 60 * 60); // Difference in hours
              return hoursDifference <= 12; // Only keep news within the last 12 hours
            }
            return false;
          });

          // Set the news to the filtered one based on the `order` index
          setNews(filteredResponse[order]);
        } else {
          setNews(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNews(null);
      }
    };

    fetchData();
  }, [wholeNews, order]);

  useEffect(() => {
    if (news) {
      if (news.self_date) {
        const englishDateObj = new Date(news.self_date);
        const formattedEnglishDate = `${englishDateObj.getDate()} ${englishDateObj.toLocaleString("default", { month: "long" })} ${englishDateObj.getFullYear()}`;
        setEnglishDate(formattedEnglishDate);
        setNepaliDate(FormatNepaliDate(news.self_date));
      } else if (news.created_date_ad && news.created_date_bs) {
        const englishDateObj = new Date(news.created_date_ad);
        const formattedEnglishDate = `${englishDateObj.getDate()} ${englishDateObj.toLocaleString("default", { month: "long" })} ${englishDateObj.getFullYear()}`;
        setEnglishDate(formattedEnglishDate);
        setNepaliDate(convertToNepaliDate(news.created_date_bs));
      }
    }
  }, [news]);

  const convertToNepaliDate = (dateString) => {
    if (!dateString) return "";
    const nepaliMonths = [
      "बैशाख",
      "ज्येष्ठ",
      "आषाढ",
      "साउन",
      "भाद्र",
      "आश्विन",
      "कार्तिक",
      "मंसिर",
      "पौष",
      "माघ",
      "फागुन",
      "चैत",
    ];
    const [year, month, day] = dateString.split("-").map(Number);
    const nepaliNumbers = (num) => {
      const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return num
        .toString()
        .split("")
        .map((digit) => nepaliDigits[digit])
        .join("");
    };
    const nepaliMonth = nepaliMonths[month - 1];
    const nepaliDay = nepaliNumbers(day);
    const nepaliYear = nepaliNumbers(year);
    return `${nepaliDay} ${nepaliMonth} ${nepaliYear}`;
  };

  const { news_title, news_sub_title, author_name, category_name, image, id } =
    news || {};

  return (
    <div className="font-mukta ">
      {loading ? (
        <div className="w-[100vw] h-[100vh] gap-[20px] flex flex-col justify-center item-center">
          <div className="w-[90%] flex gap-[10px] flex-col items-center">
            <Skeleton variant="rectangular" width="80%" height={60} />
            <Skeleton variant="rectangular" width="30%" height={40} />
            <Skeleton variant="rectangular" width="40%" height={50} />
          </div>
          <Skeleton variant="rectangular" width="90%" height="80vh" />
        </div>
      ) : (
        <>
          {news ? (
            <div
              className={`my-1 flex flex-col items-center gap-[50px] cursor-pointer mt-[50px]`}
            >
              <div className="text-center my-[10px] w-full flex flex-col gap-[10px]">
                <Link
                  href={
                    lge === "en"
                      ? `/en/story/${news.created_date_ad.split("T")[0].split("-").join("/")}/${id}/${news_title}`
                      : `/story/${news.created_date_bs.replace(/-/g, "/")}/${id}`
                  }
                >
                  <p
                    className="text-4xl sm:text-6xl font-bold max-w-[80%] mx-auto py-1 line-clamp-3 hover:text-[#2b2ead] pt-[20px]"
                    style={{ lineHeight: "1.2" }}
                  >
                    {news_title}
                  </p>
                  <p className="max-w-[80%] mx-auto py-1 sm:w-[50%] text-[20px] sm:text-[22px] text-[#6f7370] line-clamp-1">
                    {news_sub_title}
                  </p>
                </Link>
                {author_name && englishDate && nepaliDate && (
                  <AuthorBredCrumb
                    id={author_name}
                    englishDate={englishDate}
                    nepaliDate={nepaliDate}
                    category={category_name}
                    language={lge}
                  />
                )}
              </div>
              <Link
                href={
                  lge === "en"
                    ? `/en/story/${news.created_date_ad.split("T")[0].split("-").join("/")}/${id}/${news_title}`
                    : `/story/${news.created_date_bs.replace(/-/g, "/")}/${id}`
                }
                className="w-full"
              >
                <div className="w-full flex justify-center">
                  {image ? (
                    <img
                      src={image}
                      className="w-[95%] lg:w-[90%] max-h-[650px]"
                      style={{
                        borderRadius: "10px",
                        border: `2px dotted ${themeColor}`,
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;

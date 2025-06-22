"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NepaliDate } from "@zener/nepali-datepicker-react";
import { useAds } from "../../Context/AdsContext";
import Ads from "../../ChildComponent/Advertisement/Ads";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";

const TopNav = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  // Function to convert English month name to Nepali
  const getNepaliMonthName = (monthName) => {
    const nepaliMonths = [
      "बैशाख",
      "जेठ",
      "असार",
      "श्रावण",
      "भाद्र",
      "आश्विन",
      "कार्तिक",
      "मंसिर",
      "पौष",
      "माघ",
      "फाल्गुन",
      "चैत्र",
    ];
    const englishMonths = [
      "Baisakh",
      "Jestha",
      "Asar",
      "Shrawan",
      "Bhadra",
      "Aswin",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra",
    ];

    const normalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase();

    const index = englishMonths.indexOf(normalizedMonthName);
    return index !== -1 ? nepaliMonths[index] : "Unknown Month";
  };

  // Function to convert English numerals to Nepali numerals
  const convertToNepaliNumerals = (number) => {
    const nepaliNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return String(number)
      .split("")
      .map((digit) => nepaliNumerals[parseInt(digit)] || digit)
      .join("");
  };

  // Function to convert English weekday to Nepali
  const getNepaliWeekday = (weekday) => {
    const nepaliWeekdays = [
      "आइतबार",
      "सोमबार",
      "मंगलबार",
      "बुधबार",
      "बिहिबार",
      "शुक्रबार",
      "शनिबार",
    ];
    const englishWeekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const index = englishWeekdays.indexOf(weekday);
    return index !== -1 ? nepaliWeekdays[index] : "Unknown Weekday";
  };
  // Get today's date in Nepali format
  const date = new NepaliDate();
  const weekday = date.format("dddd"); // Get the day of the week (in English)
  const day = date.format("DD"); // Get the day of the month
  const month = date.format("MMMM"); // Get the month (in English)
  const year = date.format("YYYY"); // Get the year

  const nepaliWeekday = getNepaliWeekday(weekday); // Convert to Nepali weekday
  const nepaliMonth = getNepaliMonthName(month); // Convert to Nepali month
  const nepaliDay = convertToNepaliNumerals(day); // Convert the day to Nepali numerals
  const nepaliYear = convertToNepaliNumerals(year); // Convert the year to Nepali numerals

  // Convert day and year to Nepali numerals
  const formattedNepaliDate = `${nepaliWeekday}, ${nepaliDay} ${nepaliMonth} ${nepaliYear}`;

  // Function to get English date in the same format
  const getEnglishDate = () => {
    const englishDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return englishDate.toLocaleDateString("en-US", options);
  };

  const formattedEnglishDate = getEnglishDate();

  const { loading } = useAds(); // Adjusted for useAds context

  const handleScroll = () => {
    if (window.scrollY > 250) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="h-[200px] md:h-[170px] bg-transparent py-2 w-full overflow-hidden">
      <div className="bg-red-30 flex flex-col md:flex-row md:gap-[20px] w-full h-full justify-between items-center">
        <div className="flex justify-center items-center md:items-end flex-col order-2 md:order-1  md:gap-0 h-[130px] md:h-auto">
          <Link href={lge === "en" ? "/en" : "/"}>
            <Image
              src="/logo.jpg"
              alt="logo"
              width={400}
              height={80}
              className="h-[90px] md:h-[100px]"
            />
          </Link>
          <h2 className="font-mukta text-[10px] text-right mr-[25px] md:pl-[3px] sm:text-[12px] w-full font-medium text-[#616161]">
            {lge === "np" ? formattedNepaliDate : formattedEnglishDate}
          </h2>
        </div>
        <div className=" w-full md:w-[80%] flex items-center lg:text-left justify-end h-[70px] order-1 md:order-2">
          {/* <div className="max-w-[90%]   flex justify-center font-mukta items-center text-xl"> */}
          {/* Media Section */}
          {loading ? (
            <Skeleton variant="rectangular" width="50vw" height={70} />
          ) : (
            // filteredAd && (
            //   <div className="flex items-center justify-end">
            //     <a href={filteredAd.ads_url} target="_blank">
            //       {getMediaType(filteredAd.ads_image) === "image" && (
            //         <img
            //           src={filteredAd.ads_image}
            //           alt="Ad"
            //           style={{ maxWidth: "100%", maxHeight: "70px" }}
            //         />
            //       )}
            //       {getMediaType(filteredAd.ads_image) === "video" && (
            //         <video
            //           src={filteredAd.ads_image}
            //           controls
            //           style={{ maxWidth: "100%", maxHeight: "70px" }}
            //         >
            //           Your browser does not support the video tag.
            //         </video>
            //       )}
            //     </a>
            //   </div>
            // )
            <Ads name="H_landscape_top_header" />
          )}
        </div>
      </div>
      {isScrolled && (
        <div className=" px-2 bg-[#1f1e1e] text-white absolute top-[260px] md:top-[230px] left-[10px] md:left-[5%] text-[11px] z-10">
          {lge === "np" ? formattedNepaliDate : formattedEnglishDate}
        </div>
      )}
    </div>
  );
};

export default TopNav;

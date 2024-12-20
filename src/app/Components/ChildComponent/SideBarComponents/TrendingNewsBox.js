"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image
import { usePathname } from "next/navigation";
export default function TrendingNewsBox({
  id,
  created_date_bs,
  created_date_ad,
  title,
  subtitle,
  image,
}) {
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <Link
      href={
        lge === "en"
          ? `/en/story/${created_date_ad
              .split("T")[0]
              .split("-")
              .join("/")}/${id}/${title}`
          : `/story/${
              created_date_bs
                ? created_date_bs.replace(/-/g, "/")
                : "default_date"
            }/${id}` // Add a fallback or default date
      }
    >
      <div
        style={{
          padding: "10px 0px",
        }}
        className="grid grid-cols-5 h-[100px] cursor-pointer gap-[20px]"
        // onClick={scrollToTop}
      >
        <span className="col-span-3 flex justify-center items-center">
          <p
            className="lg:text-xl text-base w-full  my-1 line-clamp-3 text-[rgba(0,0,0,0.8)] hover:text-blue-700"
            style={{ fontWeight: "600", lineHeight: "1.5" }}
          >
            {title}
          </p>
        </span>
        {image ? (
          <Image
            src={image}
            alt={title || "Trending news image"} // Provide a meaningful alt text
            style={{ borderRadius: "5px" }}
            width={200} // Set an appropriate width
            height={80} // Set an appropriate height
            className="ml-[2px] w-full h-[70px]  col-span-2 object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full col-span-2"></div>
        )}
      </div>
    </Link>
  );
}

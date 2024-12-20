import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function PravidiBox({
  id,
  created_date_bs,
  created_date_ad,
  title,
  subtitle,
  image,
}) {
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");
  return (
    <Link
      href={
        lge === "en"
          ? `/en/story/${created_date_ad.split("T")[0].split("-").join("/")}/${id}/${title}`
          : `/story/${created_date_bs ? created_date_bs.replace(/-/g, "/") : "default_date"}/${id}` // Add a fallback or default date
      }
    >
      <div
        style={{
          // borderBottom: "2px solid #d1d1cf",
          padding: "10px 0px",
          // margin: "0 10px",
        }}
        className="flex items-center h-[100px] w-full cursor-pointer"
      >
        <Image
          src={image}
          alt="image"
          style={{ borderRadius: "5px" }}
          className="mx-3 w-[100px] h-full"
          width={100}
          height={100}
        />
        <span>
          {title && (
            <p
              className=" text-xl text-base my-1 line-clamp-3 text-black hover:text-blue-800"
              style={{ fontWeight: "600", lineHeight: "1.5" }}
            >
              {title}
            </p>
          )}

          {/* <p
              className="text-xs "
              style={{ fontWeight: "600", lineHeight:'1.5', color: "#6b6b6a" }}
              >
              सोम, फागुन २८, २०८०
              </p> */}
        </span>
      </div>
    </Link>
  );
}

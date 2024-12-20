import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const extractFirstParagraph = (htmlString) => {
  const match = htmlString.match(/<p>(.*?)<\/p>/);
  return match ? match[1].trim() : null;
};
const BigCardContentRight = ({
  showParagraph = false,
  id,
  title,
  sub_title,
  image,
  created_date_ad,
  created_date_bs,
  post = "",
}) => {
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  return (
    <div
      className=" h-[500px] sm:h-[350px]"
      style={{ background: " linear-gradient(to top, #0288d1, #801725)" }}
    >
      <Link
        href={
          lge === "en"
            ? `/en/story/${created_date_ad.split("T")[0].split("-").join("/")}/${id}/${title}`
            : `/story/${created_date_bs.replace(/-/g, "/")}/${id}`
        }
      >
        <div className="w-full group cursor-pointer h-full overflow-hidden font-mukta">
          <div className="flex flex-col sm:flex-row h-full ">
            <div className="w-full sm:w-3/5 overflow-hidden h-[250px] sm:h-full relative bg-black group">
              {image ? (
                <Image
                  src={image}
                  alt="image"
                  className="w-full  h-[250px] sm:h-full group-hover:opacity-80 group-hover:scale-110 duration-150 "
                  width={250}
                  height={250}
                />
              ) : (
                <Image
                  src="/logo.jpg"
                  alt="image"
                  className="w-full h-full group-hover:opacity-80 group-hover:scale-110 duration-150 "
                  width={250}
                  height={250}
                />
              )}
            </div>
            <div className="w-full sm:w-2/5 flex flex-col   sm:h-full justify-center items-center gap-5 py-[10px] md:py-[20px] sm:py-0">
              <h2
                className="text-white text-2xl text-center font-bold   sm:text-3xl line-clamp-4  leading-6 px-2"
                style={{ lineHeight: "1.5" }}
              >
                {title}
              </h2>
              {showParagraph && (
                <p
                  className="text-[#f5f5dc]  text-l line-clamp-3 text-justify !font-normal px-[5%]"
                  style={{ lineHeight: "1.5" }}
                >
                  {extractFirstParagraph(post)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BigCardContentRight;

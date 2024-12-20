"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { HomeOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Drawer, message } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { Get } from "../../Redux/API";
import { useTheme } from "../../Context/ThemeContext";
import Image from "next/image";

const BottomNav = () => {
  const [searchValue, setSearchValue] = useState("");
  const { themeColor } = useTheme();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const router = useRouter();
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [url, setUrl] = useState("");
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");
  const showDrawer = () => {
    if (window.innerWidth < 1024) {
      setOpen(true);
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 170) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const showDrawer2 = () => {
    setOpen2(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (lge === "en") {
      setUrl("/en");
    } else {
      setUrl("");
    }
  }, []);

  const onClose2 = () => {
    setOpen2(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log('Current language:', lge);
  // }, [lge]);

  const fetchData = async () => {
    try {
      const response = await Get({ url: "/public/category/get-category" });
      const filteredResponse = response
        .filter(
          (item) =>
            item.active === true &&
            item.language === lge &&
            item.active === true
        )
        .sort((a, b) => a.display_order - b.display_order);
      setCategories(filteredResponse);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // message.error("Failed to load categories.");
    }
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  const onClose = () => {
    setOpen(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault(); // Prevent form submission if in a form
      searched();
    }
  };
  const handleMouseEnter = (categoryId) => {
    clearTimeout(timeoutId);
    setHoveredCategoryId(categoryId);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setHoveredCategoryId(null), 500);
    setTimeoutId(id);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const searched = () => {
    onClose2(false);
    if (searchValue.trim() !== "") {
      setSearchValue("");
      router.push(`/search/${searchValue}`);
    }
  };
  const capitalize = (str) => {
    const mystr = str === "en" ? "nep" : "eng";
    if (!mystr) return ""; // Handle empty strings
    return mystr.charAt(0).toUpperCase() + mystr.slice(1);
  };
  const toggleLanguage = () => {
    const ln = lge === "en" ? "" : "en";
    window.open(`https://www.lokpati.com/${ln}`, "_blank");
  };
  const toggleCategory = (categoryId) => {
    setOpenCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
  };
  return (
    <div
      className={`top-0 z-50  h-[60px] w-full flex items-center px-5  ${isScrolled ? "justify-between lg:pr-5 lg:pl-[5%]" : "lg:px-10 justify-end lg:justify-between"} `}
      style={{ backgroundColor: themeColor }}
    >
      {isScrolled && (
        <div
          style={{
            // position: "absolute",
            // top: "100px",
            // left: "60px",
            height: "60px",

            backgroundColor: "white",
          }}
          className="flex items-center justify-center  hidden lg:block "
        >
          <Image
            src="/logo.png"
            className="w-100px h-[50px] hidden lg:block cursor-pointer"
            width={150}
            height={50}
            alt="logo"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      )}
      <ul
        className={`flex overflow-visible justify-end lg:justify-between  h-full items-center !font-medium !font-mukta !text-lg gap-1 ${isScrolled ? "w-[70%] ml-[20px]" : "w-[65%]"}`}
      >
        <li
          className=" hidden lg:flex "
          // onClick={scrollToTop}
        >
          <Link
            href={lge === "en" ? "/en" : "/"}
            className="hidden lg:flex items-center justify-center gap-1 text-white/90 text-[18px] hover:text-white duration-150 group"
          >
            <HomeOutlined style={{ textColor: "white", fontSize: "25px" }} />
          </Link>
        </li>
        {isScrolled && (
          <div
            style={{
              position: "absolute",
              left: "10px",
              height: "60px",
              backgroundColor: "white",
            }}
            className="flex cursor-pointer items-center justify-center top-[200px] md:top-[170px]  block lg:hidden"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src="/logo.png" width={100} height={50} alt="logo" />
          </div>
        )}
        <div className="relative flex w-full justify-evenly h-full">
          {categories.slice(0, 7).map((category, index) => (
            <React.Fragment key={category.id}>
              <li
                className="relative group hidden lg:flex h-full"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                // onClick={scrollToTop}
              >
                <Link
                  className="flex items-center justify-center gap-1 text-white text-[20px] hover:text-white duration-150"
                  href={`${url}/${category.category_name}`}
                >
                  <span className="flex items-center gap-1">
                    {category.category_name}
                    {category.category_key.length > 0 && (
                      <FaAngleDown className="ml-1" />
                    )}
                  </span>
                </Link>

                {/* Subcategories */}
                {/* Subcategories */}
                {hoveredCategoryId === category.id &&
                  category.category_key.length > 0 && (
                    <div className="absolute top-[50px] left-0 z-20 min-w-[200px] bg-blue-100 rounded-md shadow-lg mt-2">
                      <ul className="flex flex-col">
                        {category.category_key
                          .filter((subcategory) => subcategory.active === true) // Filter active subcategories
                          .map((subcategory) => (
                            <li
                              key={subcategory.id}
                              //  onClick={scrollToTop}
                            >
                              <Link
                                href={`${url}/${subcategory.category_key_name}`}
                                className="text-black/90 text-center text-[16px] hover:text-white px-2 py-1 hover:bg-[#0288d1] block"
                              >
                                {subcategory.category_key_name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
              </li>
              {/* {index === 6 && (
                <Link
                  href="/unicode-converter"
                  className="hidden lg:flex text-white h-full items-center"
                  onClick={scrollToTop}
                >
                  {lge === "en" ? <p>Market</p> : <p>Unicode Convertion</p>}
                </Link>
              )} */}
            </React.Fragment>
          ))}
        </div>
      </ul>
      <ul
        className={`flex w-auto ${isScrolled ? "justify-end" : "  justify-between gap-[20px]"}`}
      >
        {" "}
        <li>
          {" "}
          <Link
            href="/unicode-converter"
            className="hidden lg:flex text-white h-full text-[18px] items-center justify-center"
            // onClick={scrollToTop}
          >
            {lge === "en" ? <p>Market</p> : <p>UNICODE</p>}
          </Link>
        </li>
        <li>
          <div className="hidden lg:flex items-center">
            <div
              className={`relative m-2 rounded-full  ${isScrolled ? "hidden" : "flex"}  overflow-hidden  justify-center items-center h-full bg-white`}
            >
              <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search news..."
                className="w-full bg-transparent shadow px-4 pr-10 rounded-full border border-gray-400 py-1.5 font-light !text-sm"
              />
              <IoSearch
                className="absolute right-2.5 cursor-pointer"
                onClick={searched}
              />
            </div>
            {/* <Button
              className=" text-white font-bold h-[40px] w-[40px] hover:bg-green-500"
              style={{
                border: "1px solid #ccc4c4",
                borderRadius: "100%",
                backgroundColor: themeColor,
              }}
              onClick={toggleLanguage}
            >
              {capitalize(lge)}
            </Button> */}
          </div>
          <div className="flex items-center flex lg:hidden justify-center gap-4">
            {/* <Button
              className=" text-white font-bold h-[40px] w-[40px] hover:bg-green-500"
              style={{
                border: "1px solid #ccc4c4",
                borderRadius: "100%",
                backgroundColor: themeColor,
              }}
              onClick={toggleLanguage}
            >
              {capitalize(lge)}
            </Button> */}
            <SearchOutlined
              className="text-white text-xl"
              onClick={showDrawer2}
            />
            <MenuOutlined className="text-white text-xl" onClick={showDrawer} />
          </div>
        </li>
      </ul>
      <Drawer
        placement="top"
        closable={false}
        onClose={onClose2}
        open={open2}
        key="top"
        height={80}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div
            className={`relative rounded-full  flex overflow-hidden flex justify-center items-center h-full bg-white`}
          >
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search news..."
              className="w-full bg-transparent shadow px-4 pr-10 rounded-full border border-gray-400 py-1.5 font-light !text-sm"
            />
            <IoSearch
              className="absolute right-2.5 cursor-pointer"
              onClick={searched}
            />
          </div>
        </div>
      </Drawer>
      <Drawer title="" onClose={onClose} open={open}>
        <ul className="h-full flex flex-col gap-[20px]">
          <li
          // onClick={scrollToTop}
          >
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center font-bold justify-center gap-1 text-black/90 text-[22px] hover:black-white duration-150"
            >
              <HomeOutlined style={{ textColor: "white", fontSize: "25px" }} />
            </Link>
          </li>
          {categories.map((category, index) => (
            <React.Fragment key={category.id} className="">
              <li>
                <div className="flex justify-center gap-[7px]">
                  <Link
                    className="flex items-center justify-center gap-1 font-bold text-black/90 text-[22px]  duration-150"
                    href={`${url}/${category.category_name}`}
                    onClick={onClose}
                  >
                    {category.category_name}
                  </Link>{" "}
                  <span
                    className="flex items-center gap-1"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.category_key.length > 0 && (
                      <FaAngleDown
                        className="ml-1"
                        style={{ fontSize: "20px" }}
                      />
                    )}
                  </span>
                </div>
                {openCategoryId === category.id &&
                  category.category_key.length > 0 && (
                    <div className="min-w-[120px] bg-blue-100">
                      <ul className="flex flex-col items-center">
                        {category.category_key.map((subcategory) => (
                          <li
                            key={subcategory.key}
                            // onClick={scrollToTop}
                          >
                            <Link
                              href={`${url}/${subcategory.category_key_name}`}
                              className="text-black/90 text-[20px] hover:text-white px-2 py-1 block"
                              onClick={onClose}
                            >
                              {subcategory.category_key_name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            </React.Fragment>
          ))}
          <li>
            <Link
              href="/unicode-converter"
              className="hidden lg:flex text-black h-full text-[18px] items-center justify-center font-bold"
              // onClick={scrollToTop}
            >
              {lge === "en" ? <p>Market</p> : <p>UNICODE</p>}
            </Link>
          </li>
        </ul>
      </Drawer>
    </div>
  );
};

export default BottomNav;

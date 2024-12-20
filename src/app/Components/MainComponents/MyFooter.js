"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "../Context/ThemeContext";
import { ArrowRightOutlined, YoutubeOutlined } from "@ant-design/icons";
import Image from "next/image";

const Footer = () => {
  const { themeColor } = useTheme();
  return (
    <>
      <div
        style={{
          width: "100%",
          // minHeight: "50vh",
          background: `linear-gradient(to bottom, #bd354e,${themeColor} )`,
        }}
      >
        <hr
          className="my-10"
          style={{ border: "none", borderTop: "2px solid #999c98" }}
        />
        <div className="h-full" style={{ width: "95%", padding: "50px auto" }}>
          <div className="grid grid-cols-4 h-full gap-[30px] sm:gap-0 py-[30px]">
            <div className="col-span-4 sm:col-span-1 text-white flex flex-col  items-center h-full">
              {/* <h2 className="text-[25px] text-white font-bold">
                लोकपाटी मिडिया प्रा.लि
              </h2> */}
              <Image src="/logo.jpg" alt="logo" width={250} height={150} />
              <h2 className="text-sm mb-[20px] mt-[5px]">
                <p>Best News Portal of Nepal,</p>
                <p> नेपालको उत्कृष्ट न्युज पोर्टल</p>
              </h2>
              <h2 className="text-[16px] text-white">
                सूचना विभाग दर्ता नं. : ९८८
              </h2>
              <h2 className="text-[16px] text-white">Anamnagar, Kathmandu</h2>
              <h2 className="text-[16px] text-white">
                (सिंहदरबारको पूर्वीगेट)
              </h2>
            </div>
            <div className="col-span-4 sm:col-span-1 flex flex-col  items-center gap-[10px]">
              <div className="flex w-full flex-col items-center">
                {" "}
                <h2 className="text-[18px] font-bold text-white">
                  प्रबन्ध निर्देशक
                </h2>
                <h2 className="text-[14px] font-bold text-[#e1e1e3]">
                  जानुका पराजुली
                </h2>
              </div>

              <div className="flex w-full flex-col items-center">
                <h2 className="text-[18px] font-bold text-white">सम्पादक</h2>
                <h2 className="text-[14px] font-bold text-[#e1e1e3]">
                  विश्वेश्वर कट्टेल
                </h2>
              </div>
              <div className="flex w-full flex-col items-center">
                <h2 className="text-[18px] font-bold text-white">प्रबन्धक</h2>
                <h2 className="text-[14px] font-bold text-[#e1e1e3]">
                  सुवोध डोटेल
                </h2>
              </div>
              <div
                className="px-[10px] py-[4px] flex justify-center items-center text-white mt-[20px] "
                style={{ border: "2px solid #e3e1e1", borderRadius: "10px" }}
              >
                <Link
                  href="/member"
                  className="text-[#082c78] hover:text-blue font-bold "
                >
                  View all <ArrowRightOutlined />
                </Link>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-1 flex flex-col  items-center gap-[10px] text-white text-[18px] text-underline">
              <Link href="/">Terms and conditions</Link>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact us</Link>
              <h2 className="text-[16px] text-white">Phone: 9863032709</h2>
              <h2 className="text-[16px] text-white">
                News: lokpatinews@gmail.com
              </h2>
              <h2 className="text-[16px] text-white">
                Market: lokpatiadd@gmail.com
              </h2>
            </div>
            <div className="col-span-4 sm:col-span-1 flex flex-col  items-center gap-2">
              <h2 className="text-[30px] text-white">Follow Us</h2>
              <div className="flex justify-center flex-col gap-[20px]">
                <div className="flex gap-[20px]">
                  <span className="">
                    <a
                      href="https://www.facebook.com/lokpationline"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                      className="w-12 h-12 bg-blue-600 overflow-hidden from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center shadow-md"
                    >
                      {/* <ion-icon
                        name="logo-instagram"
                        style={{
                          color: "white",
                        }}
                        className="text-3xl p-2 rounded-full"
                      /> */}
                      <Image
                        src="/fb.png"
                        alt="Facebook"
                        width={24}
                        height={24}
                        className="w-12 h-12 "
                        style={{ borderRadius: "100%", scale: "1.1" }}
                      />
                    </a>
                  </span>

                  {/* Instagram Icon */}
                  <span className="">
                    <a
                      href="https://www.instagram.com/lokpatinews/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                      className="w-12 h-12 bg-gradient-to-r overflow-hidden from-pink-500 to-yellow-500 text-white rounded-full flex items-center justify-center shadow-md"
                    >
                      {/* <ion-icon
                        name="logo-instagram"
                        style={{
                          color: "white",
                        }}
                        className="text-3xl p-2 rounded-full"
                      /> */}
                      <Image
                        src="/insta.jpg"
                        alt="Instagram"
                        width={24}
                        height={24}
                        className="w-12 h-12 "
                        style={{ borderRadius: "100%", scale: "1.1" }}
                      />
                    </a>
                  </span>
                </div>
                <div className="flex gap-[20px]">
                  <span className="">
                    <a
                      href="https://x.com/lokpatimedia"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          fill="currentColor"
                          d="M9.333 6.929L14.546 1H13.31L8.783 6.147L5.169 1H1l5.466 7.783L1 15h1.235l4.779-5.436L10.83 15H15zM7.641 8.852l-.554-.776L2.68 1.911h1.898l3.557 4.977l.552.776l4.623 6.47h-1.897z"
                        />
                      </svg>
                    </a>
                  </span>

                  {/* YouTube Icon */}
                  <span className="flex items-center justify-center">
                    <a
                      href="https://www.youtube.com/channel/UCWyvMjBZ5h4dG6_pKJBInYg"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                      className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <YoutubeOutlined className="text-3xl" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #ebebfa" }} />
      <div
        style={{
          height: "70px",
          width: "100%",
          marginTop: "0", // Ensure no gap
          backgroundColor: `${themeColor}`,
        }}
        className="flex justify-center items-center px-2 sm:px-0"
      >
        <h2 className="text-l" style={{ color: "white" }}>
          Copyright © 2024 | all rights reserved by Lokpati media
        </h2>
        <hr className="border-l-2 border-gray-300 mx-2 h-[40px] sm:h-[30px]" />
        <h2 className="text-l" style={{ color: "white" }}>
          Developed by{" "}
          <a
            href="https://tachyonwave.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Tachyonwave
          </a>
        </h2>
      </div>
    </>
  );
};

export default Footer;

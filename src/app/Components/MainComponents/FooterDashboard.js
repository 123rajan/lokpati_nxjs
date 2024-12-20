import React from "react";

export default function FooterDashboard() {
  return (
    <footer
      style={{ minHeight: "5vh", marginTop: "70px" }}
      className="flex items-center gap-[5px] w-full justify-center"
    >
      <div
        style={{
          height: "70px",
          width: "100%",
          // backgroundColor: "#2d5e29",
          marginTop: "50px",
          height: "70px",
          width: "100%",
          marginTop: "0", // Ensure no gap
          // backgroundColor: `${themeColor}`,
        }}
        className="flex justify-center items-center px-2 sm:px-0"
      >
        <h2 className="text-l" style={{ color: "black" }}>
          Copyright © 2024 | all rights reserved by Lokpati media
        </h2>
        <hr className="border-l-2 border-gray-800 mx-2 h-[40px] sm:h-[30px]" />
        <h2 className="text-l" style={{ color: "black" }}>
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
    </footer>
  );
}

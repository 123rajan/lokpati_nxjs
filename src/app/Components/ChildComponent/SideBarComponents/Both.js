"use client";
import React, { useState } from "react";
import TajaSamachar from "./TajaSamachar";
import TrendingNews from "./TrendingNews";

export default function Both() {
  const [choose, setChoose] = useState(0);

  const tajaClick = () => setChoose(0);
  const trendingClick = () => setChoose(1);

  return (
    <div className="w-full">
      <div className="w-full flex mt-8 mb-[20px]">
        <div
          className={`w-1/2 text-white cursor-pointer py-2 ${choose === 0 ? "bg-red-600" : "bg-red-500"}`}
          onClick={tajaClick}
          role="button"
          tabIndex="0"
        >
          <h2 className="w-full text-center font-bold">ताजा समाचार</h2>
        </div>
        <div
          className={`w-1/2 text-white cursor-pointer py-2 ${choose === 1 ? "bg-blue-600" : "bg-blue-500"}`}
          onClick={trendingClick}
          role="button"
          tabIndex="0"
        >
          <h2 className="w-full text-center font-bold">लोकप्रिय</h2>
        </div>
      </div>
      <div className="w-full">
        {choose === 0 ? (
          <TajaSamachar myBreadcrumb={false} />
        ) : (
          <TrendingNews myBreadcrumb={false} />
        )}
      </div>
    </div>
  );
}

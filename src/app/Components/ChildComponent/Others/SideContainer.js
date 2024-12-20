import React from "react";
import Contact from "../Others/Contact";
import SmallAds from "../Advertisement/SmallAds";
import Pravidi from "../SideBarComponents/Pravidi";

const SideContainer = ({ mukhyaShow }) => {
  return (
    <div className="w-full flex flex-col gap-[2px] h-full">
      <SmallAds name="H_sidebar_before_followus1" />
      <SmallAds name="H_sidebar_before_followus2" />
      <div className="mt-2 w-full">
        {!mukhyaShow && (
          <>
            <h2 className="text-xl font-bold">Follow Us:</h2>
            <Contact />
          </>
        )}
        <div className="w-full flex flex-col gap-[20px]">
          <SmallAds name="H_sidebar_after_followus1" />
          <SmallAds name="H_sidebar_after_followus2" />
        </div>
      </div>
      <div className="sticky top-[60px]">
        <Pravidi />
      </div>
    </div>
  );
};

export default SideContainer;

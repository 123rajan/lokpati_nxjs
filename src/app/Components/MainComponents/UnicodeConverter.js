"use client";
import React, { useState } from "react";
import { npConverter } from "nepali-unicode"; // Import npConverter
import "./UnicodeConverter.css"; // Custom styles for fonts
import { useTheme } from "../Context/ThemeContext";

const UnicodeConverter = () => {
  // State to manage the text content
  const { bgColor } = useTheme();
  const [inputTextUnicode, setInputTextUnicode] = useState("");
  const [inputTextPreeti, setInputTextPreeti] = useState("");

  // Handle input change for Unicode input area
  const handleUnicodeChange = (e) => {
    const text = e.target.value;
    setInputTextUnicode(text);
    // Convert from Unicode to Preeti
    const convertedText = npConverter(text, "preeti");
    setInputTextPreeti(convertedText);
  };

  // Handle input change for Preeti input area
  const handlePreetiChange = (e) => {
    const text = e.target.value;
    setInputTextPreeti(text);
    // Convert from Preeti to Unicode
    const convertedText = npConverter(text, "unicode");
    setInputTextUnicode(convertedText);
  };

  return (
    <div
      className="font-switcher w-[97%] sm:w-[90%] mx-auto my-[20px]"
      style={{ bgColor: { bgColor } }}
    >
      <h1 className="text-center text-4xl font-bold mb-[20px] text-gray-800">
        युनिकोडबाट प्रीति र प्रीतिबाट युनिकोडमा फन्ट परिवर्तन गर्नुहोस।
      </h1>
      <div className="w-full flex flex-col sm:flex-row ">
        <div className="w-full sm:w-1/2">
          <h2 className="text-gray-600"> Unicode to Preeti Converter</h2>
          <iframe
            src="https://www.ashesh.com.np/unicode-preeti/linkapi.php?api=1311y6o034"
            frameBorder="0"
            scrolling="no"
            marginWidth="0"
            marginHeight="0"
            style={{
              border: "none",
              overflow: "hidden",
              width: "516px",
              height: "400px",
            }}
            allowtransparency="true"
          />
          <br />
        </div>
        <div className="w-full sm:w-1/2">
          <h2 className="text-gray-600">Preeti to Unicode Converter </h2>
          <iframe
            src="https://www.ashesh.com.np/preeti-unicode/linkapi.php?api=1311y0o264"
            frameBorder="0"
            scrolling="no"
            marginWidth="0"
            marginHeight="0"
            style={{
              border: "none",
              overflow: "hidden",
              width: "100%",
              height: "400px",
            }}
            allowtransparency="true"
          />
          <br />
        </div>
      </div>

      {/* <div className="columns w-full flex flex-col sm:flex-row gap-6">

<div className="left-column w-full sm:w-1/2 bg-blue-50 rounded-xl p-6 shadow-md">
<h2 className="font-bold text-xl text-blue-600 mb-3">Unicode</h2>
<textarea
value={inputTextUnicode}
onChange={handleUnicodeChange}
            className="input-textarea font-unicode w-full h-[200px] bg-blue-100 text-gray-800 placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-4"
            placeholder="Type here (Unicode)"
          />
        </div>


        <div className="right-column w-full sm:w-1/2 bg-pink-50 rounded-xl p-6 shadow-md">
          <h2 className="font-bold text-xl text-pink-600 mb-3">Preeti</h2>
          <textarea
            value={inputTextPreeti}
            onChange={handlePreetiChange}
            className="input-textarea font-preeti w-full h-[200px] bg-pink-100 text-gray-800 placeholder:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg p-4"
            placeholder="Type here (Preeti)"
          />
        </div>
      </div> */}
    </div>
  );
};

export default UnicodeConverter;

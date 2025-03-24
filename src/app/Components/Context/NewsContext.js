"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Get } from "../Redux/API"; // Adjust the import as necessary
import { usePathname } from "next/navigation";

// Create a Context
const NewsContext = createContext();

// Create a Provider component
export const NewsProvider = ({ children }) => {
  const [wholeNews, setWholeNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  // Function to fetch news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await Get({ url: "/public/news/get-news" });
      const filteredResponse = response
        .filter(
          (item) => item.active === true
          // && item.language === lge
        )
        .sort((a, b) => {
          // First, sort by self_date in descending order (latest date first)
          if (b.self_date !== a.self_date) {
            return new Date(b.self_date) - new Date(a.self_date); // Date comparison
          } 
          // If self_dates are the same, then sort by id in descending order
          return b.id - a.id; // ID comparison in descending order
        });
      setWholeNews(filteredResponse);
    } catch (error) {
      console.error("Error in news fetch: " + error);
      setWholeNews([]); // Reset news in case of error
    } finally {
      setLoading(false);
    }
  };

  // Fetch news on language change or component mount
  useEffect(() => {
    fetchNews(); // Fetch news every time the language changes or component mounts
  }, []); // This effect runs when 'lge' changes or on component mount

  return (
    <NewsContext.Provider value={{ wholeNews, loading, setWholeNews }}>
      {children}
    </NewsContext.Provider>
  );
};

// Custom hook for using the context
export const useNews = () => useContext(NewsContext);

"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { Get } from "../Redux/API";
import { usePathname } from "next/navigation";
// Create the context
const AdsContext = createContext();

// AdsProvider component
export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [lge, setLge] = useState(pathname.includes("/en") ? "en" : "np");

  // Fetch ads from the API
  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await Get({
          url: "/public/advertisement/get-advertisement",
        });
        const filteredResponse = response.sort((a, b) => b.id - a.id); // Sorting in descending order by id
        setAds(filteredResponse);
      } catch (error) {
        console.error("Error in ads fetch: " + error);
        setAds([]); // Reset ads in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchAds(); // Fetch ads when language or component mounts
  }, [lge]);

  return (
    <AdsContext.Provider value={{ ads, loading, setAds }}>
      {children}
    </AdsContext.Provider>
  );
};

// Custom hook to use the context
export const useAds = () => useContext(AdsContext);
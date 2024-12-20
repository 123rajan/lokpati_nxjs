import "./globals.css";
import { Suspense } from "react";
import React from "react";
import { AdsProvider } from "./Components/Context/AdsContext";
import { NavigationProvider } from "./Components/Context/NavigationContext";
import { NewsProvider } from "./Components/Context/NewsContext";
import { AuthorProvider } from "./Components/Context/AuthorContext";
import { CountProvider } from "./Components/Context/CountContext";
import { ThemeProvider } from "./Components/Context/ThemeContext";
import { NewsSearchProvider } from "./Components/Context/searchNewsContext";
import ClientSideNav from "./Components/MainComponents/ClientSideNav";
import ClientSideFooter from "./Components/MainComponents/ClientSideFooter";
import { Mukta } from "next/font/google";

const mukta = Mukta({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mukta.variable}>
      {/* <head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="https://cms.lokpati.com/media/author/favicon-lokpati.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#12801e" />
        <meta
          name="description"
          content="Lokpati offers real-time, reliable news coverage nationwide."
        />
        <meta property="twitter:site" content="@Lokpati" />
        <meta property="twitter:url" content="https://www.lokpati.com/" />
        <meta name="robots" content="max-image-preview:large" />
        <meta
          property="og:title"
          content="Lokpati - Best News Portal of Nepal, नेपालको उत्कृष्ट न्युज पोर्टल"
        />
        <meta
          property="og:description"
          content="Lokpati offers real-time, reliable news coverage nationwide."
        />
        <meta
          property="og:image"
          content="https://cms.lokpati.com/media/author/favicon-lokpati.png"
        />
        <meta property="fb:app_id" content="1090711906078716" />
        <meta property="og:url" content="https://lokpati.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="KrishiSanjal - Empowering Farmers"
        />
        <meta
          name="twitter:description"
          content="Lokpati offers real-time, reliable news coverage nationwide."
        />
        <meta
          name="twitter:image"
          content="https://cms.lokpati.com/media/author/favicon-lokpati.png"
        />
        <meta name="robots" content="index, follow" />
      </head> */}
      <body className={`${mukta.className} antialiased`}>
        <React.StrictMode>
          <NavigationProvider>
            <AdsProvider>
              <AuthorProvider>
                <CountProvider>
                  <ThemeProvider>
                    <NewsSearchProvider>
                      <NewsProvider>
                        <div className="sticky top-[-201px] md:top-[-171px] z-50">
                          <Suspense fallback={<div>Loading...</div>}>
                            <ClientSideNav />
                          </Suspense>
                        </div>
                        <div>{children}</div>
                        <Suspense fallback={<div>Loading...</div>}>
                          <ClientSideFooter />
                        </Suspense>
                      </NewsProvider>
                    </NewsSearchProvider>
                  </ThemeProvider>
                </CountProvider>
              </AuthorProvider>
            </AdsProvider>
          </NavigationProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}

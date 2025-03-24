import React from "react";
import Story from "../../../../../Components/MainComponents/Story";
import { Mukta } from "next/font/google";
import { notFound } from "next/navigation";

// Importing Mukta font from Google Fonts
const mukta = Mukta({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
});

const fetchPost = async (postId) => {
  const response = await fetch(
    `https://cms.lokpati.com/lokpati_cms/api/v1/public/news/get-news/${postId}`,
    { method: "GET", cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};
const extractFirstParagraph = (htmlString) => {
  const match = htmlString.match(/<p>(.*?)<\/p>/);
  return match ? match[1].trim() : null;
};
const generateKeywords = (newsTitle) => {
  // Basic example of extracting words from the title
  const words = newsTitle.split(" "); // Split the title into words
  const keywords = words.join(", "); // Join words with commas to make a string
  return keywords;
};

export async function generateMetadata({ params }) {
  const { year, month, day, newsId } = params;
  const fullUrl = `https://lokpati.com/story/${year}/${month}/${day}/${newsId}`;

  let post;
  try {
    post = await fetchPost(newsId);
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching the news article.",
    };
  }
  // Handle the case where post is not found
  if (!post) {
    return {
      title:
        "Lokpati - Best News Portal of Nepal, नेपालको उत्कृष्ट न्युज पोर्टल",
      description:
        "Lokpati offers real-time, reliable news coverage nationwide.",
    };
  }
  const firstParagraph = extractFirstParagraph(post.news_post);
  const ogDescription = firstParagraph || post.news_title;
  return {
    title: post.news_title,
    description: ogDescription, // You can adjust this as needed
    icons: {
      icon: "https://cms.lokpati.com/media/author/favicon-lokpati.png",
    },
    openGraph: {
      title: post.news_title,
      description: ogDescription,
      url: fullUrl,
      siteName: "Lokpati",
      images: [
        {
          url:
            post.image ||
            post.media_image ||
            "https://cms.lokpati.com/media/author/favicon-lokpati.png",
          width: 1260,
          height: 800,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post.news_title,
      description: ogDescription,
      images: [
        {
          url:
            post.image ||
            post.media_image ||
            "https://cms.lokpati.com/media/author/favicon-lokpati.png",
          width: 1260,
          height: 800,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { newsId } = params;
  let news;
  try {
    news = await fetchPost(newsId);
  } catch (error) {
    notFound();
  }

  if (!news) {
    notFound();
  }

  return (
    <div className={`${mukta.className} antialiased`}>
      <Story news={news} />
    </div>
  );
}

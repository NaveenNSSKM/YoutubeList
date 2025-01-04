"use client";
import React, { useState } from "react";
import LoginPage from "@/components/Login";
import YouTubeIntegration from "@/components/VideoList";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    console.log("Login successful, showing YouTube integration.");
    setIsLoggedIn(true);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      {isLoggedIn ? (
        <YouTubeIntegration />
      ) : (
        <LoginPage onSuccess={handleLoginSuccess} />
      )}
    </main>
  );
}

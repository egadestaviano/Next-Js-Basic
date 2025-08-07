import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (!users.find((u) => u.email === "admin@gmail.com")) {
        users.push({ email: "admin@gmail.com", password: "admin123" });
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;

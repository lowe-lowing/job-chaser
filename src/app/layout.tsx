import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn, parse } from "@/lib/utils";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job-Chaser",
  description: "Get hired or hire someone today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("dark-theme")?.value;
  const themeClass = theme ? (parse(theme) ? "dark" : "") : "dark";
  return (
    <html lang="en">
      <body className={cn(inter.className, "m-0 p-0", themeClass)}>
        <div className="container max-sm:px-2">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}

import { LoginCard } from "@/components/LoginCard";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="container flex flex-col items-center pt-20">
      <LoginCard />
    </main>
  );
}

import { RegisterCard } from "@/components/RegisterCard";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <main className="container flex flex-col items-center pt-20">
      <RegisterCard />
    </main>
  );
}

import { getSession } from "@/lib/session";
import PostJobForm from "./PostJobForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Job",
};

export default async function page() {
  const session = await getSession();

  return <PostJobForm session={session} />;
}

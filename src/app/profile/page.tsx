import { getSession } from "@/lib/session";
import React from "react";
import prisma from "@/lib/server/db";

export default async function page() {
  const session = await getSession();
  if (!session) {
    return <p>Not logged in</p>;
  }
  const applications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    include: { jobPost: true },
  });
  return (
    <main className="flex flex-col items-center">
      <h1>Profile</h1>
      <p>Welcome {session?.user?.name}</p>
      <p>Your Applications</p>
      <div className="space-y-3">
        {applications.map((application: any) => (
          <div key={application.id}>
            <p>{application.jobPost.title}</p>
            <p>{application.jobPost.company}</p>
            <p>{application.jobPost.location}</p>
            <p>{application.jobPost.salary}€</p>
            <p>{application.coverLetter}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

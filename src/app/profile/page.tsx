import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/server/db";
import { getSession } from "@/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function page() {
  const session = await getSession();
  if (!session) {
    return <p>Not logged in</p>;
  }
  const applications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    include: { jobPost: { include: { user: true, _count: { select: { jobApplications: true } } } } },
  });
  return (
    <main className="flex flex-col items-center space-y-5 mb-10">
      <p>Welcome {session?.user?.name}</p>
      <p>Your Applications:</p>
      <div className="space-y-3">
        {applications.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <CardTitle>
                {a.jobPost.title} - {a.jobPost.company}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{a.jobPost.description}</p>
              <p>Salary: {a.jobPost.salary}€</p>
              <p>
                {a.jobPost.user.name} - {a.jobPost.location}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-start">
              <p>Applicants: {a.jobPost._count.jobApplications}</p>
              <p>Your application:</p>
              <p>{a.coverLetter}</p>
              <p>Status: {a.status}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
// TODO: A "Your jobs" page that shows the job posts created by the user.
// and lets the user edit or delete them. and lets the user set status of applications.

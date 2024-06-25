import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/server/db";
import { getSession } from "@/lib/session";
import Link from "next/link";
import ApplyForm from "./ApplyForm";

export default async function page({ params }: { params: { jobId: string } }) {
  const jobId = parseInt(params.jobId);
  const job = await prisma.jobPost.findUnique({
    where: { id: jobId },
    include: {
      user: true,
      _count: { select: { jobApplications: true } },
    },
  });

  if (!job) {
    return <p>Job not found</p>;
  }
  const {
    title,
    description,
    company,
    location,
    salary,
    user,
    _count: { jobApplications },
  } = job;

  const session = await getSession();

  const application = session
    ? await prisma.jobApplication.findFirst({
        where: {
          jobPostId: jobId,
          userId: session.user.id,
        },
      })
    : null;

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>
            {title} - {company}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>{description}</p>
          <p>Salary: {salary}€</p>
          <p>
            {user.name} - {location}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <p>Applicants: {jobApplications}</p>
        </CardFooter>
      </Card>
      {session ? (
        application ? (
          <div>
            <p>Your Application:</p>
            <p>{application.coverLetter}</p>
          </div>
        ) : (
          <ApplyForm jobId={jobId} session={session} />
        )
      ) : (
        <p>
          You need to be logged in to apply,{" "}
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </p>
      )}
    </div>
  );
}

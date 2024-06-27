import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/server/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import { deleteJobPost, getJobPostsByUserId } from "@/lib/server/jobPosts";

export const metadata: Metadata = {
  title: "Your Jobs",
};

export default async function page() {
  const session = await getSession();
  if (!session) {
    return <p>Not logged in</p>;
  }
  const jobPosts = await getJobPostsByUserId(session.user.id);

  return (
    <main className="flex flex-col items-center pb-10">
      <p className="mb-6">Your Jobs:</p>
      <div className="space-y-3">
        {jobPosts.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>
                {job.title} - {job.company}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{job.description}</p>
              <p>Salary: {job.salary}€</p>
              <p>
                {job.user.name} - {job.location}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-start">
              <p>Applicants: {job._count.jobApplications}</p>
              <div className="flex gap-2">
                <Link href={`/jobs/${job.id}/edit`}>
                  <Button>Edit</Button>
                </Link>
                <ConfirmDialog
                  onConfirm={async () => {
                    "use server";
                    await deleteJobPost(job.id);
                    revalidatePath("/jobs");
                  }}
                  message={"Are you sure you want to delete this job?"}
                >
                  <Button>Delete</Button>
                </ConfirmDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

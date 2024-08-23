import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { JobApplication, JobPost, User } from "@prisma/client";
import Link from "next/link";

interface JobPostCardProps {
  session: any;
  post: JobPost & {
    user: User;
    jobApplications: JobApplication[];
  };
}
export default function JobPostCard({
  session,
  post: { id, title, description, company, location, salary, user, jobApplications },
}: JobPostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title} • {company}
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
        <p>Applicants: {jobApplications.length}</p>
        {session ? (
          jobApplications.some((a) => a.userId === session.user.id) ? (
            <p className="text-muted-foreground">You have already applied</p>
          ) : (
            <Link href={`/jobs/${id}/apply`}>
              <Button>Apply</Button>
            </Link>
          )
        ) : (
          <p className="text-muted-foreground">Sign in to apply</p>
        )}
      </CardFooter>
    </Card>
  );
}

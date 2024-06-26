"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Status } from "@prisma/client";

interface ApplyProps {
  coverLetter: string;
  jobPostId: number;
  userId: number;
}

export async function apply({ coverLetter, jobPostId, userId }: ApplyProps) {
  const newApplication = await prisma.jobApplication.create({
    data: {
      coverLetter,
      jobPostId,
      userId,
    },
  });
  revalidatePath(`/jobs/${jobPostId}/apply`);
  return newApplication;
}

interface UpdateApplicationProps {
  applicationId: number;
  status: string;
}

export async function updateApplication({ applicationId, status }: UpdateApplicationProps) {
  const updatedApplication = await prisma.jobApplication.update({
    where: { id: applicationId },
    data: { status: status as Status },
  });
  revalidatePath(`/jobs/${updatedApplication.jobPostId}/edit`);
  return updatedApplication;
}

"use server";
import { JobPost } from "@prisma/client";
import prisma from "./db";

interface CreateJobPostProps {
  jobPost: Omit<JobPost, "id" | "userId">;
  userId: number;
}

export async function createJobPost({
  userId,
  jobPost: { title, description, company, location, salary },
}: CreateJobPostProps) {
  return await prisma.jobPost.create({
    data: {
      title,
      description,
      company,
      location,
      salary,
      userId,
    },
  });
}

interface UpdateJobPostProps {
  jobPost: Omit<JobPost, "id" | "userId">;
  jobId: number;
}

export async function updateJobPost({
  jobId,
  jobPost: { title, description, company, location, salary },
}: UpdateJobPostProps) {
  return await prisma.jobPost.update({
    where: { id: jobId },
    data: {
      title,
      description,
      company,
      location,
      salary,
    },
  });
}

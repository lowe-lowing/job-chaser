"use server";
import { JobPost } from "@prisma/client";
import prisma from "./db";
import { revalidatePath } from "next/cache";

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

interface SearchJobPostsProps {
  query: string | undefined;
  offset: number;
  limit: number;
}

export async function searchJobPosts({ limit, offset, query }: SearchJobPostsProps) {
  const posts = await prisma.jobPost.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
    include: {
      user: true,
      jobApplications: true,
    },
    skip: offset,
    take: limit,
  });
  const totalCount = await prisma.jobPost.count({
    where: { title: { contains: query, mode: "insensitive" } },
  });
  return { posts, totalCount };
}

export async function getJobById(jobId: number) {
  return await prisma.jobPost.findUnique({
    where: { id: jobId },
    include: {
      user: true,
      jobApplications: { include: { user: true } },
    },
  });
}

export async function getJobPostsByUserId(userId: number) {
  return await prisma.jobPost.findMany({
    where: { userId },
    include: { user: true, _count: { select: { jobApplications: true } } },
  });
}

export async function deleteJobPost(jobId: number) {
  await prisma.jobPost.delete({ where: { id: jobId } });
}

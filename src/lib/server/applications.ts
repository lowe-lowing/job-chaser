"use server";
import prisma from "./db";

interface ApplyProps {
  coverLetter: string;
  jobPostId: number;
  userId: number;
}

export async function apply({ coverLetter, jobPostId, userId }: ApplyProps) {
  return await prisma.jobApplication.create({
    data: {
      coverLetter,
      jobPostId,
      userId,
    },
  });
}

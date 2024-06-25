import JobPostCard from "@/components/JobPostCard";
import prisma from "@/lib/server/db";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  const posts = await prisma.jobPost.findMany({
    include: {
      user: true,
      _count: { select: { jobApplications: true } },
    },
  });

  return (
    <main className="flex flex-col items-center">
      <h1>Home</h1>
      <p className="mb-10">Welcome to the home page</p>
      <div className="space-y-3">
        {posts.map((post) => (
          <JobPostCard key={post.id} post={post} session={session} />
        ))}
      </div>
    </main>
  );
}

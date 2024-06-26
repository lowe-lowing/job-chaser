import JobPostCard from "@/components/JobPostCard";
import PaginationComponent from "@/components/PaginationComponent";
import SearchForm from "@/components/SearchForm";
import prisma from "@/lib/server/db";
import { getSession } from "@/lib/session";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const session = await getSession();
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const query = searchParams?.query;
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

  return (
    <main className="flex flex-col items-center pb-10">
      <SearchForm />
      <Suspense key={currentPage} fallback={<p>Loading...</p>}>
        <div className="space-y-3 mb-6 w-full">
          {posts.map((post) => (
            <JobPostCard key={post.id} post={post} session={session} />
          ))}
        </div>
      </Suspense>
      <PaginationComponent itemCount={totalCount} pageSize={limit} currentPage={currentPage} />
    </main>
  );
}

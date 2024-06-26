import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/server/db";
import { getSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import EditForm from "./EditForm";
import SelectStatus from "./SelectStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Job Post",
};

export default async function page({ params }: { params: { jobId: string } }) {
  const session = await getSession();
  const jobId = parseInt(params.jobId);
  const job = await prisma.jobPost.findUnique({
    where: { id: jobId },
    include: {
      user: true,
      jobApplications: { include: { user: true } },
    },
  });
  if (!session || session.user.id !== job?.userId) {
    return <p>Not allowed</p>;
  }
  return (
    <div className="py-6">
      <EditForm job={job} />
      <h2 className="text-xl mt-10">Applications</h2>
      <div className="space-y-8 mt-6">
        {job?.jobApplications.map((a) => (
          <div key={a.id} className="space-y-2">
            <p>{a.user.name}</p>
            <p>{a.user.email}</p>
            <p>{a.coverLetter}</p>
            <SelectStatus applicationId={a.id} currentStatus={a.status} />
            <Badge
              className={cn({ "bg-green-400": a.status === "HIRED" })}
              variant={a.status === "REJECTED" ? "destructive" : "default"}
            >
              {a.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

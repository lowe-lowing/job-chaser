"use client";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateJobPost } from "@/lib/server/jobPosts";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  formData: null,
};

interface JobPostFormProps {
  job: any;
}

export default function EditForm({ job }: JobPostFormProps) {
  const onSubmit = async (_: any, payload: FormData) => {
    const title = payload.get("title") as string;
    const description = payload.get("description") as string;
    const company = payload.get("company") as string;
    const location = payload.get("location") as string;
    const salary = payload.get("salary") as string;
    if (!title || !description || !company || !location || !salary) {
      return {
        message: "All fields are required",
        formData: null,
      };
    }
    if (isNaN(parseInt(salary))) {
      return {
        message: "Salary must be a number",
        formData: null,
      };
    }
    const updatedJob = await updateJobPost({
      jobId: job.id,
      jobPost: { title, description, company, location, salary: parseInt(salary) },
    });
    if (!updatedJob) {
      return {
        message: "Failed to update job",
        formData: null,
      };
    }
    return {
      message: "Job updated successfully",
      formData: null,
    };
  };

  const [state, formAction] = useFormState(onSubmit, initialState);

  return (
    <form action={formAction}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Title" defaultValue={job.title} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Description" defaultValue={job.description} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Company" defaultValue={job.company} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="Location" defaultValue={job.location} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="salary">Salary</Label>
          <Input id="salary" name="salary" placeholder="Salary" defaultValue={job.salary} />
        </div>
        <FormButton type="submit">Update</FormButton>
        {state.message && <p>{state.message}</p>}
      </div>
    </form>
  );
}

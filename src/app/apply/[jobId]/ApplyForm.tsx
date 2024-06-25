"use client";
import FormButton from "@/components/FormButton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apply } from "@/lib/server/applications";
import prisma from "@/lib/server/db";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  formData: null,
};

interface ApplyFormProps {
  jobId: number;
  session: any;
}

export default function ApplyForm({ jobId, session }: ApplyFormProps) {
  const onSubmit = async (_: any, payload: FormData) => {
    const coverLetter = payload.get("letter") as string;
    const application = await apply({
      coverLetter,
      jobPostId: jobId,
      userId: session.user.id,
    });
    if (!application) {
      return {
        message: "Failed to apply",
        formData: null,
      };
    }
    return {
      message: "Applied successfully",
      formData: null,
    };
  };

  const [state, formAction] = useFormState(onSubmit, initialState);

  return (
    <form action={formAction}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="letter">Cover letter</Label>
          <Textarea id="letter" name="letter" placeholder="Cover letter" />
        </div>
        <FormButton type="submit">Apply</FormButton>
        {state.message && <p>{state.message}</p>}
      </div>
    </form>
  );
}

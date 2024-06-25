"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import FormButton from "./FormButton";
import { createUser } from "@/lib/server/users";
import Link from "next/link";

const initialState = {
  message: "",
  formData: null,
};

export function RegisterCard() {
  const onSubmit = async (_: any, payload: FormData) => {
    const name = payload.get("fullname") as string;
    const email = payload.get("email") as string;
    const password = payload.get("password") as string;
    return await createUser({ name, email, password });
  };
  const [state, formAction] = useFormState(onSubmit, initialState);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="registerForm" action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="fullname" placeholder="Full name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Email address" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <FormButton type="submit" form="registerForm">
          Register
        </FormButton>
        {state.message && <p>{state.message}</p>}
        <p>
          Already have an account?{" "}
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import FormButton from "./FormButton";
import Link from "next/link";
import { login } from "@/lib/session";
import { redirect } from "next/navigation";

const initialState = {
  message: "",
  formData: null,
};

export function LoginCard() {
  const onSubmit = async (_: any, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await login(email, password);
    if (!res)
      return {
        message: "Invalid credentials",
        formData: null,
      };
    redirect("/profile");
  };
  const [state, formAction] = useFormState(onSubmit, initialState);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="loginForm" action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Email address" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <FormButton type="submit" form="loginForm">
          Login
        </FormButton>
        {state.message && <p>{state.message}</p>}
        <p>
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500" href="/register">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

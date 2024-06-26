"use client";
import React from "react";
import { useFormState } from "react-dom";
import FormButton from "./FormButton";
import { Input } from "./ui/input";
import { redirect } from "next/navigation";

let initialState: any;

export default function SearchForm() {
  const onSubmit = async (_: any, payload: FormData) => {
    const query = payload.get("query") as string;
    redirect(`/?query=${query}&page=1`);
  };
  const [state, formAction] = useFormState(onSubmit, initialState);
  return (
    <form className="mb-10 flex w-full max-w-sm items-center space-x-2" action={formAction}>
      <Input name="query" type="text" placeholder="Search Jobs" />
      <FormButton type="submit">Search</FormButton>
    </form>
  );
}

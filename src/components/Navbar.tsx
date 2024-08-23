import { getSession, logout } from "@/lib/session";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import NavbarThemeToggle from "./NavbarThemeToggle";
import { cookies } from "next/headers";
import { parse } from "@/lib/utils";

export default async function Navbar() {
  const session = await getSession();
  const nameExists = !!session?.user.name && session?.user.name.length > 5;

  const theme = cookies().get("dark-theme")?.value;

  return (
    <nav className="flex items-center justify-between py-2 transition-all duration-300">
      <div className="flex gap-3">
        <h1 className="font-semibold cursor-pointer hover:opacity-75 transition-hover">
          <Link href="/">Job-Chaser</Link>
        </h1>
        {session && (
          <>
            <h1 className="cursor-pointer hover:opacity-75 transition-hover">
              <Link href="/jobs/create">Post Job</Link>
            </h1>
            <h1 className="cursor-pointer hover:opacity-75 transition-hover">
              <Link href="/jobs">Your Jobs</Link>
            </h1>
          </>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <NavbarThemeToggle initial={theme ? parse(theme) : true} />
        {session ? (
          <>
            <Link href="/profile">
              <Avatar>
                <AvatarFallback>
                  {nameExists
                    ? session.user.name
                        ?.split(" ")
                        .map((word: string) => word[0].toUpperCase())
                        .join("")
                    : "~"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/");
              }}
            >
              <Button type="submit">Logout</Button>
            </form>
          </>
        ) : (
          <Link href="/login">
            <Button variant={"outline"}>Sign in</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

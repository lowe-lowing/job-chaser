"use client";
import { Moon, Sun } from "lucide-react";
import { type FC } from "react";
import { Button } from "./ui/button";
import useDarkMode from "@/lib/useDarkMode";

interface Props {
  initial: boolean;
}

const NavbarThemeToggle: FC<Props> = ({ initial }) => {
  const [enabled, setEnabled] = useDarkMode(initial);

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => {
        setEnabled(!enabled);
      }}
    >
      {enabled ? (
        <Sun className="h-8 w-8 sm:h-6 sm:w-6" />
      ) : (
        <Moon className="h-8 w-8 sm:h-6 sm:w-6" />
      )}
    </Button>
  );
};

export default NavbarThemeToggle;

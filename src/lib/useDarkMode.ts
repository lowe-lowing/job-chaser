import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useDarkMode = (initial: boolean) => {
  const [enabled, setEnabled] = useState(initial);

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    enabled ? bodyClass.add(className) : bodyClass.remove(className);
    enabled
      ? setCookie("dark-theme", "true")
      : setCookie("dark-theme", "false");
  }, [enabled]);

  return [enabled, setEnabled] as const;
};

export default useDarkMode;

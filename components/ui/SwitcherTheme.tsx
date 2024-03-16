"use client";
import { useThemeStore } from "@/store/theme";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { Button } from "./button";

const SwitcherTheme = () => {
  const { toggleDarkMode } = useThemeStore();
  const { darkMode } = useThemeStore();

  return (
    <div className="flex items-center gap-x-2 text-primary dark:text-white">
      <Button variant={'default'} className="text-white" size='sm' onClick={toggleDarkMode}>
        {darkMode ? <IoMdSunny></IoMdSunny> : <IoMoon></IoMoon>}
      </Button>
    </div>
  );
};

export default SwitcherTheme;

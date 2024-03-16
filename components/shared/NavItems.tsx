"use client";
import { headerLinks } from "@/constants";
import { useThemeStore } from "@/store/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const { darkMode } = useThemeStore();
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500 text-xl dark:text-primary-500 font-semibold"
            } 
          ${darkMode ? "text-white" : "text-grey-600"}
          
          flex-center p-medium-16 whitespace-nowrap hover:opacity-70 transition-all`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;

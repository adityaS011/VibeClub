"use client";
import { useThemeStore } from "@/store/theme";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { darkMode } = useThemeStore();
  return (
    <footer className="border-t bg-primary-50 dark:bg-[#000114] dark:border-primary">
      <div className="flex-center wrapper flex-col flex-between gap-4 p-5 text-center sm:flex-row">
        <Link href={"/"} className="flex ">
          {darkMode ? (
            <Image
              src="/assets/icons/logo-dark.png"
              alt="VibeClub"
              width={80}
      height={10}
            />
          ) : (
            <Image
              src="/assets/icons/logo.png"
              alt="VibeClub"
              width={80}
      height={10}
            />
          )}
        </Link>
        <p className="p-medium-16 dark:text-white">
          &copy; 2024 PlanIT. All rights reserved.{" "}
        </p>
        <p className="p-medium-16 dark:text-white">
          Coded by{" "}
          <Link
            href="https://github.com/adityaS011"
            target="_blank"
            className="text-primary-500 font-semibold underline"
          >
            Aditya SIngh
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

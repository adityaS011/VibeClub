"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import SwitcherTheme from "../ui/SwitcherTheme";
import { useThemeStore } from "@/store/theme";
import { MotionHeader } from "./animated/MotionHeader";

const Header = () => {
  const { darkMode } = useThemeStore();

  return (
    <MotionHeader
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ delay: 0.5 }}
      className="w-full border-b dark:border-primary-500"
    >
      <div className="wrapper flex items-center w-0 justify-between">
      <Link rel="stylesheet" href="/">
  {darkMode ? (
    <Image
      src="/assets/icons/logo-dark.png"
      alt="VibeClub"
      width={80}
      height={10}
      className="p-0 m-0" // Add m-0 class here
    />
  ) : (
    <Image
      src="/assets/icons/logo.png"
      alt="VibeClub"
      width={80}
      height={10}
      className="p-0 m-0" // Add m-0 class here
    />
  )}
</Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex w-32 gap-x-4 justify-end items-center">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size={"lg"}>
              <Link href="/sign-in" className="dark:text-white">
                Login
              </Link>
            </Button>
          </SignedOut>
          <SwitcherTheme />
        </div>
      </div>
    </MotionHeader>
  );
};

export default Header;

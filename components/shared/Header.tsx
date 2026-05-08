"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import SwitcherTheme from "../ui/SwitcherTheme";
import { useThemeStore } from "@/store/theme";
import ScrollAwareHeader from "./ScrollAwareHeader";

const Header = () => {
  const { darkMode } = useThemeStore();

  return (
    <ScrollAwareHeader>
      <div className="wrapper flex items-center w-full justify-between py-3">
        <Link href="/">
          <Image
            src={darkMode ? "/assets/icons/logo-dark.png" : "/assets/icons/logo.png"}
            alt="VibeClub"
            width={80}
            height={24}
            style={{ height: "auto" }}
            className="p-0 m-0"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex gap-x-3 items-center">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full hidden sm:flex" size="lg">
              <Link href="/sign-in" className="dark:text-white">
                Login
              </Link>
            </Button>
            <MobileNav />
          </SignedOut>
          <SwitcherTheme />
        </div>
      </div>
    </ScrollAwareHeader>
  );
};

export default Header;

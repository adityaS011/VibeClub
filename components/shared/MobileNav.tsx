"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { useThemeStore } from "@/store/theme";
import { Button, buttonVariants } from "../ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const { darkMode } = useThemeStore();

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle" aria-label="Open menu">
          <Menu
            className={`h-6 w-6 ${darkMode ? "text-white" : "text-grey-600"}`}
          />
        </SheetTrigger>
        <SheetContent
          className={cn(
            "flex flex-col gap-5 md:hidden",
            darkMode ? "bg-[#040D12] border-slate-800" : "bg-white"
          )}
        >
          {/* Logo */}
          <SheetClose asChild>
            <Link href="/" className="w-fit">
              <Image
                src={darkMode ? "/assets/icons/logo-dark.png" : "/assets/icons/logo.png"}
                alt="VibeClub"
                width={80}
                height={24}
                style={{ height: "auto" }}
              />
            </Link>
          </SheetClose>

          <Separator className={darkMode ? "bg-slate-700" : ""} />

          {/* Nav links — only show for signed-in users */}
          <SignedIn>
            <SheetClose asChild>
              <div>
                <NavItems />
              </div>
            </SheetClose>
          </SignedIn>

          {/* Auth CTA for signed-out users */}
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "button dark:text-white w-full"
                  )}
                >
                  Sign In
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "button dark:border-slate-600 dark:text-white w-full"
                  )}
                >
                  Create Account
                </Link>
              </SheetClose>
            </div>
          </SignedOut>

          <div className="mt-auto">
            <Separator className={`mb-4 ${darkMode ? "bg-slate-700" : ""}`} />
            <SheetClose asChild>
              <Button
                variant="ghost"
                className={`w-full ${darkMode ? "text-slate-400 hover:text-white" : "text-grey-500"}`}
              >
                Close Menu
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

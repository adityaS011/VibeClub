"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { useThemeStore } from "@/store/theme";
import { Button } from "../ui/button";

const MobileNav = () => {
  const { darkMode } = useThemeStore();
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          {darkMode ? (
            <Image
              src={"/assets/icons/menu-white.svg"}
              alt="VibeClub"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={"/assets/icons/menu.svg"}
              alt="VibeClub"
              width={24}
              height={24}
            />
          )}
        </SheetTrigger>
        <SheetContent
          className={
            darkMode
              ? "bg-[#040D12]  flex flex-col gap-6 md:hidden"
              : " bg-white flex flex-col gap-6 md:hidden"
          }
        >
         {
          darkMode ? (
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
          )
         }
          <Separator />
          <NavItems />
          <SheetClose asChild>
            <Button className="p-medium-16 dark:text-white">Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

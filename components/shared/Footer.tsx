"use client";
import { useThemeStore } from "@/store/theme";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Browse Events", href: "/#events" },
      { label: "Create Event", href: "/events/create" },
      { label: "My Profile", href: "/profile" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Careers", href: "/" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
];

const socials = [
  { icon: Github, href: "https://github.com/adityaS011", label: "GitHub" },
  { icon: Twitter, href: "/", label: "Twitter" },
  { icon: Instagram, href: "/", label: "Instagram" },
  { icon: Linkedin, href: "/", label: "LinkedIn" },
];

const Footer = () => {
  const { darkMode } = useThemeStore();

  return (
    <footer className="border-t bg-white dark:bg-[#000114] dark:border-slate-800">
      <div className="wrapper py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex w-fit">
              <Image
                src={darkMode ? "/assets/icons/logo-dark.png" : "/assets/icons/logo.png"}
                alt="VibeClub"
                width={80}
                height={24}
                style={{ height: "auto" }}
              />
            </Link>
            <p className="p-regular-14 text-grey-500 dark:text-grey-400 max-w-[240px] leading-relaxed">
              The next-gen platform for hosting, discovering, and attending
              unforgettable events.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-grey-50 dark:bg-slate-800 flex items-center justify-center text-grey-500 dark:text-grey-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <h4 className="p-semibold-14 text-grey-600 dark:text-white uppercase tracking-widest text-xs">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="p-regular-14 text-grey-500 dark:text-grey-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-grey-400/20 dark:border-slate-800">
          <p className="p-regular-14 text-grey-500 dark:text-grey-400">
            &copy; 2024 VibeClub. All rights reserved.
          </p>
          <p className="p-regular-14 text-grey-500 dark:text-grey-400">
            Built by{" "}
            <Link
              href="https://github.com/adityaS011"
              target="_blank"
              className="text-primary-500 font-semibold hover:underline"
            >
              Aditya Singh
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

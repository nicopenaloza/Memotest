"use client";

import { NavbarLinks } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import NavbarItem from "./navbar-item";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-full bg-violet-900">
      <ul className="flex flex-row items-center px-10 h-16">
        <h1 className="text-2xl pr-10 select-none text-white font-bold">Memotest</h1>
        {NavbarLinks.map((link, index) => (
          <NavbarItem
            key={index}
            link={link}
            active={pathname == link.href}
            onClick={() => router.push(link.href)}
          />
        ))}
      </ul>
    </nav>
  );
}

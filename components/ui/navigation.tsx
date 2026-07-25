"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import me from "@/content/me.json";

import Frame from "./frame";

const Navigation = () => {
  const navigationItems = ["home", "work", "about", "connect"];
  const pathname = usePathname();

  const { firstName, lastName } = me;

  return (
    <nav className="fixed inset-x-6 bottom-6 xl:inset-x-8 xl:bottom-8 z-50 p-2 uppercase grid grid-cols-2 items-center">
      <h1 className="text-base tracking-[10%]">{firstName}.{lastName}</h1>

      <ul className="text-sm flex items-center justify-end space-x-8">
        {navigationItems.map((item) => {
          const href = item === "home" ? "/" : `/${item}`;
          const isActive = pathname === href || (item === "home" && pathname === "/");
          
          return (
            <li key={item}>
              <Link className={`frame-link ${isActive ? "active" : ""}`} href={href}>
                <Frame className="py-1.5 px-4">
                  {item}
                </Frame>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
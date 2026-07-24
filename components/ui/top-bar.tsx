"use client";

import { useEffect, useState } from "react";

import { GithubIcon, LinkedinIcon } from "../icons";

import { getLagosTime } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";

import me from "@/content/me.json";

const TopBar = () => {
  const { location } = me;

  const [time, setTime] = useState(getLagosTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(getLagosTime()), 1000)
    return () => clearInterval(interval)
  }, []);
  
  return (
    <header className="fixed inset-x-6 top-6 xl:inset-x-8 xl:top-8 z-50 p-2 max-h-8 bg-foreground text-background flex items-center justify-between">
      <div className="text-sm uppercase">
        {location.city}, {location.country}: ({location.timezone}) {time}
      </div>

      <div className="flex items-center space-x-2 xl:space-x-3">
        <a
          href={me.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Joshua Enikele's GitHub profile"
          className="top-bar-icon"
        >
          <GithubIcon />
        </a>

        <a
          href={me.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Joshua Enikele's LinkedIn profile"
          className="top-bar-icon"
        >
          <LinkedinIcon />
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopBar;
import { GithubIcon, LinkedinIcon } from "../icons";

import ThemeToggle from "./theme-toggle";

import me from "@/content/me.json";

const TopBar = () => {
  return (
    <header className="fixed inset-x-6 top-6 xl:inset-x-8 xl:top-8 z-50 p-2 max-h-8 bg-foreground text-background flex items-center justify-between">
      <h1 className="text-base font-light uppercase tracking-widest">{me.role}</h1>

      <div className="flex items-center space-x-2 xl:space-x-3">
        <a
          href={me.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Joshua Enikele's GitHub profile"
        >
          <GithubIcon />
        </a>

        <a
          href={me.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Joshua Enikele's LinkedIn profile"
        >
          <LinkedinIcon />
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopBar;
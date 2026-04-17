import { GithubIcon, LinkedinIcon } from "../icons";

import me from "@/content/me.json";

const TopBar = () => {
  return (
    <div className="p-2 w-full max-h-8 bg-foreground text-background flex items-center justify-between">
      <h1 className="text-sm font-medium uppercase">{me.role}</h1>
      <div className="flex items-center space-x-2 xl:space-x-3">
        <GithubIcon />
        <LinkedinIcon />
      </div>
    </div>
  );
};

export default TopBar;
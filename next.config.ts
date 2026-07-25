import type { NextConfig } from "next";

const sectionPaths = ["home", "work", "about", "connect"];

const nextConfig: NextConfig = {
  async rewrites() {
    return sectionPaths.map((section) => ({
      source: `/${section}`,
      destination: "/",
    }));
  },
};

export default nextConfig;

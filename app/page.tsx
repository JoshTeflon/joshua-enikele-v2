import { Hero, About, Work, Connect } from "@/components/ui";

export default function Home() {
  return (
    <main className="w-full px-6 xl:px-8">
      <Hero />
      <About />
      <Work />
      <Connect />
    </main>
  );
}

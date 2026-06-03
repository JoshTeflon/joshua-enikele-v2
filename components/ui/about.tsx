import me from "@/content/me.json";

const About = () => {
  const { tagline } = me;
  const placeholder = Array(3).fill(tagline).join(" ");

  return (
    <section className="flex min-h-screen flex-col justify-center text-center text-[clamp(2rem,6vw,4rem)] lg:text-[4rem] leading-snug lg:leading-20 tracking-wider">
      <p>{placeholder}</p>
    </section>
  );
};

export default About;

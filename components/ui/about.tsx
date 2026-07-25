import me from "@/content/me.json";

const renderRichText = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      const bold = (
        <strong key={index} className="font-semibold text-accent">
          {content}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });

const About = () => {
  const { about } = me;

  return (
    <section className="flex min-h-screen flex-col justify-center py-20 pt-24 pb-28 text-[clamp(1.8rem,5.4vw,3.6rem)] leading-[1.24] tracking-wider lg:text-[3.6rem] lg:leading-18 xl:pt-28 xl:pb-32">
      <div className="flex flex-col gap-[0.6em]">
        {about.map((paragraph) => (
          <p key={paragraph}>{renderRichText(paragraph)}</p>
        ))}
      </div>
    </section>
  );
};

export default About;

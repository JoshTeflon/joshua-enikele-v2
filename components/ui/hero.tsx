import me from "@/content/me.json";

const Hero = () => {
  const { firstName, lastName, tagline } = me;

  return (
    <section className="flex flex-1 flex-col justify-center gap-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <h2 className="self-start whitespace-nowrap font-duvel uppercase leading-[0.75] tracking-widest text-[clamp(4rem,21vw,16rem)] lg:text-[clamp(3.25rem,17vw,16rem)]">
          {firstName}
        </h2>

        <p className="max-w-96 self-start lg:self-auto text-sm lg:text-base uppercase leading-snug tracking-[0.05em]">
          {tagline}
        </p>
      </div>

      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-baseline-last lg:justify-between lg:gap-12">
        <p className="max-w-96 self-end text-right text-sm lg:self-auto lg:text-left lg:text-base uppercase leading-snug tracking-[0.05em]">
          {tagline}
        </p>

        <h2 className="self-end lg:self-auto whitespace-nowrap text-right font-duvel uppercase leading-[0.75] tracking-widest text-[clamp(4rem,21vw,16rem)] lg:text-[clamp(3.25rem,17vw,16rem)]">
          {lastName}
        </h2>
      </div>
    </section>
  );
};

export default Hero;

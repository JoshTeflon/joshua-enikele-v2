import me from "@/content/me.json";

const Hero = () => {
  const { firstName, lastName, tagline } = me;

  return (
    <section className="flex flex-1 flex-col justify-center gap-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <h2 className="self-start whitespace-nowrap font-duvel uppercase leading-[0.8] tracking-widest text-[clamp(4rem,21vw,16rem)] lg:text-[clamp(3.25rem,17vw,16rem)]">
          {firstName}
        </h2>

        <p className="max-w-[20rem] self-start text-[1rem] uppercase leading-snug tracking-[0.05em] sm:max-w-[24rem] lg:mt-6">
          {tagline}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <p className="max-w-[24rem] text-[1rem] uppercase leading-snug tracking-[0.05em]">
          {tagline}
        </p>

        <h2 className="self-end whitespace-nowrap text-right font-duvel uppercase leading-[0.8] tracking-widest text-[clamp(4rem,21vw,16rem)] lg:text-[clamp(3.25rem,17vw,16rem)]">
          {lastName}
        </h2>
      </div>
    </section>
  );
};

export default Hero;

import me from "@/content/me.json";

type LoadingScreenProps = {
  className?: string;
};

const LoadingScreen = ({ className = "" }: LoadingScreenProps) => {
  const { firstName, lastName } = me;

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground ${className}`}
    >
      <p className="text-lg font-medium uppercase tracking-[0.2em] sm:text-xl">
        {firstName} {lastName}
      </p>
      <p className="text-sm text-foreground/80">
        Loading Experience
        <span className="loading-ellipsis" aria-hidden />
      </p>
    </div>
  );
};

export default LoadingScreen;

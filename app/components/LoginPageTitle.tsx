interface LoginPageTitleProps {
  title: string;
  subtitle: string;
}

export function LoginPageTitle({ title, subtitle }: LoginPageTitleProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
        {title}
      </h1>
      <p className="text-white/80 text-lg">
        {subtitle}
      </p>
    </div>
  );
}

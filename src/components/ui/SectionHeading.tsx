type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-[color:var(--action)]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--porcelain)] sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-8 text-[color:var(--mist)]">{description}</p> : null}
    </div>
  );
}

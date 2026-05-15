type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

export default function Logo({ className = "", withWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="#2c6936" />
        <path
          d="M16 22h22a4 4 0 0 1 4 4v4h4a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V22z"
          fill="#ffffff"
          opacity="0.95"
        />
        <circle cx="42" cy="38" r="3" fill="#2c6936" />
      </svg>
      {withWordmark && (
        <span className="text-lg font-bold tracking-tight text-ink-900">
          Senda
        </span>
      )}
    </div>
  );
}

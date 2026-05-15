type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export default function Logo({ className = "h-10", variant = "dark" }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Senda"
      className={`${className} w-auto ${
        variant === "light" ? "brightness-0 invert" : ""
      }`}
    />
  );
}

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
  background?: "default" | "muted" | "primary" | "none";
}

export function Section({ 
  className, 
  children, 
  container = true,
  background = "default",
  ...props 
}: SectionProps) {
  const bgStyles = {
    default: "bg-background",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
    none: "",
  };

  return (
    <section 
      className={cn(
        "py-12 md:py-20 lg:py-24",
        bgStyles[background],
        className
      )} 
      {...props}
    >
      {container ? (
        <div className="container-custom">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

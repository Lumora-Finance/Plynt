import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BracketCardProps {
  children: ReactNode;
  className?: string;
  staticBrackets?: boolean; // always-visible grey brackets (like the hero image frame)
  onClick?: () => void;
  as?: "div" | "section" | "article";
}

/**
 * BracketCard — Monad "film frame" card with corner bracket hover effect.
 * On hover, purple L-shaped brackets appear on all four corners.
 * Pass staticBrackets to always show grey brackets (decorative, no interaction needed).
 */
export function BracketCard({
  children,
  className,
  staticBrackets = false,
  onClick,
  as: Tag = "div",
}: BracketCardProps) {
  return (
    <Tag
      className={cn("bracket-card", className)}
      onClick={onClick}
    >
      {/* Corner brackets */}
      <span className={cn("bracket-tl", staticBrackets && "static")} aria-hidden="true" />
      <span className={cn("bracket-tr", staticBrackets && "static")} aria-hidden="true" />
      <span className={cn("bracket-bl", staticBrackets && "static")} aria-hidden="true" />
      <span className={cn("bracket-br", staticBrackets && "static")} aria-hidden="true" />

      {children}
    </Tag>
  );
}

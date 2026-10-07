import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Base shared traits from the Monad design system
const base =
  "group relative inline-flex w-fit shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md font-mono font-medium tracking-normal whitespace-nowrap uppercase ease-out active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      // ── Primary (default) — purple CTA ──────────────────────────────────
      default: [
        "bg-[#6E54FF] text-white",
        "[background-image:radial-gradient(ellipse_50%_50%_at_50%_50%_in_oklab,#6e54ff00_0%,#ffffff1f_100%)]",
        "[box-shadow:inset_0_1px_.5px_#ffffff40,inset_0_-1px_.5px_#ffffff40,0_1px_2px_#0003,0_0_0_1px_#4f47ebe6]",
        "transition-[background-color] duration-200",
        "hover:bg-[#8270FF]",
        "active:bg-[#5740D6]",
      ],
      // ── Secondary — dark with inset shadow ──────────────────────────────
      secondary: [
        "bg-[#000000] text-[#FBFAF9]",
        "[background-image:radial-gradient(ellipse_50%_50%_at_50%_50%_in_oklab,#17171733_0%,#a3a3a329_100%)]",
        "[box-shadow:inset_0_1px_.5px_#ffffff40,inset_0_-1px_.5px_#ffffff40,0_1px_2px_#0003,0_0_0_1px_#000c]",
        "transition-[background-color,background-image,box-shadow] duration-200",
        "hover:bg-[#141414]",
        "active:bg-[#0A0A0A]",
      ],
      // ── Aliases that map to one of the two above ─────────────────────────
      outline:     [
        "bg-[#000000] text-[#FBFAF9]",
        "[background-image:radial-gradient(ellipse_50%_50%_at_50%_50%_in_oklab,#17171733_0%,#a3a3a329_100%)]",
        "[box-shadow:inset_0_1px_.5px_#ffffff40,inset_0_-1px_.5px_#ffffff40,0_1px_2px_#0003,0_0_0_1px_#000c]",
        "transition-[background-color,background-image,box-shadow] duration-200",
        "hover:bg-[#141414]",
        "active:bg-[#0A0A0A]",
      ],
      ghost:       [
        "bg-transparent text-foreground",
        "hover:bg-[#141414] hover:text-[#FBFAF9]",
        "transition-colors duration-200",
      ],
      destructive: [
        "bg-destructive text-destructive-foreground",
        "[box-shadow:inset_0_1px_.5px_#ffffff40,0_1px_2px_#0003]",
        "hover:bg-destructive/90",
        "transition-colors duration-200",
      ],
      link: "bg-transparent text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2 text-sm",
      sm:      "h-8 px-3 py-2 text-xs leading-4",
      lg:      "h-10 px-8 text-sm",
      icon:    "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };


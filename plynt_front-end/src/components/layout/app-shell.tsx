import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Bell,
  ChartNoAxesCombined,
  CircleHelp,
  CircleUserRound,
  Gift,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Repeat,
  Settings2,
  Sparkles,
  TrendingUp,
  Wallet,
  WalletCards,
  Zap,
  LogOut,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { mockUser } from "@/data/mockUsers";
import { mockWallet } from "@/data/mockWallet";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const primary = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/wallet", label: "Wallet", icon: WalletCards },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/invoices", label: "Invoices", icon: ReceiptText },
  { to: "/automations", label: "Automations", icon: Zap },
  { to: "/salary", label: "Salary", icon: TrendingUp },
  { to: "/gifts", label: "Gifts", icon: Gift },
  { to: "/recurring", label: "Recurring", icon: Repeat },
  { to: "/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
] as const;

const secondary = [
  { to: "/settings", label: "Settings", icon: Settings2 },
  { to: "/help", label: "Help", icon: CircleHelp },
] as const;

const titles: Record<string, string> = {
  dashboard: "Dashboard",
  wallet: "Wallet",
  transactions: "Transactions",
  invoices: "Invoices",
  automations: "Automations",
  salary: "Salary",
  gifts: "Gifts",
  recurring: "Recurring Payments",
  analytics: "Analytics",
  assistant: "AI Assistant",
  settings: "Settings",
  profile: "Profile",
  help: "Help",
};

function Brand() {
  return (
    <div className="flex h-16 items-center gap-3 px-5">
      <img src="/plynt_logoo.png" alt="PLYNT" className="size-11 object-contain" />
      <div>
        <p className="font-semibold leading-none">PLYNT</p>
        <p className="mt-1 text-xs text-muted-foreground">AI Financial Workspace</p>
      </div>
    </div>
  );
}

function Navigation({ close }: { close?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex h-full flex-col overflow-y-auto px-3 pb-4">
      <div className="space-y-0.5">
        {primary.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={close}
            className={cn("nav-item", path.startsWith(item.to) && "nav-item-active")}
          >
            <item.icon className="size-5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto space-y-0.5 border-t border-border pt-4">
        {secondary.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={close}
            className={cn("nav-item", path.startsWith(item.to) && "nav-item-active")}
          >
            <item.icon className="size-5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const segment = path.split("/")[1] || "dashboard";

  // Landing page: render without nav chrome
  if (path === "/") {
    return <>{children}</>;
  }

  // Mobile nav: show 5 most important routes
  const mobileNav = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/wallet", label: "Wallet", icon: WalletCards },
    { to: "/automations", label: "Automate", icon: Zap },
    { to: "/gifts", label: "Gifts", icon: Gift },
    { to: "/assistant", label: "AI", icon: Sparkles },
  ] as const;

  return (
    <div className="relative min-h-screen text-foreground bg-background">
      {/* ── Backdrop ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          maskImage: "linear-gradient(to right, transparent 0, #000 min(300px, 32%), #000 calc(100% - min(300px, 32%)), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 min(300px, 32%), #000 calc(100% - min(300px, 32%)), transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0, #000 min(380px, 45%))",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 min(380px, 45%))",
          }}
        >
          {/* Radial gradient base — dark vs light */}
          <div
            className="absolute inset-0 isolate dark:block hidden"
            style={{
              backgroundImage: "radial-gradient(ellipse 2003.55px 741.89px at 50% calc(100% - 354.135px + 25%), rgb(20, 22, 36) 0%, rgb(13, 14, 21) 37.26%, rgb(8, 11, 14) 55.89%, rgb(5, 7, 6) 74.52%)",
            }}
          >
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                backgroundImage: "url(/banner-noise.webp)",
                backgroundSize: "180px auto",
                backgroundPosition: "0 100%",
                opacity: 0.8,
              }}
            />
          </div>
          <div
            className="absolute inset-0 isolate dark:hidden block"
            style={{
              backgroundImage: "radial-gradient(ellipse 2003.55px 741.89px at 50% calc(100% - 354.135px + 25%), rgb(225, 222, 255) 0%, rgb(235, 232, 255) 37.26%, rgb(244, 244, 248) 55.89%, rgb(244, 244, 248) 74.52%)",
            }}
          >
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                backgroundImage: "url(/banner-noise.webp)",
                backgroundSize: "180px auto",
                backgroundPosition: "0 100%",
                opacity: 0.3,
              }}
            />
          </div>
          {/* Grid lines — darker in light mode */}
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.07) 0 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 0 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              backgroundPosition: "0 100%",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.09) 0 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 0 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              backgroundPosition: "0 100%",
              opacity: 0.2,
            }}
          />
        </div>
      </div>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <Brand />
        <Navigation />
      </aside>

      <div className="relative z-10 lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open navigation" className="min-h-11 min-w-11 lg:hidden">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>Open navigation</TooltipContent>
              </Tooltip>
              <SheetContent side="left" className="flex w-72 flex-col p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Navigate PLYNT</SheetDescription>
                </SheetHeader>
                <Brand />
                <Navigation close={() => setMenuOpen(false)} />
              </SheetContent>
            </Sheet>
            <h2 className="text-base font-semibold md:text-lg">{titles[segment] ?? "PLYNT"}</h2>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                  className="relative min-h-11 min-w-11"
                  onClick={() => toast("You're all caught up", { description: "No new wallet or invoice activity." })}
                >
                  <Bell />
                  <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <ThemeToggle />
            <Button
              variant="outline"
              className="hidden md:inline-flex"
              onClick={() => toast("Wallet connected", { description: mockWallet.network })}
            >
              <Wallet />
              <span>{mockWallet.connected ? "Connected" : "Connect wallet"}</span>
            </Button>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Profile">
                      <Avatar className="size-8">
                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                        <AvatarFallback>{mockUser.initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Profile</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">{mockUser.name}</p>
                  <p className="text-xs text-muted-foreground">@{mockUser.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile"><UserRound />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings"><Settings2 />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast("Demo session remains active")}>
                  <LogOut />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 pb-24 md:px-6 md:py-8 lg:px-8 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/95 px-2 py-1 backdrop-blur-xl lg:hidden">
        {mobileNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn("mobile-nav", path.startsWith(item.to) && "text-primary")}
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

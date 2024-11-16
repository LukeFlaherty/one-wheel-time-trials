// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Timer, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Route {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const routes: Route[] = [
  {
    label: "Runs",
    href: "/runs",
    icon: <Timer className="h-4 w-4" />,
  },
  {
    label: "Manage",
    href: "/manage",
    icon: <Settings className="h-4 w-4" />,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-50 flex justify-between items-center py-2 px-4 border-b bg-white h-16">
      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100",
                    pathname === route.href ? "bg-gray-100 text-black" : "text-gray-500"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
        <Link href="/">
      <div className="flex items-center gap-2">
        <Timer className="h-6 w-6" />
        <span className="font-bold text-xl">OneWheel Trials</span>
      </div>
        </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm flex items-center gap-2 transition-colors hover:text-black",
              pathname === route.href ? "text-black" : "text-gray-500"
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </nav>

      {/* Right section - could be used for user menu, etc. */}
      <div className="w-16 md:w-auto" />
    </div>
  );
}
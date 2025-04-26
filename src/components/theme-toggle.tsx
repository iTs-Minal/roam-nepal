"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeDropdown() {
  const { setTheme, theme } = useTheme();

  const items = [
    {
      label: "Light",
      icon: <Sun className="mr-2 h-4 w-4" />,
      value: "light",
    },
    {
      label: "Dark",
      icon: <Moon className="mr-2 h-4 w-4" />,
      value: "dark",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[80px] justify-between">
          Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="z-50">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
            className={theme === item.value ? "font-semibold" : ""}
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

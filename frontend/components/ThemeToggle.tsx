"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition"
    >

      {theme === "dark"
        ? "☀️ Light"
        : "🌙 Dark"}

    </button>
  );
}
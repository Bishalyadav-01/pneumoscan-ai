"use client";

import { Activity } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

  return (

    <nav className="w-full flex items-center justify-between py-6">

      <div className="flex items-center gap-3">

        <div className="bg-cyan-500 p-2 rounded-xl">
          <Activity size={24} />
        </div>

        <h1 className="text-2xl font-bold">
          PneumoScan AI
        </h1>

      </div>

      <div className="flex items-center gap-6">

  <div className="hidden md:flex gap-8 text-slate-300">

    <a
      href="#home"
      className="hover:text-cyan-400 transition"
    >
      Home
    </a>

    <a
      href="#dashboard"
      className="hover:text-cyan-400 transition"
    >
      Dashboard
    </a>

    <a
      href="#about"
      className="hover:text-cyan-400 transition"
    >
      About
    </a>

  </div>

  <ThemeToggle />

</div>

    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isEvaluator = pathname === "/";
  const isBenchmark = pathname === "/benchmark";

  return (
    <>
      <nav className="flex w-full items-center justify-between bg-[#002244] px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002244]"
        >
          <FlaskConical className="h-6 w-6 shrink-0" />
          <span className="text-lg font-bold">BioVerif-AI</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002244] ${
              isEvaluator
                ? "border-b-2 border-white text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Evaluator
          </Link>
          <Link
            href="/benchmark"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002244]"
          >
            <span
              className={`text-sm font-medium ${
                isBenchmark
                  ? "border-b-2 border-white text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Auto-Benchmark
            </span>
            <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
              Beta
            </span>
          </Link>
        </div>
      </nav>
      <div className="h-0.5 w-full bg-amber-400" />
    </>
  );
}

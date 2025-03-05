"use client";
import { GlowingEffect } from "./ui/glowing-effect";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export const GridItem = ({ area, icon, children }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          {children}
        </div>
      </div>
    </li>
  );
};

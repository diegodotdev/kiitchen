import Image from "next/image";
import { ReactNode } from "react";
import { Abril_Fatface } from "next/font/google";
import { cn } from "@/lib/utils";

const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full relative">
        <div className="absolute top-0 right-0 bg-black/80 w-full h-full z-50 grid place-items-center">
          <p
            className={cn(
              "text-8xl text-white opacity-10",
              abril_fatface.className
            )}
          >
            Kiitchen
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1505253668822-42074d58a7c6?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="food"
          fill
          className="object-cover"
        />
      </div>
      {children}
    </div>
  );
}

import { Abril_Fatface } from "next/font/google";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import MaxWidthWrapper from "./max-width-wrapper";
import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";

const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  return (
    <MaxWidthWrapper>
      <header className="w-full flex justify-between items-center h-[8vh]">
        <Link href="/">
          <span className={cn(abril_fatface.className, "text-4xl")}>
            Kiitchen
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {NAV_LINKS.map((i) => (
            <Link href={i.href} key={i.id}>
              <span className="">{i.label}</span>
            </Link>
          ))}

          <SignedIn>
            <>
              <Link href="/dashboard">
                <span className="">Dashboard</span>
              </Link>
              <SignOutButton>
                <Button size="sm">Logout</Button>
              </SignOutButton>
            </>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
          </SignedOut>
          <ModeToggle />
        </div>
      </header>
    </MaxWidthWrapper>
  );
}

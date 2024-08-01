import { Abril_Fatface } from "next/font/google";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const abril_fatface = Abril_Fatface({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  return (
    <header className="w-full flex justify-between items-center h-[8vh]">
      <Link href="/">
        <span className={cn(abril_fatface.className, "text-4xl")}>
          Kiitchen
        </span>
      </Link>
      <div className="flex items-center gap-8">
        <SignedIn>
          <SignOutButton>
            <button>Logout</button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button>Login</button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

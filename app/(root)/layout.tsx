import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper>
      <Nav />
      {children}
    </MaxWidthWrapper>
  );
}

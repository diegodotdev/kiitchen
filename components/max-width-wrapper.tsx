import { ReactNode } from "react";

export default function MaxWidthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-5 flex flex-col 2xl:px-0">
      {children}
    </div>
  );
}

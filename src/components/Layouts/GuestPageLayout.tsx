import { ReactNode } from "react";

export default function GuestPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen">
      {children}
    </div>
  );
}

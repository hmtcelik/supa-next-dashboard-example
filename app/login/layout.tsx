import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
        {children}
      </div>
    </div>
  );
}

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import PrelineScript from "@/components/PrelineScript";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Admin Dashboard",
  description: "Admin Dashboard to manage users and data in Next.14 + Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="h-full dark:bg-gray-900">
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
      <PrelineScript />
    </html>
  );
}

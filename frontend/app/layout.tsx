import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrbitHire | Find Work That Fits Your Ambition",
  description:
    "OrbitHire connects exceptional people with high-impact teams. Search smarter, match faster, and build a career you actually want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
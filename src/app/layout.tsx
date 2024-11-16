// app/layout.tsx

import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'OneWheel Time Trials',
  description: 'Track your OneWheel time trials',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gray-50">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
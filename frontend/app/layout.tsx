import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Writing Helper",
  description: "Practice creative writing with classical text excerpts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

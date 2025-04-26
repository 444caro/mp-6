import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OAuth App",
  description: "CS391 Mini Project 6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

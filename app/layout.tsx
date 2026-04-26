import type { Metadata } from "next";
import { Roboto_Slab, Playwrite_DE_SAS } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const playwrite = Playwrite_DE_SAS({
  variable: "--font-playwrite",
});

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${playwrite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

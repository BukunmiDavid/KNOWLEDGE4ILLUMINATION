import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Knowledge4Illumination | Leadership & Entrepreneurship Assessment",
    template: "%s | Knowledge4Illumination",
  },
  description:
    "Discover how you see opportunities, think through problems, build solutions, grow ideas, and lead people. Take the free K4I Leadership & Entrepreneurship Assessment — no account required.",
  applicationName: "Knowledge4Illumination",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Knowledge4Illumination",
    title: "Knowledge4Illumination | Leadership & Entrepreneurship Assessment",
    description:
      "Know yourself. Build your future. Take the free K4I Leadership & Entrepreneurship Assessment — no account required.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
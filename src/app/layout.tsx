import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sushovanhalder.me"),
  alternates: { canonical: "/" },
  title: "Sushovan Halder — Portfolio & Systems Lab",
  description:
    "Sushovan Halder is a Computer Science and Engineering student at RKMGEC building projects across web engineering, Linux systems, automation, and security.",
  keywords: [
    "Sushovan Halder",
    "RKMGEC",
    "Computer Science",
    "Web Engineering",
    "Linux Systems",
    "Security",
    "Automation",
  ],
  authors: [{ name: "Sushovan Halder" }],
  openGraph: {
    url: "https://sushovanhalder.me",
    title: "Sushovan Halder — Portfolio & Systems Lab",
    description:
      "CSE student at RKMGEC exploring web engineering, Linux systems, automation, and security.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F2EF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-text-primary antialiased selection:bg-accent-amber selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

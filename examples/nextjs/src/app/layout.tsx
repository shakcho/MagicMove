import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MagicMove - React View Transitions Library",
  description:
    "A lightweight React library that brings Apple Keynote's famous Magic Move transitions to the web using the native View Transitions API.",
  keywords: [
    "react",
    "view transitions",
    "animation",
    "magic move",
    "keynote",
    "ui",
    "ux",
  ],
  authors: [{ name: "MagicMove" }],
  openGraph: {
    title: "MagicMove - React View Transitions Library",
    description:
      "Apple Keynote-style Magic Move animations for React using the View Transitions API.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)]">
        {children}
      </body>
    </html>
  );
}

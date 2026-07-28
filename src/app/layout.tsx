import type { Metadata, Viewport } from "next";
import { Outfit, Noto_Sans_Gujarati } from "next/font/google";
import { Topbar } from "@/components/layout/Topbar";
import { LabBackground } from "@/components/common/LabBackground";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { siteConfig, storageKeys } from "@/lib/site";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const gujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "વિજ્ઞાન",
    "ધોરણ 6 વિજ્ઞાન",
    "Science Gujarati",
    "Gyan Academy",
    "MCQ Test",
    "આહારના ઘટકો",
    "વસ્તુઓના જૂથ બનાવવાં",
  ],
  authors: [{ name: "Gyan Academy" }],
  creator: "Gyan Academy",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before paint so theme + reader font size never flash.
 * Kept as a raw string on purpose — it must execute synchronously.
 */
const bootScript = `
(function(){
  try {
    var t = localStorage.getItem('${storageKeys.theme}');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
    var f = localStorage.getItem('${storageKeys.fontSize}');
    var sizes = ['14px','16px','18px','20px','24px'];
    var i = f ? parseInt(f, 10) : 1;
    if (isNaN(i) || i < 0 || i > 4) i = 1;
    document.documentElement.style.setProperty('--font-scale', sizes[i]);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="gu" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className={`${display.variable} ${gujarati.variable} antialiased`}>
        <LabBackground />
        <Topbar />
        <div className="min-h-[70dvh]">{children}</div>
        <ScrollToTop />
      </body>
    </html>
  );
}

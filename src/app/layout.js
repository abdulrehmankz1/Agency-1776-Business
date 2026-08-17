import { Bebas_Neue, Space_Grotesk, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GlobalChrome from "@/components/GlobalChrome";

const GA_MEASUREMENT_ID = "G-SLBJ8GTJ4S";

// Body face — Space Grotesk (variable) drives paragraphs, buttons,
// nav, form fields, and everything that isn't a heading or monospace
// spec text. Variable font, so no `weight` array needed.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Monospace face for spec labels, LED legends, and hairline metadata.
// Kept as Geist Mono — no user request to change it.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for every heading site-wide. Bebas Neue is a tall,
// condensed sans — replaces Anton SC. `display: 'swap'` renders the
// fallback immediately then swaps in Bebas Neue when ready — no FOIT,
// and next/font self-hosts + preloads so it lands on first paint
// under normal conditions.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Agency 1776 Business",
  description: "Agency 1776 Business",
};

// Pre-hydration script. Runs synchronously as the first child of <body>
// (parser reaches it before painting any content), reads the persisted
// theme from localStorage, and rewrites the <html> class + data-theme
// attribute. Since theming is purely a CSS-variable swap driven by
// class name, there is no React tree divergence between server and
// client — the class flip is invisible to hydration.
const THEME_INIT_SCRIPT = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var t = stored === 'light' ? 'light' : 'black';
    var h = document.documentElement;
    h.setAttribute('data-theme', t);
    h.classList.remove('theme-black', 'theme-light');
    h.classList.add('theme-' + t);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="black"
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${bebasNeue.variable} theme-black h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="isolate min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-background">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <GlobalChrome>{children}</GlobalChrome>
      </body>
    </html>
  );
}

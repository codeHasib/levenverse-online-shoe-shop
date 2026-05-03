import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import SplashWrapper from "@/components/SplashWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Leven Verse - Best Online Shoe Shop In Qatar",
  description:
    "Shop the latest collection of premium footwear at Leven Verse. From trending sneakers to elegant classics, enjoy fast delivery across Qatar and unbeatable quality. Step into style today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className={montserrat.className}>
        <SplashWrapper>
          {children}
        </SplashWrapper>
      </body>
    </html>
  );
}

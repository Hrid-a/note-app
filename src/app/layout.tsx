import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from 'next/font/local';
import { APP_DESCRIPTION, APP_TITLE, COLOR_THEME_COOKIE_NAME } from "@/utils/constants";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/utils/colors";
import "./globals.css";
import styles from "./layout.module.css";
import DesktopSideBar from "@/components/DesktopSideBar";
import Header from "@/components/Header";
import UpperHeader from "@/components/UpperHeader";



export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};



const monospace = localFont({
  src:'./_fonts/monospace.ttf',
  display: 'swap',
  variable:'--font-monospace'
})

type ColorTheme = 'light' | 'dark';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const savedTheme = (await cookies()).get(COLOR_THEME_COOKIE_NAME);
  const theme: ColorTheme = savedTheme?.value as (ColorTheme) ?? 'light';
  const COLORS = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html className={monospace.variable} lang="en" data-color-theme={theme} style={{...COLORS}}>
      <body>
        <div className={styles.wrapper}>
        <DesktopSideBar />
        <Header />
        <section className={styles.mobile}>
            <UpperHeader initialTheme={theme} />
            {children}
        </section>
    </div>
      </body>
    </html>
  );
}

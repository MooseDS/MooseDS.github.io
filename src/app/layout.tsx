import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "DongSeok's Portfolio",
  description:
    "개발자 이동석의 포트폴리오 및 블로그입니다. Android, Kotlin, Web 기술을 다루고 있습니다.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans", inter.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable} dark`}>
        {children}
      </body>
    </html>
  );
}

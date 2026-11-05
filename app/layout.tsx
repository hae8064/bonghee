import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({
  variable: "--font-noto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "이봉희 | 백엔드 / 클라우드 엔지니어",
  description:
    "병리 AI 분석 서비스의 백엔드를 설계하고, AWS 클라우드와 병원 서버실 On-Prem 양쪽에서 3년 넘게 운영해 왔습니다.",
  icons: { icon: "/bh_logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${noto.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

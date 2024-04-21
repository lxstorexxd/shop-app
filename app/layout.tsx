import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЛИС",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="ru">
      <body>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

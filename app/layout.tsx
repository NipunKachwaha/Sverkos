import type { Metadata } from 'next'
import { Instrument_Serif, Barlow, Geist } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import './globals.css'
import { cn } from "@/lib/utils";

import { LoadingProvider } from '@/providers/LoadingProvider'; 
import { LanguageProvider } from "@/hooks/LanguageProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sverkos | Build AI Apps at the Speed of Thought',
  description: 'Meet your personal AI software engineer. Turn simple text prompts into fully functional, production-ready full-stack web apps in seconds with Sverkos.',
  icons: {
    icon: '/sverkoslogo-removebg.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true} className={cn("dark", instrumentSerif.variable, barlow.variable, "font-sans", geist.variable)}>
        <body suppressHydrationWarning={true} className="bg-black text-white font-body antialiased">
          <LoadingProvider>
            <LanguageProvider>
              {children}  
            </LanguageProvider>
          </LoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
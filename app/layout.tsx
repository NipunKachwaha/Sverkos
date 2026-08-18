import type { Metadata } from 'next'
import { Instrument_Serif, Barlow, Geist } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import './globals.css'
import { cn } from "@/lib/utils";

import { LoadingProvider } from '@/providers/LoadingProvider';
import { LanguageProvider } from "@/hooks/LanguageProvider";
import { PageLoadTrigger } from '@/components/LoadingScreen/PageLoadTrigger'; 

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
  title: {
    default: 'Sverkos | Build AI Apps at the Speed of Light',
    template: '%s | Sverkos',
  },
  description: 'Building the software that runs the future.',
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
            <PageLoadTrigger /> 
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </LoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
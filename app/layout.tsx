import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const title = 'Elisha Keanche — Full Stack Software Developer'
const description = 'Portfolio of Elisha Keanche — Full Stack Software Developer in Nairobi, Kenya specialising in Laravel, system architecture and DevOps. 8 production platforms across 6 business domains.'

// Favicon (app/icon.svg) and share image (app/opengraph-image.png) are picked up by file convention
export const metadata: Metadata = {
  metadataBase: new URL('https://elmonel.netlify.app'),
  title,
  description,
  openGraph: { title, description, url: '/', siteName: 'Elisha Keanche', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

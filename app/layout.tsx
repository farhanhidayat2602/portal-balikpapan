import type { Metadata, Viewport } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

// next/font mengunduh & mem-bundle font saat BUILD, lalu menyajikannya dari
// domain sendiri. Jadi tidak ada request ke fonts.googleapis.com saat runtime,
// tidak ada layout shift (metrik fallback ditanam otomatis), dan tidak bocor
// referrer. `display: swap` supaya teks tampil duluan, bukan blank.
const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Portal Area Balikpapan',
  description:
    'Pusat akses aplikasi internal Area Balikpapan — pelaporan akuisisi, dashboard performa cabang, dan rekap area.',
}

// Warna address bar di HP mengikuti latar gelap halaman, supaya tidak ada
// garis putih yang memotong hero.
export const viewport: Viewport = {
  themeColor: '#050A14',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
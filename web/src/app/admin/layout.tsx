import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lorem Lojas - Fixação de conhecimento!',
  description: 'Aplicação com intuito de fixação de conhecimento fullstack',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=" flex min-h-screen">
          {/* Left */}
          <div className="relative flex overflow-hidden">
            <Sidebar />
          </div>
          {/* Right */}
          <div className="max-h-screen flex-1 overflow-y-scroll">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

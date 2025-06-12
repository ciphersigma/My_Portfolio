// app/layout.js - MUST BE EXACTLY THIS (no "use client" anywhere!)
import './globals.css'

export const metadata = {
  title: 'Prashant Chettiyar - Frontend Developer',
  description: 'Portfolio of Prashant Chettiyar, Frontend Developer specializing in React & Next.js',
  keywords: 'frontend developer, react, nextjs, javascript, web development',
  author: 'Prashant Chettiyar',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}

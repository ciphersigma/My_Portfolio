import './globals.css'

export const metadata = {
  title: 'Prashant Chettiyar - Frontend Developer',
  description: 'Portfolio of Prashant Chettiyar, Frontend Developer specializing in React & Next.js',
  keywords: 'frontend developer, react, nextjs, javascript, web development',
  author: 'Prashant Chettiyar',
}

// NEW: Separate viewport export (required in Next.js 15)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
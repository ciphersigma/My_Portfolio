// app/layout.js - Updated with Analytics
import './globals.css'
import AnalyticsProvider from '../components/AnalyticsProvider'

export const metadata = {
  title: 'Prashant Chettiyar - Frontend Developer',
  description: 'Portfolio of Prashant Chettiyar, Frontend Developer specializing in React & Next.js',
  keywords: 'frontend developer, react, nextjs, javascript, web development',
  author: 'Prashant Chettiyar',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300">
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
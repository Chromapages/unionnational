import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | Union National Tax',
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function HQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalError = console.error;
              console.error = (...args) => {
                if (typeof args[0] === 'string' && args[0].includes('disableTransition')) return;
                originalError.call(console, ...args);
              };
            `,
          }}
        />
      </head>
      <body style={{ margin: 0 }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

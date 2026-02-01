// This root layout is required by Next.js but not used directly
// All routes go through [locale]/layout.tsx which provides the actual HTML structure
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return children
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

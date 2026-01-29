import "./global.css"
import Header from "./components/Header"
import Providers from "./components/Providers"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Header />
      <main>{children}</main>
    </Providers>
  )
}

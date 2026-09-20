import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-muted text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

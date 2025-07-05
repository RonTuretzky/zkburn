import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Flame } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 text-gray-300">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-2">ZKBurn Demo</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          An interactive demonstration of the ZKBurn specification.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="bg-gray-900 border-gray-800 transition-colors hover:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-gray-200">
              <User className="mr-3 h-7 w-7" />
              John's Portal
            </CardTitle>
            <CardDescription className="text-gray-400">
              For clients (John): Use ZKPassport to generate your anonymous ID and check your burn status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/john/portal" legacyBehavior>
              <Button className="w-full bg-gray-200 text-black hover:bg-gray-300 text-lg py-6">
                Go to John's Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 transition-colors hover:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-gray-200">
              <Flame className="mr-3 h-7 w-7" /> Worker's Dashboard
            </CardTitle>
            <CardDescription className="text-gray-400">
              For service providers (Worker): Record interactions and burn a John's anonymous ID.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/worker/dashboard" legacyBehavior>
              <Button className="w-full bg-gray-200 text-black hover:bg-gray-300 text-lg py-6">
                Go to Worker's Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ZKBurn Working Group Demo.</p>
        <p>This is a conceptual demonstration and does not use a real ZKPassport SDK or a live blockchain.</p>
      </footer>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, BarChart3Icon, LockIcon, ZapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="mr-2" />
          <span className="font-bold text-xl">Luganodes Tracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-300 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-300 transition-colors" href="https://ishanaudichya.xyz">
            Developer
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ethereum Deposit Tracker
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Monitor and record ETH deposits on the Beacon Deposit Contract with unparalleled efficiency and accuracy.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/live">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    See Live Deposits
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-black/40">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <ZapIcon className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
                <p className="text-gray-300">
                  Monitor Ethereum deposits as they happen with our lightning-fast RPC integration.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <LockIcon className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Secure Monitoring</h3>
                <p className="text-gray-300">
                  Advanced error handling and logging ensure your data is always accurate and protected.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart3Icon className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Insightful Analytics</h3>
                <p className="text-gray-300">
                  Gain valuable insights with our comprehensive deposit tracking and data analysis tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="developer" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Meet the Developer
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Ishan Audichya 
                </p>
                <div className="flex space-x-4">
                  <Link href="https://github.com/ishanaudichya" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/ishan-audichya/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
                      LinkedIn
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/images/aadhar.png"
                  alt="John Doe"
                  width={300}
                  height={300}
                  className="rounded-full border-4 border-purple-400"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-black/60">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Logo" width={24} height={24} />
            <p className="text-sm text-gray-300">© 2023 Luganodes Tracker. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link className="text-sm text-gray-300 hover:text-purple-300 transition-colors" href="#terms">
              Terms of Service
            </Link>
            <Link className="text-sm text-gray-300 hover:text-purple-300 transition-colors" href="#privacy">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
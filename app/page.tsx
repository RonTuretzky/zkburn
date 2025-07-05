import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Zap, BookOpen, ArrowRight, Layers, GitFork, CuboidIcon as Cube, Award } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                ZKBurn
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/demo" legacyBehavior>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">ZKBurn Platform</h1>
          <p className="mt-4 max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl text-gray-400">
            Empowering Sex Workers with Verifiable, Anonymous Safety.
          </p>
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-400">
            ZKBurn allows clients (John) to generate a private, verifiable ID using ZKPassport. Sex workers (referred to
            as 'Worker') can then use this ID to record interactions and "burn" it if necessary, creating a trustworthy,
            anonymous safety net.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link href="/demo" legacyBehavior>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">
                Explore the Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              The Problem: A Lack of Safe, Private Accountability
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              Sex workers operate in a high-risk environment with inadequate tools to ensure their safety and hold
              dangerous clients accountable. Existing solutions are often flawed, centralized, or gated behind exclusive
              communities, leaving the majority of the industry without a reliable safety net.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Unverifiable "Bad Lists"</h3>
              <p className="text-gray-400">
                Informal blacklists are prone to hearsay, personal disputes, and manipulation. There's no way to verify
                if an interaction actually occurred, leading to a lack of trust.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Privacy Compromise</h3>
              <p className="text-gray-400">
                Centralized platforms or public forums can expose the identities of both workers and clients, leading to
                doxxing, harassment, and real-world danger.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Censorship & Deplatforming</h3>
              <p className="text-gray-400">
                Centralized services can be shut down or censored, instantly erasing valuable safety information and
                leaving the community vulnerable without warning.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Exclusive & Gated Access</h3>
              <p className="text-gray-400">
                Effective safety tools are often restricted to small, private groups, leaving independent or newer
                workers isolated and without access to crucial information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works: A Step-by-Step Guide</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {/* John's Flow */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-200 text-center">For John (The Client)</h3>
              <ol className="relative border-l border-gray-700 space-y-10 ml-4">
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full -left-4 ring-4 ring-gray-800 text-gray-300">
                    1
                  </span>
                  <h4 className="font-semibold text-lg text-white">Generate Anonymous ID</h4>
                  <p className="text-gray-400">
                    Using ZKPassport, you prove you're a real person without revealing your identity. This creates a
                    unique, anonymous `JohnID`.
                  </p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full -left-4 ring-4 ring-gray-800 text-gray-300">
                    2
                  </span>
                  <h4 className="font-semibold text-lg text-white">Authorize Interaction</h4>
                  <p className="text-gray-400">
                    You present your `JohnID` and scan the service provider's unique request code to signal your consent
                    for logging the interaction.
                  </p>
                </li>
              </ol>
            </div>
            {/* Worker's Flow */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-200 text-center">
                For the Worker (The Service Provider)
              </h3>
              <ol className="relative border-l border-gray-700 space-y-10 ml-4">
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full -left-4 ring-4 ring-gray-800 text-gray-300">
                    1
                  </span>
                  <h4 className="font-semibold text-lg text-white">Check John's ID</h4>
                  <p className="text-gray-400">
                    Before the interaction, you ask for the client's `JohnID` and perform an instant check to ensure it
                    is not already burned and to see their positive vouch count.
                  </p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full -left-4 ring-4 ring-gray-800 text-gray-300">
                    2
                  </span>
                  <h4 className="font-semibold text-lg text-white">Record Interaction</h4>
                  <p className="text-gray-400">
                    If the ID is clean, you and John mutually authorize the interaction. This creates a private,
                    on-chain record that you both consented to.
                  </p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full -left-4 ring-4 ring-gray-800 text-gray-300">
                    3
                  </span>
                  <h4 className="font-semibold text-lg text-white">Burn a John</h4>
                  <p className="text-gray-400">
                    If the interaction was harmful, you can "burn" the `JohnID` and add context.
                  </p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full -left-4 ring-4 ring-gray-800 text-gray-300">
                    4
                  </span>
                  <h4 className="font-semibold text-lg text-white">Vouch for a Client</h4>
                  <p className="text-gray-400">
                    For positive interactions, you can give a 'vouch' to a `JohnID`. This contributes to a positive
                    reputation, helping good clients stand out.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* The Value for Sex Workers Section */}
      <section id="value" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              The Value for Sex Workers: Empowerment Through Technology
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              ZKBurn is designed from the ground up to provide tangible benefits that enhance safety and control.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-xl text-gray-200 mb-3">Empowerment & Agency</h3>
              <p className="text-gray-400">
                Gives you a direct, powerful tool to take action against harmful clients without needing permission from
                a central authority.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-xl text-gray-200 mb-3">Verifiable & Trustworthy</h3>
              <p className="text-gray-400">
                Your burn action is backed by a verifiable, on-chain proof of a pre-authorized interaction, preventing
                misuse.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-xl text-gray-200 mb-3">Build a Trusted System</h3>
              <p className="text-gray-400">
                Reward good clients with vouches and provide context for burns. This creates a more nuanced and fair
                reputation system for everyone.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="font-semibold text-xl text-gray-200 mb-3">Community Protection</h3>
              <p className="text-gray-400">
                By burning a dangerous client's tag, you create a permanent, public warning signal that protects other
                workers, strengthening the entire community's safety net.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Core Features</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Anonymous Identity",
                description:
                  "John generates his anonymous ID via ZKPassport, proving he is a unique person without revealing his real-world identity.",
                icon: Users,
              },
              {
                title: "Immutable Records",
                description:
                  "Once an interaction or burn is recorded on the blockchain, it cannot be erased or modified by anyone—not John, not the Worker, not even the system administrators.",
                icon: Layers,
              },
              {
                title: "Verified Burns with Notes",
                description:
                  "Only a Worker who has a <strong>mutually authorized</strong> interaction with a JohnID can burn that tag. An optional, private note can be added for context.",
                icon: Zap,
              },
              {
                title: "Positive Reputation",
                description:
                  "A vouching system allows Workers to reward good clients, creating a balanced reputation that isn't solely focused on negative interactions.",
                icon: Award,
              },
              {
                title: "Decentralized Trust",
                description: "No central party controls the data or burn decisions once recorded.",
                icon: BookOpen,
              },
              {
                title: "Non-Profit & Open",
                description:
                  "ZKBurn is developed as an open-source, non-profit tool for the community, focused solely on user safety.",
                icon: GitFork,
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
                <feature.icon className="h-10 w-10 mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: feature.description }}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Technology Powering ZKBurn</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              ZKBurn is built on a foundation of cutting-edge, privacy-enhancing technologies.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 min-w-[200px]">
              <Zap size={32} className="mx-auto mb-2 text-gray-400" />
              <h4 className="font-semibold text-white">ZKPassport</h4>
              <p className="text-xs text-gray-500">For anonymous identity verification.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 min-w-[200px]">
              <Layers size={32} className="mx-auto mb-2 text-gray-400" />
              <h4 className="font-semibold text-white">Solidity</h4>
              <p className="text-xs text-gray-500">For on-chain smart contract logic.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 min-w-[200px]">
              <Cube size={32} className="mx-auto mb-2 text-gray-400" />
              <h4 className="font-semibold text-white">Ethereum</h4>
              <p className="text-xs text-gray-500">For decentralized, immutable record-keeping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action / Explore */}
      <section id="explore" className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to See ZKBurn in Action?</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-400 mb-8">
            Explore our interactive demo to understand the user flows for both the Worker (service provider) and John
            (client).
          </p>
          <Link href="/demo" legacyBehavior>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 py-4 text-xl">
              Launch Demo Application
            </Button>
          </Link>
          <p className="mt-8 text-sm text-gray-500">
            ZKBurn is an open-specification project (CC-BY-SA-4.0). <br className="sm:hidden" />
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ZKBurn Working Group. All Rights Reserved (for demo purposes).</p>
          <p>This landing page and the demo are for illustrative purposes based on the ZKBurn v1.2 specification.</p>
        </div>
      </footer>
    </div>
  )
}

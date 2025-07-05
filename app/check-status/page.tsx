"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert, ShieldCheck, Loader2, Info } from "lucide-react"
import { GLOBAL_SALT, sha256Browser } from "@/lib/config"

const fetchBurnStatus = async (johnTag: string): Promise<boolean> => {
  console.log("Client: Fetching burn status for JohnTag (JT):", johnTag)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const response = await fetch(`/api/check-john-status?jt=${encodeURIComponent(johnTag)}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch status from server")
    }
    const data = await response.json()
    return data.isBurned
  } catch (error) {
    console.error("Error fetching status from server:", error)
    return false
  }
}

export default function CheckStatusPage() {
  const [johnIdentifier, setJohnIdentifier] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [burnStatus, setBurnStatus] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [checkedIdentifier, setCheckedIdentifier] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!johnIdentifier.trim()) {
      setError("Please enter your identifier.")
      setBurnStatus(null)
      return
    }

    setIsLoading(true)
    setError(null)
    setBurnStatus(null)
    setCheckedIdentifier(johnIdentifier)

    try {
      const combinedString = GLOBAL_SALT + johnIdentifier
      const jt = await sha256Browser(combinedString)
      console.log(`Client: Computed JohnTag (JT) for "${johnIdentifier}": ${jt}`)

      const status = await fetchBurnStatus(jt)
      setBurnStatus(status)
    } catch (err) {
      console.error("Client: Error checking status:", err)
      setError((err as Error).message || "Failed to check status. Please try again.")
      setBurnStatus(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-gray-300">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Check Your ZKBurn Status</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your unique identifier to check if it has been "burned" in the ZKBurn system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="johnIdentifier" className="text-gray-300">
                Your Identifier
              </Label>
              <Input
                id="johnIdentifier"
                type="text"
                placeholder="e.g., testuser@example.com"
                value={johnIdentifier}
                onChange={(e) => setJohnIdentifier(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-gray-50 focus:ring-gray-500"
              />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Status"
              )}
            </Button>
          </form>
        </CardContent>
        {(error || burnStatus !== null) && (
          <CardFooter className="flex flex-col items-center space-y-4 pt-6">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-400 w-full">
                <ShieldAlert className="h-4 w-4 text-red-400" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {burnStatus !== null && checkedIdentifier && (
              <Alert
                className={
                  burnStatus
                    ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-400 w-full"
                    : "bg-gray-800 border-gray-700 text-gray-300 w-full"
                }
              >
                {burnStatus ? (
                  <ShieldAlert className="h-4 w-4 text-yellow-400" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                )}
                <AlertTitle>
                  Status for: <span className="font-mono text-sm">{checkedIdentifier}</span>
                </AlertTitle>
                <AlertDescription>
                  {burnStatus ? "This identifier has been marked as BURNED." : "This identifier is NOT BURNED."}
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        )}
      </Card>
      <div className="mt-6 w-full max-w-md p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center text-gray-400">
          <Info size={20} className="mr-2" />
          <h3 className="font-semibold text-gray-300">How this works:</h3>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          1. You enter your identifier (e.g., email, phone).
          <br />
          2. We combine it with a secret <code className="text-xs bg-gray-800 p-0.5 rounded">GLOBAL_SALT</code>.
          <br />
          3. This combination is hashed (SHA-256) locally in your browser to create a{" "}
          <code className="text-xs bg-gray-800 p-0.5 rounded">JohnTag (JT)</code>.
          <br />
          4. Only this <code className="text-xs bg-gray-800 p-0.5 rounded">JT</code> is sent to check the burn status.
          Your original identifier is not transmitted for this check.
        </p>
      </div>
      <p className="text-xs text-gray-500 pt-8 text-center">ZKBurn Demo v1.2</p>
    </div>
  )
}

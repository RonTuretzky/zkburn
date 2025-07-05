"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserCheck, ShieldAlert, Loader2, ListOrdered, Camera, CheckCircle } from "lucide-react"
import { mockZKPassportClient } from "@/lib/mock-zkpassport-sdk"

type JohnID = string

export default function JohnPortalPage() {
  const [zkAuthLoading, setZkAuthLoading] = useState(false)
  const [johnId, setJohnId] = useState<JohnID | null>(null)
  const [zkAuthError, setZkAuthError] = useState<string | null>(null)

  const [showScanner, setShowScanner] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)

  const handleZKAuth = async () => {
    setZkAuthLoading(true)
    setZkAuthError(null)
    setJohnId(null)
    setShowScanner(false)
    setScanSuccess(false)
    try {
      const { queryResult } = await mockZKPassportClient.request(
        { name: "ZKBurn ID Generation", purpose: "Create anonymous client ID" },
        { gte: ["age", 18] },
      )
      setJohnId(queryResult.uniqueIdentifier)
      console.log("John: ZKAuth successful, JohnID:", queryResult.uniqueIdentifier)
    } catch (error) {
      console.error("John: ZKAuth failed:", error)
      setZkAuthError("ZK Passport authentication failed. Please try again.")
    } finally {
      setZkAuthLoading(false)
    }
  }

  const handleProceedToScan = () => {
    setShowScanner(true)
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScanSuccess(true)
    }, 2500) // 2.5 second scan simulation
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-gray-300">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">John's Portal</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Generate your anonymous ZK-powered ID and authorize interactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!johnId && (
            <Button
              onClick={handleZKAuth}
              disabled={zkAuthLoading}
              className="w-full bg-white text-black hover:bg-gray-300 px-8 py-3 text-lg"
            >
              {zkAuthLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-5 w-5" /> Generate My Anonymous ID
                </>
              )}
            </Button>
          )}

          {johnId && !showScanner && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg text-center">
                <p className="text-gray-300 flex items-center justify-center">
                  <UserCheck className="mr-2 h-5 w-5 text-gray-400" />
                  ID Generated Successfully!
                </p>
                <p className="font-mono text-sm text-white bg-gray-800 p-2 rounded mt-2 break-all">{johnId}</p>
              </div>

              <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-200 flex items-center mb-3">
                  <ListOrdered className="mr-2 h-5 w-5" />
                  Next Step
                </h3>
                <p className="text-sm text-gray-400">
                  Present this ID to the Worker. Once they verify it, they will show you a QR code to authorize the
                  interaction.
                </p>
              </div>

              <Button onClick={handleProceedToScan} className="w-full bg-gray-700 hover:bg-gray-600 text-lg py-6">
                <Camera className="mr-2 h-5 w-5" />
                Proceed to Scan QR Code
              </Button>
            </div>
          )}

          {johnId && showScanner && (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-700 min-h-[240px]">
              {isScanning && (
                <>
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border-4 border-gray-600/50 rounded-lg" />
                    <div className="absolute inset-0 animate-ping border-2 border-gray-500 rounded-lg" />
                    <Camera className="absolute inset-0 m-auto w-16 h-16 text-gray-500/70" />
                  </div>
                  <p className="mt-4 text-gray-400 animate-pulse">Scanning for interaction QR code...</p>
                </>
              )}
              {scanSuccess && (
                <div className="text-center">
                  <CheckCircle className="w-20 h-20 text-gray-400 mx-auto" />
                  <h3 className="mt-4 text-2xl font-bold text-white">Interaction Authorized!</h3>
                  <p className="text-gray-400 mt-2">
                    You have successfully consented to log this interaction. You may now close this window.
                  </p>
                </div>
              )}
            </div>
          )}

          {zkAuthError && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-400">
              <ShieldAlert className="h-4 w-4 text-red-400" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{zkAuthError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

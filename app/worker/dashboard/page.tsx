"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Info, Flame, LinkIcon, ShieldQuestion, ShieldCheck, ShieldAlert, Award } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"

interface WorkerActionResponse {
  success: boolean
  message: string
  johnId?: string
}

interface GenerateResponse {
  success: boolean
  message: string
  interactionUrl?: string
}

interface CheckStatusResponse {
  isBurned: boolean
  vouchCount: number
  note?: string
  checkedId: string
  error?: string
}

export default function WorkerDashboardPage() {
  // State variables
  const [checkJohnId, setCheckJohnId] = useState("")
  const [checkLoading, setCheckLoading] = useState(false)
  const [checkStatus, setCheckStatus] = useState<CheckStatusResponse | null>(null)

  const [generateJohnId, setGenerateJohnId] = useState("")
  const [generateLoading, setGenerateLoading] = useState(false)
  const [generateResponse, setGenerateResponse] = useState<GenerateResponse | null>(null)

  const [burnJohnId, setBurnJohnId] = useState("")
  const [burnNote, setBurnNote] = useState("")
  const [burnLoading, setBurnLoading] = useState(false)
  const [burnResponse, setBurnResponse] = useState<WorkerActionResponse | null>(null)

  const [vouchJohnId, setVouchJohnId] = useState("")
  const [vouchLoading, setVouchLoading] = useState(false)
  const [vouchResponse, setVouchResponse] = useState<WorkerActionResponse | null>(null)

  // Handlers
  const handleCheckStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!checkJohnId.trim()) {
      setCheckStatus({ isBurned: false, vouchCount: 0, checkedId: "", error: "Please enter a John ID." })
      return
    }
    setCheckLoading(true)
    setCheckStatus(null)
    try {
      const response = await fetch(`/api/check-john-status?johnId=${encodeURIComponent(checkJohnId)}`)
      if (!response.ok) throw new Error("Failed to fetch status from server.")
      const data = await response.json()
      setCheckStatus({ ...data, checkedId: checkJohnId })
    } catch (error) {
      setCheckStatus({ isBurned: false, vouchCount: 0, checkedId: checkJohnId, error: (error as Error).message })
    } finally {
      setCheckLoading(false)
    }
  }

  const handleGenerateRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!generateJohnId.trim()) {
      setGenerateResponse({ success: false, message: "John's Anonymous ID is required." })
      return
    }
    setGenerateLoading(true)
    setGenerateResponse(null)
    try {
      const response = await fetch("/api/generate-interaction-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ johnId: generateJohnId }),
      })
      const data: GenerateResponse = await response.json()
      setGenerateResponse(data)
      if (data.success) setGenerateJohnId("")
    } catch (error) {
      setGenerateResponse({ success: false, message: "Failed to generate request. Check console." })
    } finally {
      setGenerateLoading(false)
    }
  }

  const handleBurnJohn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!burnJohnId.trim()) {
      setBurnResponse({ success: false, message: "John's Anonymous ID is required." })
      return
    }
    setBurnLoading(true)
    setBurnResponse(null)
    try {
      const response = await fetch("/api/burn-john", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ johnId: burnJohnId, note: burnNote }),
      })
      const data: WorkerActionResponse = await response.json()
      setBurnResponse(data)
      if (data.success) {
        setBurnJohnId("")
        setBurnNote("")
      }
    } catch (error) {
      setBurnResponse({ success: false, message: "Failed to burn John. Check console." })
    } finally {
      setBurnLoading(false)
    }
  }

  const handleVouchForJohn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!vouchJohnId.trim()) {
      setVouchResponse({ success: false, message: "John's Anonymous ID is required." })
      return
    }
    setVouchLoading(true)
    setVouchResponse(null)
    try {
      const response = await fetch("/api/vouch-for-john", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ johnId: vouchJohnId }),
      })
      const data: WorkerActionResponse = await response.json()
      setVouchResponse(data)
      if (data.success) setVouchJohnId("")
    } catch (error) {
      setVouchResponse({ success: false, message: "Failed to vouch for John. Check console." })
    } finally {
      setVouchLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-black p-4 text-gray-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Worker's Dashboard</h1>
        <p className="text-gray-400">Check a client's ID, manage interactions, and build reputation.</p>
      </div>

      <div className="w-full max-w-6xl space-y-6">
        {/* Check Status Card */}
        <Card className="w-full bg-gray-950 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-200 flex items-center">
              <ShieldQuestion className="mr-2" /> 1. Check Client ID Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckStatus} className="flex items-end gap-4">
              <div className="flex-grow">
                <Label htmlFor="checkJohnId">John's Anonymous ID</Label>
                <Input
                  id="checkJohnId"
                  value={checkJohnId}
                  onChange={(e) => setCheckJohnId(e.target.value)}
                  placeholder="Enter or scan John's ZK-ID"
                  required
                  className="bg-gray-800 border-gray-700 text-gray-50 focus:ring-gray-500"
                />
              </div>
              <Button type="submit" disabled={checkLoading} className="bg-gray-700 hover:bg-gray-600">
                {checkLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Check"}
              </Button>
            </form>
          </CardContent>
          {checkStatus && (
            <CardFooter>
              <Alert
                className={
                  checkStatus.error
                    ? "bg-red-900/20 border-red-500/50 text-red-400"
                    : checkStatus.isBurned
                      ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-400"
                      : "bg-gray-800 border-gray-700 text-gray-300"
                }
              >
                {checkStatus.error ? (
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                ) : checkStatus.isBurned ? (
                  <ShieldAlert className="h-4 w-4 text-yellow-400" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                )}
                <AlertTitle>
                  {checkStatus.error ? "Error" : `Status for ID: ${checkStatus.checkedId.substring(0, 15)}...`}
                </AlertTitle>
                <AlertDescription>
                  {checkStatus.error
                    ? checkStatus.error
                    : checkStatus.isBurned
                      ? `This ID is BURNED. Proceed with caution. ${checkStatus.note ? `Note: ${checkStatus.note}` : ""}`
                      : `This ID is clean with ${checkStatus.vouchCount} positive vouch(es).`}
                </AlertDescription>
              </Alert>
            </CardFooter>
          )}
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate Interaction Request Card */}
          <Card className="w-full bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-200 flex items-center">
                <LinkIcon className="mr-2" /> 2. Generate Interaction Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateRequest} className="space-y-4">
                <div>
                  <Label htmlFor="generateJohnId">John's Anonymous ID</Label>
                  <Input
                    id="generateJohnId"
                    value={generateJohnId}
                    onChange={(e) => setGenerateJohnId(e.target.value)}
                    placeholder="Enter John's ZK-ID"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button type="submit" disabled={generateLoading} className="w-full bg-gray-700 hover:bg-gray-600">
                  {generateLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Request"}
                </Button>
              </form>
            </CardContent>
            {generateResponse && (
              <CardFooter className="flex-col space-y-4">
                <Alert
                  className={`${generateResponse.success ? "bg-gray-800 border-gray-700" : "bg-red-900/20 border-red-500/50 text-red-400"} w-full`}
                >
                  <Info className="h-4 w-4" />
                  <AlertTitle>{generateResponse.success ? "Request Generated" : "Error"}</AlertTitle>
                  <AlertDescription>{generateResponse.message}</AlertDescription>
                </Alert>
                {generateResponse.success && generateResponse.interactionUrl && (
                  <div className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 flex flex-col items-center space-y-4">
                    <h4 className="font-semibold">Show this to John</h4>
                    <div className="p-2 bg-white rounded-lg">
                      <QRCodeCanvas
                        value={new URL(generateResponse.interactionUrl, window.location.origin).href}
                        size={128}
                        bgColor={"#ffffff"}
                        fgColor={"#111827"}
                        level={"L"}
                      />
                    </div>
                  </div>
                )}
              </CardFooter>
            )}
          </Card>

          {/* Vouch for John Card */}
          <Card className="w-full bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-200 flex items-center">
                <Award className="mr-2" /> 3. Vouch for John
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVouchForJohn} className="space-y-4">
                <div>
                  <Label htmlFor="vouchJohnId">John's Anonymous ID</Label>
                  <Input
                    id="vouchJohnId"
                    value={vouchJohnId}
                    onChange={(e) => setVouchJohnId(e.target.value)}
                    placeholder="Enter John's ZK-ID"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button type="submit" disabled={vouchLoading} className="w-full bg-green-800 hover:bg-green-700">
                  {vouchLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Give Vouch"}
                </Button>
              </form>
            </CardContent>
            {vouchResponse && (
              <CardFooter>
                <Alert
                  className={`${vouchResponse.success ? "bg-gray-800 border-gray-700" : "bg-red-900/20 border-red-500/50 text-red-400"} w-full`}
                >
                  <Info className="h-4 w-4" />
                  <AlertTitle>{vouchResponse.success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{vouchResponse.message}</AlertDescription>
                </Alert>
              </CardFooter>
            )}
          </Card>

          {/* Burn John Card */}
          <Card className="w-full bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-200 flex items-center">
                <Flame className="mr-2" /> 4. Burn John
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBurnJohn} className="space-y-4">
                <div>
                  <Label htmlFor="burnJohnId">John's Anonymous ID to Burn</Label>
                  <Input
                    id="burnJohnId"
                    value={burnJohnId}
                    onChange={(e) => setBurnJohnId(e.target.value)}
                    placeholder="Enter John's ZK-ID"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="burnNote">Note (Optional, Private)</Label>
                  <Textarea
                    id="burnNote"
                    value={burnNote}
                    onChange={(e) => setBurnNote(e.target.value)}
                    placeholder="Add a private note about the incident..."
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button type="submit" disabled={burnLoading} className="w-full bg-red-800 hover:bg-red-700 text-white">
                  {burnLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Burn John"}
                </Button>
              </form>
            </CardContent>
            {burnResponse && (
              <CardFooter>
                <Alert
                  className={`${burnResponse.success ? "bg-gray-800 border-gray-700" : "bg-red-900/20 border-red-500/50 text-red-400"} w-full`}
                >
                  <Info className="h-4 w-4" />
                  <AlertTitle>{burnResponse.success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{burnResponse.message}</AlertDescription>
                </Alert>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

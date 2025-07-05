"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthorizeInteractionPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Authorizing your interaction...")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("No authorization token provided. This link is invalid.")
      return
    }

    const authorize = async () => {
      try {
        const response = await fetch("/api/authorize-interaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to authorize interaction.")
        }

        setStatus("success")
        setMessage(data.message)
      } catch (error) {
        setStatus("error")
        setMessage((error as Error).message)
      }
    }

    authorize()
  }, [token])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-gray-300">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800 text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Interaction Authorization</CardTitle>
          <CardDescription className="text-gray-400">
            Finalizing the mutual consent for this interaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 min-h-[150px]">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              <p className="text-gray-300">{message}</p>
            </>
          )}
          {status === "success" && (
            <>
              <ShieldCheck className="h-12 w-12 text-gray-300" />
              <p className="text-white font-semibold">Success!</p>
              <p className="text-gray-300">{message}</p>
            </>
          )}
          {status === "error" && (
            <>
              <ShieldAlert className="h-12 w-12 text-red-400" />
              <p className="text-red-400 font-semibold">Authorization Failed</p>
              <p className="text-gray-300">{message}</p>
            </>
          )}
          <Button
            onClick={() => window.close()}
            variant="outline"
            className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Close Window
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

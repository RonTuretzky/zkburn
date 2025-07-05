import { NextResponse } from "next/server"
import { mockPendingInteractions } from "@/lib/mock-db"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { johnId } = body as {
      johnId: string
    }

    if (!johnId) {
      return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 })
    }

    // Assume Worker is authenticated via a traditional session.
    const mockWorkerSessionId = "worker_session_abc_123"
    const interactionToken = crypto.randomUUID()

    mockPendingInteractions.set(interactionToken, {
      johnId,
      workerId: mockWorkerSessionId,
      status: "pending",
    })

    console.log(`Server: Generated interaction request token ${interactionToken} for JohnID ${johnId}`)

    const interactionUrl = `/authorize-interaction?token=${interactionToken}`

    return NextResponse.json({
      success: true,
      message: "Interaction request generated. Share the link or QR code with John.",
      interactionUrl,
    })
  } catch (error) {
    console.error("API Generate Interaction Request Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}

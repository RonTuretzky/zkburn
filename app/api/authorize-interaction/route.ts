import { NextResponse } from "next/server"
import { mockInteractions, mockPendingInteractions } from "@/lib/mock-db"
import type { InteractionData } from "@/lib/config"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body as { token: string }

    if (!token) {
      return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 400 })
    }

    const pendingInteraction = mockPendingInteractions.get(token)

    if (!pendingInteraction) {
      return NextResponse.json({ success: false, message: "Invalid or expired authorization token." }, { status: 404 })
    }

    if (pendingInteraction.status === "authorized") {
      return NextResponse.json(
        { success: false, message: "This interaction has already been authorized." },
        { status: 409 },
      )
    }

    // Mark as authorized
    pendingInteraction.status = "authorized"
    mockPendingInteractions.set(token, pendingInteraction)

    // Now, create the permanent record in the main interactions map
    const { johnId, workerId } = pendingInteraction
    const interactionData: InteractionData = {
      timestamp: Math.floor(Date.now() / 1000),
      exists: true,
    }

    if (!mockInteractions.has(johnId)) {
      mockInteractions.set(johnId, new Map<string, InteractionData>())
    }
    mockInteractions.get(johnId)!.set(workerId, interactionData)

    console.log(`Server: Interaction authorized and recorded for JohnID ${johnId} by Worker ${workerId}`)

    return NextResponse.json({
      success: true,
      message: "Interaction successfully authorized and recorded.",
    })
  } catch (error) {
    console.error("API Authorize Interaction Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}

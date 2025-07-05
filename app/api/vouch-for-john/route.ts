import { NextResponse } from "next/server"
import { mockInteractions, mockJohnVouches } from "@/lib/mock-db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { johnId } = body as { johnId: string }

    if (!johnId) {
      return NextResponse.json({ success: false, message: "Missing John's Anonymous ID." }, { status: 400 })
    }

    // Assume Worker is logged in with a session.
    const mockWorkerSessionId = "worker_session_abc_123"

    // Check for prior interaction by this Worker. This prevents spamming vouches.
    const johnsInteractions = mockInteractions.get(johnId)
    if (!johnsInteractions || !johnsInteractions.has(mockWorkerSessionId)) {
      return NextResponse.json(
        { success: false, message: "Cannot vouch. No prior interaction recorded by you for this JohnID." },
        { status: 403 },
      )
    }

    // For this demo, we'll allow a worker to vouch multiple times after one interaction.
    // A real system might add a check to prevent this.
    const currentVouches = mockJohnVouches.get(johnId) || 0
    mockJohnVouches.set(johnId, currentVouches + 1)

    console.log(
      `Server: JohnID ${johnId} vouched for by Worker ${mockWorkerSessionId}. New count: ${currentVouches + 1}`,
    )

    return NextResponse.json({
      success: true,
      message: "Successfully vouched for John's ID.",
      johnId,
    })
  } catch (error) {
    console.error("API Vouch for John Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}

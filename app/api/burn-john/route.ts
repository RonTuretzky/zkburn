import { NextResponse } from "next/server"
import { mockInteractions, mockJohnBurned } from "@/lib/mock-db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { johnId } = body as { johnId: string }

    if (!johnId) {
      return NextResponse.json({ success: false, message: "Missing John's Anonymous ID." }, { status: 400 })
    }

    // Assume Worker is logged in with a session.
    const mockWorkerSessionId = "worker_session_abc_123"

    // Check for prior interaction by this Worker.
    const johnsInteractions = mockInteractions.get(johnId)
    if (!johnsInteractions || !johnsInteractions.has(mockWorkerSessionId)) {
      return NextResponse.json(
        { success: false, message: "Cannot burn. No prior interaction recorded by you for this JohnID." },
        { status: 403 },
      )
    }

    mockJohnBurned.set(johnId, true)
    console.log(`Server: JohnID ${johnId} burned by Worker ${mockWorkerSessionId}`)

    return NextResponse.json({
      success: true,
      message: "John's ID burned successfully.",
      johnId,
    })
  } catch (error) {
    console.error("API Burn John Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}

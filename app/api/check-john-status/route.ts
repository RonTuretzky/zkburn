import { NextResponse } from "next/server"
import { mockJohnBurned, mockJohnVouches } from "@/lib/mock-db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const johnId = searchParams.get("johnId")

  if (!johnId) {
    return NextResponse.json({ success: false, message: "JohnID query parameter is required." }, { status: 400 })
  }

  try {
    const burnRecord = mockJohnBurned.get(johnId)
    const vouchCount = mockJohnVouches.get(johnId) || 0

    const isBurned = !!burnRecord

    console.log(`Server: Checked status for JohnID ${johnId}: Burned=${isBurned}, Vouches=${vouchCount}`)

    return NextResponse.json({
      success: true,
      isBurned,
      note: burnRecord?.note,
      vouchCount,
    })
  } catch (error) {
    console.error("API Check John Status Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}

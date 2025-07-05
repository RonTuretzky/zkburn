import { NextResponse } from "next/server"
import { mockJohnBurned } from "@/lib/mock-db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const johnId = searchParams.get("johnId") // Changed from 'jt' to 'johnId'

  if (!johnId) {
    return NextResponse.json({ success: false, message: "JohnID query parameter is required." }, { status: 400 })
  }

  try {
    const isBurned = mockJohnBurned.get(johnId) || false
    console.log(`Server: Checked status for JohnID ${johnId}: ${isBurned}`)
    return NextResponse.json({ success: true, isBurned })
  } catch (error) {
    console.error("API Check John Status Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}

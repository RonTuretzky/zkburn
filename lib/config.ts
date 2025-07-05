// Using a constant for GLOBAL_SALT to ensure consistency
export const GLOBAL_SALT = "zKbUrN_gLoBaL_sAlT_v1.2"

// Helper function to compute SHA-256 hash (can be used client and server-side if needed, but primarily client for JT)
// For server-side, Node.js crypto module would be more direct.
// This browser-based one is fine for client-side JT generation.
export async function sha256Browser(str: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

// Mock Interaction structure (similar to contract's Interaction struct)
// Removed cityHash as per request
export interface InteractionData {
  timestamp: number // Unix timestamp (seconds or milliseconds)
  exists: boolean
}

import type { InteractionData } from "./config"

// In-memory store to simulate contract storage
// IMPORTANT: This is NOT persistent. Data will be lost on server restart.
// For a real app, use a database or actual contract interaction.
export const mockInteractions = new Map<string, Map<string, InteractionData>>() // JohnID -> WorkerUID -> Interaction
export const mockJohnBurned = new Map<string, boolean>() // JohnID -> burned?

// New store for pending interactions before John authorizes them
export interface PendingInteraction {
  johnId: string
  workerId: string
  status: "pending" | "authorized"
}
export const mockPendingInteractions = new Map<string, PendingInteraction>() // interactionToken -> PendingInteraction

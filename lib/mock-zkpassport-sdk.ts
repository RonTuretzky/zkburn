// Mock ZKPassport SDK

export interface MockZKProof {
  // Simplified proof structure
  proofData: string
  publicSignals: string[]
}

export interface MockZKQueryResult {
  // Simplified query result
  ageVerified: boolean
  uniqueIdentifier: string // This will be JohnID
}

export interface MockVerifierParams {
  // Simplified verifier params for solidity
  a: [string, string]
  b: [[string, string], [string, string]]
  c: [string, string]
  input: string[]
}

// Use deterministic John UIDs for the demo
const mockJohnUIDs = ["john_uid_1234", "john_uid_5678", "john_uid_9101"]
let currentJohnUIDIndex = 0

export const mockZKPassportClient = {
  request: async (
    options: { name: string; purpose: string },
    constraints: { gte: [string, number] },
  ): Promise<{ proofs: MockZKProof; queryResult: MockZKQueryResult; qrUrl: string }> => {
    console.log("Mock ZKPassportClient.request called with:", options, constraints)
    // Simulate user scanning QR and approving
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Cycle through mock JohnUIDs for different sessions or users
    const johnUID = mockJohnUIDs[currentJohnUIDIndex % mockJohnUIDs.length]
    currentJohnUIDIndex++

    return {
      proofs: {
        proofData: `mock_proof_data_${Date.now()}`,
        publicSignals: ["signal1", "signal2"],
      },
      queryResult: {
        ageVerified: true,
        uniqueIdentifier: johnUID, // This is the JohnID
      },
      qrUrl: "https://example.com/mock-zkpassport-qr",
    }
  },
  getSolidityVerifierParameters: (proofs: MockZKProof, queryResult: MockZKQueryResult): MockVerifierParams => {
    console.log("Mock ZKPassportClient.getSolidityVerifierParameters called")
    // These would be actual parameters derived from the proofs for on-chain verification
    return {
      a: ["0x01", "0x02"],
      b: [
        ["0x03", "0x04"],
        ["0x05", "0x06"],
      ],
      c: ["0x07", "0x08"],
      input: [queryResult.uniqueIdentifier, queryResult.ageVerified ? "1" : "0"],
    }
  },
}

export const mockZKPassportServer = {
  verify: async (
    proofs: MockZKProof,
    queryResult: MockZKQueryResult,
  ): Promise<{ verified: boolean; uniqueIdentifier?: string }> => {
    console.log("Mock ZKPassportServer.verify called with:", proofs, queryResult)
    // Simulate verification logic
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (queryResult.uniqueIdentifier && queryResult.ageVerified) {
      return { verified: true, uniqueIdentifier: queryResult.uniqueIdentifier }
    }
    return { verified: false }
  },
}

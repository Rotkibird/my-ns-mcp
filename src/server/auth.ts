/**
 * API Key Authentication Middleware
 *
 * Ensures that each incoming request has a valid API key.
 * Valid API keys are loaded from environment variables or a static allowlist.
 */

const validKeys = process.env.VALID_API_KEYS
  ? process.env.VALID_API_KEYS.split(",").map(key => key.trim())
  : [
      "abc123xyz", // fallback for dev/test
      "def456uvw",
    ]

/**
 * Validate that a given key is present in the allowlist.
 * Throws an error if the key is missing or invalid.
 */
export function validateApiKey(apiKey?: string): void {
  if (!apiKey) {
    throw new Error("Unauthorized: Missing API key")
  }

  if (!validKeys.includes(apiKey)) {
    throw new Error("Unauthorized: Invalid API key")
  }
}

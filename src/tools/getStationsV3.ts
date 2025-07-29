import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getStationsV3 } from "../resources/stationsV3";

// Input schema (optioneel)
export const GetStationsV3Schema = z.object({
  q: z.string().min(2).optional(),
  includeNonPlannableStations: z.boolean().optional(),
  countryCodes: z.array(z.string()).optional(),
  limit: z.number().optional()
});

export function registerGetStationsV3(server: McpServer) {
  server.tool(
    "getStationsV3",
    "Get a list of stations from the NS Stations API (V3). Supports query, country filtering, and optional limits.",
    GetStationsV3Schema,
    async (args) => {
      const result = await getStationsV3(args); // abstracted API logic
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );
}
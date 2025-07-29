import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetStationsV3 } from "./getStationsV3";
import { registerGetNearestStationsV3 } from "./getNearestStationsV3";
import { registerGetStationsV2 } from "./getStationsV2";
import { registerGetNearestStationsV2 } from "./getNearestStationsV2";

export function registerTools(server: McpServer) {
  registerGetStationsV3(server);
  registerGetNearestStationsV3(server);
  registerGetStationsV2(server);
  registerGetNearestStationsV2(server);
}
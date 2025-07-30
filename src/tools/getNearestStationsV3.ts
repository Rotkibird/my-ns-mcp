import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import db from "../database/client";

export const GetNearestStationsV3Schema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  limit: z.number().optional().default(5),
});

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function registerGetNearestStationsV3(server: McpServer) {
  server.tool(
    "getNearestStationsV3",
    "Find nearest stations by coordinates from local DB (synced with NS API)",
    GetNearestStationsV3Schema,
    async ({ latitude, longitude, limit }) => {
      const stations = await db.stations.findMany({
        where: { latitude: { not: null }, longitude: { not: null } },
      });

      // Bereken afstand
      const withDistance = stations.map(s => ({
        ...s,
        distance_km: haversineDistance(latitude, longitude, s.latitude, s.longitude)
      }));

      // Sorteer op afstand en pak limit
      const nearest = withDistance
        .sort((a, b) => a.distance_km - b.distance_km)
        .slice(0, limit);

      return {
        content: [
          {
            type: "text",
            text: `Nearest ${nearest.length} station(s) to (${latitude}, ${longitude})`
          },
          {
            type: "json",
            json: nearest.map(s => ({
              code: s.code,
              name: s.name_long,
              type: s.station_type,
              country: s.country,
              distance_km: Math.round(s.distance_km * 1000) / 1000
            }))
          }
        ]
      };
    }
  );
}
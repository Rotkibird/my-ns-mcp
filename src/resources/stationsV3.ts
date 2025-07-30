import db from "../database/client";
import { fetchStationsV3 } from "../api/stationsApi";

export async function syncStationsToDB() {
  const response = await fetchStationsV3({});
  const stations = response.payload;

  for (const st of stations) {
    await db.stations.upsert({
      where: { code: st.id.code },
      update: {
        uic_code: st.id.uicCode,
        name_long: st.names.long,
        name_short: st.names.short,
        station_type: st.stationType,
        country: st.countryCode,
        updated_at: new Date()
      },
      create: {
        code: st.id.code,
        uic_code: st.id.uicCode,
        name_long: st.names.long,
        name_short: st.names.short,
        station_type: st.stationType,
        country: st.countryCode
      }
    });
  }

  console.log(`Synced ${stations.length} stations to DB`);
}
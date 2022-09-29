import { AxiosClient } from "../AxiosClient";
import { SearchQuerySettings, UproditUser } from "./types";
import config from "../config.json";

export async function search(
  querySettings: SearchQuerySettings = { startIndex: 0, maxResults: 20 }
): Promise<UproditUser[]> {
  const endpoint = buildSearchEndpoint(querySettings);

  const searchResponse = await AxiosClient.get<UproditUser[]>(endpoint);

  return searchResponse.data;
}

function buildSearchEndpoint(querySettings: SearchQuerySettings) {
  let endpoint = `${config.endpoints.search}`;

  Object.entries(querySettings).forEach(
    ([key, value]) => (endpoint += (key === "startIndex" || (key && value)) ? `&${key}=${value}` : '')
  );

  return endpoint;
}

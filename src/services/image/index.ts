import { AxiosClient } from "../AxiosClient";
import { UproditImage } from "./types";
import config from "../config.json";


export async function getImage(id: string) {
    const endpoint = `${config.endpoints.image}/${id}`;
    const imageResponse = await AxiosClient.get<UproditImage>(endpoint);
    return imageResponse.data;
  }
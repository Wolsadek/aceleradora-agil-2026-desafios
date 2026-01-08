import axios from "axios";
import { UNSPLASH_BASE_URL } from "./constants";
import { UnsplashRequestParams } from "../types/unsplash/unsplash-request-params";
import { UnsplashPicture } from "../types/unsplash/unsplash-picture";
import { UnsplashRequestResponse } from "../types/unsplash/unsplash-request-response";

export async function getPictures(
  params: UnsplashRequestParams
): Promise<UnsplashPicture[]> {
  try {
    const response = await axios.get<UnsplashRequestResponse>(
      `${UNSPLASH_BASE_URL}`,
      {
        params: params,
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching pictures:", error);
    throw error;
  }
}

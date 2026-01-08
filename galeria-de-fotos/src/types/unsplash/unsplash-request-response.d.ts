import { UnsplashPicture } from "./unsplash-picture";

export type UnsplashRequestResponse = {
  total: number;
  total_pages: number;
  results: UnsplashPicture[];
};

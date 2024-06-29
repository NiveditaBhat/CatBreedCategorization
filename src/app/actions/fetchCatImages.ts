"use server";
import { fetchCatImages as fetchCatImagesData } from "../lib/fetchCatImagesData";

export const fetchCatImages = async (page: number, breedId?: string) => {
  return fetchCatImagesData(page, breedId);
};

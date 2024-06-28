"use server";
import { fetchCatImages } from "../lib/fetchCatBreedData";

export const fetchMoreCatImages = async (page: number, breedId?: string) => {
  return fetchCatImages(page, breedId);
};

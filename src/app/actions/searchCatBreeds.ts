"use server";
import { searchCatBreeds } from "../lib/fetchCatImagesData";

export const searchCatBreedOptions = async (searchQuery: string) => {
  return searchCatBreeds(searchQuery);
};

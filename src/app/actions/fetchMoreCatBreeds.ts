"use server";
import fetchCatBreeds from "../lib/fetchCatBreeds";

export const fetchMoreCatBreeds = async (limit: number, offset: number) => {
  return fetchCatBreeds(limit, offset);
};

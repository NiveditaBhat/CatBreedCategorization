import { getCatBreedsResponse, getCatImagesResponse } from "./catBreedTypes";

const HEADERS = {
  "content-type": "application/json",
  "x-api-key": process.env.API_KEY ?? "",
};
const API_KEY = process.env.API_KEY ?? "";

const API_BASE = process.env.API_BASE;

export const getCatImages = async (
  limit: number,
  page: number,
  breedId?: string,
): Promise<getCatImagesResponse> => {
  const response = await fetch(
    `${API_BASE}/v1/images/search?limit=${limit}&page=${page}&has_breeds=true&order=ASC&breed_ids=${breedId}&api_key=${API_KEY}`,
    {
      cache: "no-cache",
      headers: HEADERS,
      next: { tags: ["catImages"] },
    },
  );
  console.log("response", response);
  if (!response.ok) {
    throw new Error("Failed to fetch cat images data");
  }

  return response.json();
};

export const searchCatBreedsByName = async (
  searchQuery: string,
): Promise<getCatBreedsResponse> => {
  const response = await fetch(
    `${API_BASE}/v1/breeds/search?q=${searchQuery}&api_key=${API_KEY}`,
    {
      headers: HEADERS,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cat breeds data");
  }

  return response.json();
};

import { getCatBreedsResponse, getCatImagesResponse } from "./catBreedTypes";

const HEADERS = {
  "content-type": "application/json",
  "x-api-key": process.env.API_KEY ?? "",
};

const API_BASE = process.env.API_BASE;

export const getCatBreedsByImage = async (
  id: string,
): Promise<getCatBreedsResponse> => {
  const response = await fetch(`${API_BASE}/v1/images/${id}/breeds`, {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin",
    // "Cache-Control": "no-cache",
    // Accept: "*/*",
    // "Accept-Encoding": "gzip, deflate, br",
    // Connection: "keep-alive",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cat breeds data");
  }

  return response.json();
};

export const getCatImages = async (
  limit: number,
  page: number,
  breedId?: string,
): Promise<getCatImagesResponse> => {
  const response = await fetch(
    `${API_BASE}/v1/images/search?page=${page}&limit=${limit}&has_breeds=true&breed_ids=${breedId}`,
    {
      cache: "no-cache",
      headers: HEADERS,
      next: { tags: ["catImages"] },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cat images data");
  }

  return response.json();
};

export const searchCatBreedsByName = async (
  searchQuery: string,
): Promise<getCatBreedsResponse> => {
  const response = await fetch(
    `${API_BASE}/v1/breeds/search?q=${searchQuery}`,
    {
      headers: HEADERS,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cat breeds data");
  }

  return response.json();
};

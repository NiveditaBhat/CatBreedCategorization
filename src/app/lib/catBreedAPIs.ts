import { GetCatBreedsResponse, GetCatImagesResponse } from "./catBreedTypes";
import { API_BASE, API_KEY } from "@/config";

export const getCatImages = async (
  limit: number,
  page: number,
  breedId?: string,
): Promise<GetCatImagesResponse> => {
  const response = await fetch(
    `${API_BASE}/v1/images/search?limit=${limit}&page=${page}&has_breeds=true&order=ASC&breed_ids=${breedId}&api_key=${API_KEY}`,
    {
      cache: "no-cache",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cat images data");
  }

  return response.json();
};

export const searchCatBreedsByName = async (
  searchQuery: string,
): Promise<GetCatBreedsResponse> => {
  const response = await fetch(
    `${API_BASE}/v1/breeds/search?q=${searchQuery}&api_key=${API_KEY}`,
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cat breeds data");
  }

  return response.json();
};

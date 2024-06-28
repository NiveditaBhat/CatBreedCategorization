import { getCatBreedsResponse, getCatImageResponse } from "./catBreedTypes";

const HEADERS = {
  "content-type": "application/json",
  "x-api-key": process.env.API_KEY,
  // Accept: "application/json",
};

const API_BASE = process.env.API_BASE;

export const getCatBreeds = async (
  limit: number,
  page: number,
): Promise<getCatBreedsResponse> =>
  fetch(`${API_BASE}/v1/breeds?limit=${limit}&page=${page}`, {
    headers: HEADERS,
  })
    .then((response) => response.json())
    .catch(() => {
      console.log("Something went wrong while fetching Cat breeds");
    });

export const getCatImageById = async (
  id: string,
): Promise<getCatImageResponse> =>
  fetch(`https://api.thecatapi.com/v1/images/${id}`, {
    method: "GET",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin",
    // "Cache-Control": "no-cache",
    // Accept: "*/*",
    // "Accept-Encoding": "gzip, deflate, br",
    // Connection: "keep-alive",
    headers: HEADERS,
  })
    .then((response) => response.json())
    .catch(() => {
      console.log("Something went wrong while fetching Cat images");
    });

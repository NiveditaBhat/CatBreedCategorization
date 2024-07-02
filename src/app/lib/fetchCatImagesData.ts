import { CatBreed, CatImage } from "./catBreedTypes";
import { getCatImages, searchCatBreedsByName } from "./catBreedAPIs";

export const fetchCatImages = async (
  page = 0,
  breedId = "",
  limit = 10,
): Promise<CatImage[] | null> => {
  const response = await getCatImages(limit, page, breedId);

  if (!response) {
    return null;
  }

  return response.map(({ id, width, height, url, breeds }) => ({
    id,
    width,
    height,
    url,
    breeds: breeds?.map(({ id, name }) => ({ id, name })),
  }));
};

export const searchCatBreeds = async (
  query: string,
): Promise<CatBreed[] | null> => {
  const response = await searchCatBreedsByName(query);

  if (!response) {
    return null;
  }

  return response.map(({ id, name }) => ({
    id,
    name,
  }));
};

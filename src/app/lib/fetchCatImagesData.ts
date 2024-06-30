import { CatImage, getCatBreedsResponse } from "./catBreedTypes";
import { getCatImages, searchCatBreedsByName } from "./catBreedAPIs";

export const fetchCatImages = async (
  page = 0,
  breedId = "",
): Promise<CatImage[] | null> => {
  const response = await getCatImages(10, page, breedId);
  console.log("page", page);

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
): Promise<getCatBreedsResponse | null> => {
  const response = await searchCatBreedsByName(query);

  if (!response) {
    return null;
  }

  return response.map(({ id, name }) => ({
    id,
    name,
  }));
};

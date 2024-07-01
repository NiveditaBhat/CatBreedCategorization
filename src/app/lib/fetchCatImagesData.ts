import { CatBreed, CatImage, GetCatBreedsResponse } from "./catBreedTypes";
import { getCatImages, searchCatBreedsByName } from "./catBreedAPIs";

export const fetchCatImages = async (
  page = 0,
  breedId = "",
  limit = 10,
): Promise<CatImage[] | null> => {
  const response = await getCatImages(limit, page, breedId);
  console.log("getCatImages", JSON.stringify(response));

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
  // console.log("searchbreeds", response);
  if (!response) {
    return null;
  }
  console.log(
    "carBreed",
    response.map(({ id, name }) => ({
      id,
      name,
    })),
  );
  return response.map(({ id, name }) => ({
    id,
    name,
  }));
};

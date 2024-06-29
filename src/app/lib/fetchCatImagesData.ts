import { CatBreedItem, CatImage, getCatBreedsResponse } from "./catBreedTypes";
import {
  getCatBreedsByImage,
  getCatImages,
  searchCatBreedsByName,
} from "./catBreedAPIs";
import { revalidateTag } from "next/cache";

const fetchCatBreeds = async (id: string) => {
  const catBreedsData = await getCatBreedsByImage(id);

  if (!catBreedsData) {
    return;
  }

  return catBreedsData.map(({ name, id }) => ({
    id,
    name,
  }));
};

export const fetchCatImages = async (
  page = 0,
  breedId = "",
): Promise<CatImage[] | null> => {
  const response = await getCatImages(10, page, breedId);
  console.log("page", page);

  if (!response) {
    return null;
  }

  const ret = await Promise.all(
    response.map(async (catImage) => {
      const breeds = await fetchCatBreeds(catImage.id);
      return {
        ...catImage,
        breeds,
      };
    }),
  );
  console.log(JSON.stringify(ret));
  return ret;
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

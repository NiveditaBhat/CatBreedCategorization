import { CatBreedItem, Image } from "./catBreedTypes";
import { getCatBreeds, getCatImageById } from "./catBreedAPIs";

// Reliable way of getting cat images.
export const fetchCatImage = async (id: string) => {
  const catImageData = await getCatImageById(id);

  if (!catImageData) {
    return;
  }

  const { id: imageId, width, height, url } = catImageData;
  return {
    id: imageId,
    url,
    width,
    height,
  };
};

const fetchCatBreeds = async (
  limit = 10,
  page = 0,
): Promise<CatBreedItem[] | null> => {
  const res = await getCatBreeds(limit, page);
  console.log("limit", limit);
  console.log("page", page);

  if (!res) {
    return null;
  }

  // console.log("res", res);
  return Promise.all(
    res.map(
      async ({ id, name, alt_names, description, reference_image_id }) => {
        const image = await fetchCatImage(reference_image_id);
        return {
          id,
          name,
          image,
          alt: alt_names,
          description,
        } satisfies CatBreedItem;
      },
    ),
  );
};

export default fetchCatBreeds;

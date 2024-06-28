import {
  CatBreedItem,
  CatImage,
  CatImages,
  getCatImageResponse,
  getCatImagesResponse,
  Image,
} from "./catBreedTypes";
import {
  getCatBreeds,
  getCatBreedsByImage,
  getCatImageById,
  getCatImages,
  searchCatBreedsByName,
} from "./catBreedAPIs";

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
  breedId?: string,
): Promise<CatImage[] | null> => {
  const response = await getCatImages(10, page, breedId);
  console.log("page", page);
  console.log("res", response);
  if (!response) {
    return null;
  }
  return Promise.all(
    response.map(async (catImage) => {
      const breeds = await fetchCatBreeds(catImage.id);
      return {
        ...catImage,
        breeds,
      };
    }),
  );
};

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

// const fetchCatBreeds = async (
//   limit = 10,
//   page = 0,
// ): Promise<CatBreedItem[] | null> => {
//   const res = await getCatBreeds(limit, page);
//   console.log("limit", limit);
//   console.log("page", page);
//
//   if (!res) {
//     return null;
//   }
//
//   return Promise.all(
//     res.map(
//       async ({ id, name, alt_names, description, reference_image_id }) => {
//         const image = await fetchCatImage(reference_image_id);
//         return {
//           id,
//           name,
//           image,
//           alt: alt_names,
//           description,
//         } satisfies CatBreedItem;
//       },
//     ),
//   );
// };

export const searchCatBreeds = async (query: string) => {
  const response = await searchCatBreedsByName(query);

  if (!response) {
    return;
  }

  return Promise.all(
    response.map(
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

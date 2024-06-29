import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { searchCatBreeds } from "./lib/fetchCatImagesData";
import CatImagesContainer from "./components/CatImagesContainer";
import { fetchCatImages } from "./actions/fetchCatImages";
import reFetchCatImages from "./actions/reFetchCatImages";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    breed?: string;
  };
}) {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 0;
  const breedId = searchParams?.breed || "";

  const catImages = await fetchCatImages(0, breedId);
  console.log("catImagesserver", JSON.stringify(catImages));

  // const catBreedSearchResult = await searchCatBreeds(searchQuery);
  // const catBreedSearchOptions =
  //   catBreedSearchResult?.map(({ name, id }) => ({
  //     id,
  //     label: name,
  //   })) ?? null;
  // const selectedBreed =
  //   catBreedSearchOptions?.find(({ id }) => id === breedId) ?? null;

  return (
    <Container maxWidth="xl">
      <Box>
        <CatImagesContainer
          searchQuery={searchQuery}
          currentPage={currentPage}
          selectedBreed={null}
          initialCatImageList={catImages}
        />
      </Box>
    </Container>
  );
}

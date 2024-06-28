import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import fetchCatBreeds, {
  fetchCatImages,
  searchCatBreeds,
} from "./lib/fetchCatBreedData";
import CatImagesContainer from "./components/CatImagesContainer";

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
  // console.log("catImages", catImages);
  // const catBreedList = await fetchCatBreeds();
  const catBreedSearchResult = await searchCatBreeds(searchQuery);
  const catBreedSearchOptions = catBreedSearchResult?.map(({ name, id }) => ({
    id,
    label: name,
  }));

  return (
    <Container maxWidth="lg">
      <Box>
        <CatImagesContainer
          searchQuery={searchQuery}
          currentPage={currentPage}
          selectedBreed={breedId}
          catImagesList={catImages}
          catBreedSearchOptions={catBreedSearchOptions}
        />
      </Box>
    </Container>
  );
}

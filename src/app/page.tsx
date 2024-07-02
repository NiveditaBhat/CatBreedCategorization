import Container from "@mui/material/Container";

import CatImagesContainer from "./components/CatImagesContainer";
import { fetchCatImages } from "./actions/fetchCatImages";
import Box from "@mui/material/Box";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    breed_id?: string;
    breed_name?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 0;
  const breedId = searchParams?.breed_id || "";
  const breedName = searchParams?.breed_name || "";

  const selectedBreed =
    breedId && breedName ? { id: breedId, label: breedName } : null;

  const catImages = await fetchCatImages(currentPage, breedId);

  return (
    <Container maxWidth="xl" suppressHydrationWarning>
      <Box>
        <CatImagesContainer
          currentPage={currentPage}
          selectedBreed={selectedBreed}
          initialCatImageList={catImages}
        />
      </Box>
    </Container>
  );
}

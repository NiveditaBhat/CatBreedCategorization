import Container from "@mui/material/Container";

import CatImagesContainer from "./components/CatImagesContainer";
import { fetchCatImages } from "./actions/fetchCatImages";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    breed_id?: string;
    breed_name?: string;
  };
}) {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 0;
  const breedId = searchParams?.breed_id || "";
  const breedName = searchParams?.breed_name || "";

  const selectedBreed =
    breedId && breedName ? { id: breedId, label: breedName } : null;

  const catImages = await fetchCatImages(0, breedId);
  console.log("catImagesserver", JSON.stringify(catImages));

  return (
    <Container maxWidth="xl">
      <CatImagesContainer
        searchQuery={searchQuery}
        currentPage={currentPage}
        selectedBreed={selectedBreed}
        initialCatImageList={catImages}
      />
    </Container>
  );
}

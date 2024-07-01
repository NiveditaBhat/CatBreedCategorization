"use client";

import { CatImage } from "../lib/catBreedTypes";

//import { v4 as uuid } from "uuid";
import Box from "@mui/material/Box";
import SearchCatBreeds from "./SearchCatBreeds";
import CatImageList from "./CatImageList";
type CatImagesContainerProps = {
  searchQuery: string;
  currentPage: number;
  initialCatImageList: CatImage[] | null;
  selectedBreed: { label: string; id: string } | null;
};
export default function CatImagesContainer({
  searchQuery,
  currentPage,
  initialCatImageList,
  selectedBreed,
}: CatImagesContainerProps) {
  //  const id = uuid();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      p={4}
    >
      <SearchCatBreeds selectedBreed={selectedBreed} />
      <CatImageList
        //force re-render when search option updates
        key={Math.random()}
        currentPage={currentPage}
        initialCatImageList={initialCatImageList}
        selectedBreed={selectedBreed?.id ?? ""}
      />
    </Box>
  );
}

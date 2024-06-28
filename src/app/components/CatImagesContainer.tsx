"use client";
import Container from "@mui/material/Container";

import { CatImage } from "../lib/catBreedTypes";
import { Suspense } from "react";

import Box from "@mui/material/Box";
import SearchCatBreeds from "./SearchCatBreeds";
import CatImageList from "./CatBreedList";

type CatImagesContainerProps = {
  searchQuery: string;
  currentPage: number;
  catImagesList: CatImage[] | null;
  selectedBreed: string;
  catBreedSearchOptions: { label: string; id: string }[];
};
export default function CatImagesContainer({
  searchQuery,
  currentPage,
  catImagesList,
  catBreedSearchOptions,
  selectedBreed,
}: CatImagesContainerProps) {
  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        p={4}
      >
        <SearchCatBreeds
          catBreedSearchOptions={catBreedSearchOptions}
          selectedBreed={selectedBreed}
        />
        <Suspense fallback={<div>Loading...</div>}>
          {catImagesList ? (
            <CatImageList
              currentPage={currentPage}
              initialCatImageList={catImagesList}
            />
          ) : (
            <div>No search results</div>
          )}
        </Suspense>
      </Box>
    </Container>
  );
}

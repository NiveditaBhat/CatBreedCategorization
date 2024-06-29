"use client";
import Container from "@mui/material/Container";

import { CatImage } from "../lib/catBreedTypes";
import { Suspense, useId, useState } from "react";

import Box from "@mui/material/Box";
import SearchCatBreeds from "./SearchCatBreeds";
import CatImageList from "./CatBreedList";
import { useRouter } from "next/navigation";
import GenericError from "./GenericError";

type CatImagesContainerProps = {
  searchQuery: string;
  currentPage: number;
  initialCatImageList: CatImage[] | null;
  selectedBreed: { label: string; id: string } | null;
  // catBreedSearchOptions: { label: string; id: string }[] | null;
};
export default function CatImagesContainer({
  searchQuery,
  currentPage,
  initialCatImageList,
  selectedBreed,
}: CatImagesContainerProps) {
  const { refresh } = useRouter();
  const id = useId();

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
        <SearchCatBreeds selectedBreed={selectedBreed} />
        <Suspense fallback={<div>Loading...</div>}>
          {initialCatImageList ? (
            <CatImageList
              key={Math.random()}
              currentPage={currentPage}
              initialCatImageList={initialCatImageList}
            />
          ) : (
            <GenericError onResetClicked={() => refresh()} />
          )}
        </Suspense>
      </Box>
    </Container>
  );
}

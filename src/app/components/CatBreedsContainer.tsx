"use client";

import Container from "@mui/material/Container";
import SearchCats from "./SearchCats";
import CatBreedList from "./CatBreedList";
import { CatBreedItem } from "../lib/catBreedTypes";
import { Suspense } from "react";

type CatBreedsContainerProps = {
  catBreedList: CatBreedItem[] | null;
};
export default function CatBreedsContainer({
  catBreedList,
}: CatBreedsContainerProps) {
  return (
    <Container maxWidth="xl">
      <SearchCats />
      <Suspense fallback={<div>Loading...</div>}>
        {catBreedList ? (
          <CatBreedList initialCatBreedList={catBreedList}></CatBreedList>
        ) : (
          <div>No search results</div>
        )}
      </Suspense>
    </Container>
  );
}

"use client";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GenericError from "./components/GenericError";
import SearchCatBreeds from "@/app/components/SearchCatBreeds";

export default function Error({
  error,
  reset,
  searchParams,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  searchParams?: {
    query?: string;
    page?: string;
    breed_id?: string;
    breed_name?: string;
  };
}) {
  const breedId = searchParams?.breed_id || "";
  const breedName = searchParams?.breed_name || "";

  const selectedBreed =
    breedId && breedName ? { id: breedId, label: breedName } : null;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={20}
        p={4}
      >
        <SearchCatBreeds selectedBreed={selectedBreed} />
        <GenericError onResetClicked={() => reset()} />
      </Box>
    </Container>
  );
}

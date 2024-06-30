"use client";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GenericError from "./components/GenericError";
import SearchCatBreeds from "@/app/components/SearchCatBreeds";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <SearchCatBreeds selectedBreed={null} />
        <GenericError onResetClicked={() => reset()} />
      </Box>
    </Container>
  );
}

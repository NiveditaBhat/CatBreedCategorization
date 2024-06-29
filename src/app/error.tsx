"use client";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GenericError from "./components/GenericError";

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
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <GenericError onResetClicked={reset} />
      </Box>
    </Container>
  );
}

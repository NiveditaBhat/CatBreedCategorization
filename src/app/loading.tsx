import LoadingSkeletonList from "./components/LoadingSkeletonList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Loading() {
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
        <Skeleton height="100px" width="300px" />
        <LoadingSkeletonList />
      </Box>
    </Container>
  );
}

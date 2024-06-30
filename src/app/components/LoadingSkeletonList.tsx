import { Skeleton } from "@mui/material";

import Grid from "@mui/material/Grid";

const TOTAL = 10;

export default function LoadingSkeletonList() {
  return (
    <>
      <Skeleton
        height="50px"
        width="200px"
        sx={{
          alignSelf: "flex-start",
        }}
      />
      <Grid container spacing={2}>
        {Array.from(new Array(TOTAL)).map((key) => (
          <Grid key={key} item sm={6} md={4} lg={3} xl={2} alignItems="center">
            <Skeleton variant="rectangular" height="300px" />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

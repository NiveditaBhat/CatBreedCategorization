"use client";

import Image from "next/image";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { StyledCard } from "./styles";
import { blueGrey } from "@mui/material/colors";

type CatImageItemProps = {
  url: string;
  name: string;
};

export default function CatImageItem({ url, name }: CatImageItemProps) {
  return (
    <StyledCard variant="outlined" tabIndex={0}>
      <Box
        display="flex"
        justifyContent="center"
        bgcolor={blueGrey[50]}
        height="239px"
        width="auto"
        sx={{
          position: "relative",
        }}
      >
        <Image
          src={url}
          fill
          priority={false}
          style={{
            objectFit: "contain",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={`Image of cat breed ${name}`}
        />
      </Box>
      <Typography padding="16px" variant="subtitle1">
        {name}
      </Typography>
    </StyledCard>
  );
}

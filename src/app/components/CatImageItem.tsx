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
          // width={226}
          // height={217}
          fill
          priority={false}
          style={{
            //  height: "100%",
            // width: "auto",
            objectFit: "contain",
          }}
          alt={`Image of cat breed ${name}`}
        />
      </Box>
      <Typography padding="16px" variant="subtitle1">
        {name}
      </Typography>
    </StyledCard>
  );
}

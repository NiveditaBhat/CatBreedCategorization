"use client";
import Grid from "@mui/material/Grid";

import Image from "next/image";

import { CatImage } from "../lib/catBreedTypes";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useId } from "react";

import { useInView } from "react-intersection-observer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchCatImages } from "../actions/fetchCatImages";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { StyledCard } from "./styles";
import { blueGrey } from "@mui/material/colors";

type CatImageListProps = {
  initialCatImageList: CatImage[];
  currentPage: number;
};

export default function CatImageList({
  initialCatImageList,
  currentPage,
}: CatImageListProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { ref, inView } = useInView();
  const [page, setPage] = useState(currentPage);

  const [catImageList, setCatImageList] =
    useState<CatImage[]>(initialCatImageList);

  useEffect(() => {
    const loadMoreCatBreeds = async () => {
      const newList = await fetchCatImages(page + 1);

      if (!newList) {
        return;
      }

      setCatImageList(newList ? [...catImageList, ...newList] : catImageList);
      setPage(page + 1);
    };
    if (inView) {
      // const params = new URLSearchParams(searchParams);
      //
      // params.set("page", String(currentPage + 1));
      // replace(`${pathname}?${params.toString()}`);
      loadMoreCatBreeds();
    }
  }, [inView]);

  return (
    <>
      <Typography
        variant="subtitle1"
        alignSelf="flex-start"
      >{`Showing ${catImageList.length} results`}</Typography>
      <Grid container spacing={2}>
        {catImageList.map(({ id, url, breeds }) =>
          breeds?.map(({ name }) => (
            <Grid key={id} item sm={6} md={4} lg={3} xl={2} alignItems="center">
              <StyledCard variant="outlined" tabIndex={0}>
                <Box
                  display="flex"
                  justifyContent="center"
                  bgcolor={blueGrey[50]}
                  height="239px"
                  width="auto"
                >
                  <Image
                    src={url}
                    width={226}
                    height={217}
                    //fill
                    priority={false}
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "contain",
                    }}
                    alt={`Image of cat breed ${name}`}
                  />
                </Box>
                <Typography padding="16px" variant="subtitle1">
                  {name}
                </Typography>
              </StyledCard>
            </Grid>
          )),
        )}
      </Grid>
      <CircularProgress ref={ref} />
    </>
  );
}

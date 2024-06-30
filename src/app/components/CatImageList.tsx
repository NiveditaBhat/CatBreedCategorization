"use client";
import Grid from "@mui/material/Grid";

import { CatImage } from "../lib/catBreedTypes";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useId, Suspense } from "react";

import { useInView } from "react-intersection-observer";

import { fetchCatImages } from "../actions/fetchCatImages";
import CircularProgress from "@mui/material/CircularProgress";

import CatImageItem from "./CatImageItem";
import LoadingSkeletonList from "@/app/components/LoadingSkeletonList";

type CatImageListProps = {
  initialCatImageList: CatImage[] | null;
  currentPage: number;
  selectedBreed: string;
};

const LIMIT = 10;

export default function CatImageList({
  initialCatImageList,
  currentPage,
  selectedBreed,
}: CatImageListProps) {
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState(currentPage);
  const [loadMoreImages, setLoadMoreImages] = useState(true);
  const [isLaoding, setIsLoading] = useState(false);

  const [catImageList, setCatImageList] = useState<CatImage[] | null>(
    initialCatImageList,
  );

  console.log("catImageList", catImageList);

  useEffect(() => {
    const loadMoreCatBreeds = async () => {
      const newList = await fetchCatImages(offset + LIMIT, selectedBreed);

      if (!newList?.length) {
        setLoadMoreImages(false);
        return;
      }

      setCatImageList((prev) => [...(prev?.length ? prev : []), ...newList]);
      setOffset(offset + LIMIT);
    };
    if (inView) {
      loadMoreCatBreeds();
    }
  }, [inView]);

  return (
    <>
      <Typography
        variant="subtitle1"
        alignSelf="flex-start"
      >{`Showing ${catImageList?.length ?? 0} results`}</Typography>
      <Grid container spacing={2} key={Math.random()}>
        {catImageList?.map(({ url, breeds }) =>
          breeds?.map(({ name, id }) => (
            <Grid
              key={id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              alignItems="center"
            >
              <CatImageItem name={name} url={url} />
            </Grid>
          )),
        )}
      </Grid>
      {loadMoreImages && <CircularProgress ref={ref} />}
    </>
  );
}

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

const PAGE_LIMIT = 10;

export default function CatImageList({
  initialCatImageList,
  currentPage,
  selectedBreed,
}: CatImageListProps) {
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState(currentPage);
  const [loadMoreImages, setLoadMoreImages] = useState(true);

  const [catImageList, setCatImageList] = useState<CatImage[] | null>(
    initialCatImageList,
  );
  const numberOfResults = catImageList?.length ?? 0;

  useEffect(() => {
    const loadMoreCatBreeds = async () => {
      const newList = await fetchCatImages(offset + PAGE_LIMIT, selectedBreed);
      console.log("offset + PAGE_LIMIT", offset + PAGE_LIMIT);
      if (!newList?.length) {
        setLoadMoreImages(false);
        return;
      }

      setCatImageList((prev) => [...(prev?.length ? prev : []), ...newList]);
      setOffset(offset + PAGE_LIMIT);
    };
    if (inView) {
      loadMoreCatBreeds();
    }
  }, [inView]);

  if (!catImageList || numberOfResults === 0) {
    return <Typography variant="h4">No results found</Typography>;
  }

  return (
    <>
      <Typography
        variant="subtitle1"
        alignSelf="flex-start"
      >{`Showing ${numberOfResults} ${numberOfResults == 1 ? "result" : "results"}`}</Typography>
      <Grid container spacing={2} key={Math.random()} role="list">
        {catImageList.map(({ url, breeds }) =>
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
              role="listitem"
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

"use client";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";

import { CatBreedItem, CatImage } from "../lib/catBreedTypes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchMoreCatImages } from "@/app/actions/fetchMoreCatImages";

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
      const newList = await fetchMoreCatImages(page + 1);
      console.log("newList", newList);

      if (!newList) {
        return;
      }
      setCatImageList(newList ? [...catImageList, ...newList] : catImageList);
      setPage(page + 1);
    };
    if (inView) {
      loadMoreCatBreeds();
      // const params = new URLSearchParams(searchParams);
      //
      // params.set("page", String(currentPage + 1));
      // replace(`${pathname}?${params.toString()}`);
    }
  }, [inView]);

  return (
    <>
      <Grid container spacing={1}>
        {initialCatImageList.map(({ id, url, breeds }) =>
          breeds?.map(({ name }) => (
            <Grid
              key={id}
              item
              sm={2}
              md={3}
              lg={4}
              xl={6}
              height={300}
              spacing={1}
              alignItems="center"
            >
              {/*<Paper elevation={1}>*/}
              <Card
                variant="outlined"
                style={{
                  width: "auto",
                  height: "300px",
                }}
              >
                <CardContent
                  style={{
                    position: "relative",
                    width: "auto",
                    height: "90%",
                    backgroundColor: "#ECEFF1",
                  }}
                >
                  <Image
                    src={url}
                    width={226}
                    height={217}
                    priority={false}
                    style={{
                      height: "100%",
                      width: "auto",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    //className="hidden md:block"
                    alt={"image of cat breed"}
                  />
                </CardContent>
                <Typography variant="subtitle1">{name}</Typography>
              </Card>
              {/*</Paper>*/}
            </Grid>
          )),
        )}
      </Grid>
      <div ref={ref}>Loading more...</div>
    </>
  );
}

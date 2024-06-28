import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";

import { CatBreedItem } from "../lib/catBreedTypes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import fetchCatBreeds from "../lib/fetchCatBreeds";
import { useInView } from "react-intersection-observer";
import { fetchMoreCatBreeds } from "../actions/fetchMoreCatBreeds";

type CatBreedListProps = {
  initialCatBreedList: CatBreedItem[];
};

const NUMBER_OF_CATS_TO_FETCH = 10;

export default function CatBreedList({
  initialCatBreedList,
}: CatBreedListProps) {
  const [offset, setOffset] = useState(0);
  const [catBreedList, setCatBreedList] =
    useState<CatBreedItem[]>(initialCatBreedList);
  const { ref, inView } = useInView();

  //Try to use suspense
  useEffect(() => {
    const loadMoreCatBreeds = async () => {
      const newList = await fetchMoreCatBreeds(
        NUMBER_OF_CATS_TO_FETCH,
        offset + 1,
      );

      if (!newList) {
        return;
      }
      setCatBreedList(newList ? [...catBreedList, ...newList] : catBreedList);
      setOffset(offset + 1);
    };
    if (inView) {
      loadMoreCatBreeds();
    }
  }, [inView]);

  return (
    <Grid container spacing={1}>
      {catBreedList.map(({ id, image, alt, name }) =>
        image ? (
          <Grid
            key={id}
            item
            sm={2}
            md={3}
            lg={4}
            xl={6}
            height={300}
            spacing={1}
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
                  src={image.url}
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
                  alt={alt ?? "image of cat breed"}
                />
              </CardContent>
              <Typography variant="subtitle1">{name}</Typography>
            </Card>
            {/*</Paper>*/}
          </Grid>
        ) : null,
      )}
      <div ref={ref}>Loading more...</div>
    </Grid>
  );
}

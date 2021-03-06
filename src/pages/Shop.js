import React from "react";
import { Grid } from "@material-ui/core";

// layout
import MinimalLayout from "../layouts/MinimalLayout";

const images = [
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/1fccca79-8f2e-4b54-8cc8-04bdb5366a81/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/f72a11d8-a0f4-431c-8d7f-ef03509aaae2/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/f72a11d8-a0f4-431c-8d7f-ef03509aaae2/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/1fccca79-8f2e-4b54-8cc8-04bdb5366a81/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/f72a11d8-a0f4-431c-8d7f-ef03509aaae2/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/f72a11d8-a0f4-431c-8d7f-ef03509aaae2/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/1fccca79-8f2e-4b54-8cc8-04bdb5366a81/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/f72a11d8-a0f4-431c-8d7f-ef03509aaae2/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
  {
    value: 1,
    src:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/f72a11d8-a0f4-431c-8d7f-ef03509aaae2/air-max-plus-mens-shoe-0RmbKC.jpg",
  },
];
export default function Shop() {
  return (
    <MinimalLayout>
      <Grid container spacing={4} style={{ padding: "100px" }}>
        {/* {images.map((img, key) => (
          <Grid key={key} item xs={12} md={3} sm={6} lg={3}>
            <img src={img.src} alt="" />
          </Grid>
        ))} */}
        <Grid  item xs={12} md={3} sm={6} lg={3}>
          <img src={images[0].src} alt="" width="90%" />
        </Grid>
        <Grid  item xs={12} md={3} sm={6} lg={3}>
          <img src={images[1].src} alt="" width="90%" />
        </Grid>
      </Grid>
    </MinimalLayout>
  );
}

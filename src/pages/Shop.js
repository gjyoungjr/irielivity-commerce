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
      <Grid container spacing={3}>
        {images.map((img) => (
          <Grid item xs={12} md={4} sm={6} lg={3}>
            <img src={img.src} alt="" />
          </Grid>
        ))}
      </Grid>
    </MinimalLayout>
  );
}

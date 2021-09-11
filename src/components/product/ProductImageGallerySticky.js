import React, { useState, useEffect } from "react";

// components
import Loading from "../loading/LoadingCircular";

export default function ProductImageGallerySticky({ product }) {
  const [productImgs, setProductImgs] = useState([]); // stores combined images
  const [loading, setLoading] = useState(true); // loading state when component first mounts
  let imgs = [];

  // combine product main img and sub imgs
  useEffect(() => {
    if (!product) return; // handle guard
    const { subImages } = product; // destructure to get sub images from props

    imgs.push(product.mainImgUrl); // insert main imgs
    setProductImgs(imgs); // set state
    if (!subImages || subImages.length < 1) return; // if there is no sub images availabe for product break
    subImages.map((img) => imgs.push(img)); // else map through sub imgs & insert
    setProductImgs(imgs); // then set state
  }, [product, productImgs, imgs]);

  // set loading to false after imgs has been set to state
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  console.log(productImgs, "*");

  return (
    <>
      {loading ? (
        <div className="mt-5">
          <Loading size={40} color="black" />
        </div>
      ) : (
        <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
          <div className="product-sticky-image mb--10">
            {productImgs &&
              productImgs.map((imgSrc, key) => {
                return (
                  <div className="product-sticky-image__single mb-10" key={key}>
                    <img
                      src={process.env.PUBLIC_URL + imgSrc}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

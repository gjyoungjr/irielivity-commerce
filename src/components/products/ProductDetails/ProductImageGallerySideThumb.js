import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ProductImageGalleryLeftThumb = ({
  thumbPosition,
  product,
  subImages,
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // stores product images
  let productImages = [];

  // handle guard if data is present
  if (product) {
    // push main image
    productImages.push({
      img: product.mainImgUrl,
    });
    // push sub images

    subImages &&
      subImages.map((img) => {
        return productImages.push({
          img: img,
        });
      });
  }

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: productImages.length,
    loop: true,
    effect: "fade",
    preloadImages: true,
    // Enable lazy loading

    watchSlidesVisibility: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: productImages.length,
    loopedSlides: productImages.length,
    touchRatio: 0.2,
    loop: true,
    preloadImages: true,
    // Enable lazy loading

    slideToClickedSlide: true,
    watchSlidesVisibility: true,
    direction: "vertical",
    breakpoints: {
      1200: {
        slidesPerView: productImages.length,
        direction: "vertical",
      },
      992: {
        slidesPerView: productImages.length,
        direction: "horizontal",
      },
      768: {
        slidesPerView: productImages.length,
        direction: "horizontal",
      },
      640: {
        slidesPerView: productImages.length,
        direction: "horizontal",
      },
      320: {
        slidesPerView: productImages.length,
        direction: "horizontal",
      },
    },
  };

  return (
    <Fragment>
      <div className="row row-5">
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10"
          }`}
        >
          <div className="product-large-image-wrapper">
            <LightgalleryProvider>
              {productImages && productImages.length > 1 ? (
                <Swiper {...gallerySwiperParams}>
                  {productImages.length > 0 &&
                    productImages.map((single, key) => {
                      return (
                        <div key={key}>
                          <LightgalleryItem group="any" src={single.img}>
                            <button>
                              <i className="pe-7s-expand1"></i>
                            </button>
                          </LightgalleryItem>
                          <div className="single-image">
                            <img
                              src={single.img}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              ) : (
                ""
              )}
            </LightgalleryProvider>
          </div>
        </div>
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2"
          }`}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {productImages && productImages.length > 1 ? (
              <Swiper {...thumbnailSwiperParams}>
                {productImages.length > 0 &&
                  productImages.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="single-image">
                          <img src={single.img} className="img-fluid" alt="" />
                        </div>
                      </div>
                    );
                  })}
              </Swiper>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.object,
  thumbPosition: PropTypes.string,
};

export default ProductImageGalleryLeftThumb;

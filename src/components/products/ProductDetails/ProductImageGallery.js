import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ProductImageGallery = ({ product, subImages }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

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

  // swiper slider settings
  const gallerySwiperParams = {
    // getSwiper: getGallerySwiper,
    // spaceBetween: 10,
    // loopedSlides: 4,
    // loop: true,
    // effect: "fade"
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
    preloadImages: true,
    slidesPerView: productImages.length,
    loopedSlides: productImages.length,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {/* {product.productDiscount || product.new ? (
          <div className="product-img-badges">
            {product.productDiscount ? (
              <span className="black">-{product.productDiscount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )} */}
        <LightgalleryProvider>
          {productImages && productImages.length > 1 ? (
            <Swiper {...gallerySwiperParams}>
              {productImages &&
                productImages.map((single, key) => {
                  return (
                    <div key={key}>
                      <LightgalleryItem group="any" src={single.img}>
                        <button>
                          <i className="pe-7s-expand1"></i>
                        </button>
                      </LightgalleryItem>
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
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        {productImages && productImages.length > 1 ? (
          <Swiper {...thumbnailSwiperParams}>
            {productImages &&
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
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object,
};

export default ProductImageGallery;

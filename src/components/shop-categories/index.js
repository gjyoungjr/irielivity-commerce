import React, { useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
// import simpleParallax from "simple-parallax-js";
// imgs
import cat1 from "../../assets/img/cat1.jpg";
import cat2 from "../../assets/img/cat2.jpg";

// component
import AppButton from "../app-button";

const ProductBanner = () => {
  const history = useHistory();
  const imageRef = useRef();

  const handleRedirect = (url) => {
    history.push(url);
  };
  useEffect(() => {
    // new simpleParallax(imageRef.current, {
    //   maxTransition: 60,
    // });
  }, []);
  return (
    <div className="banner-wrapper">
      <p className="banner-title text-left">Collections</p>

      <Grid className="banner-grid" container spacing={3}>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Link to="/shop/Jewelry">
            <img src={cat1} alt="" className="banner-img" ref={imageRef} />
          </Link>

          <div className="container banner-text-1">
            <div className="row">
              {/* <div className="col-xl-3 col-lg-8 col-md-8 col-8"> */}
              <div className="col-xl-10 col-lg-12 col-md-12 col-12">
                <div className="slider-content-3 slider-animated-1 text-left">
                  <p className="banner-subtext">5% off Art Prints</p>
                  <div className="text-left mt-4">
                    <AppButton
                      label="Shop"
                      width="100px"
                      color="white"
                      bgColor="black"
                      onClick={() => handleRedirect("/shop/Jewelry")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6} md={6} sm={6}>
          <Link to="/shop/Cotton-Blend-Yarn">
            <img src={cat2} alt="" className="banner-img" />
          </Link>
          <div className="container banner-text-2">
            <div className="row">
              <div className="col-xl-10 col-lg-12 col-md-12 col-12">
                <div className="slider-content-3 slider-animated-1 text-left">
                  <p className="banner-subtext">5% off Ring Top</p>
                  <div className="text-left mt-4">
                    <AppButton
                      label="Shop"
                      width="100px"
                      color="white"
                      bgColor="black"
                      onClick={() => handleRedirect("/shop/Cotton-Blend-Yarn")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductBanner;

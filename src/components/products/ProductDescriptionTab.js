import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TimelineMax, Expo } from "gsap";

import Accordion from "./Accordion";

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc }) => {
  useEffect(() => {
    let parent = document.querySelectorAll("[data-collapse");
    parent.forEach((element) => {
      let clickTarget = element.querySelector("*");
      let collapseElement = element.nextElementSibling;
      let collapseElementChildren = collapseElement.children;
      let tl = new TimelineMax({
        reversed: true,
        paused: true,
      });

      tl.from(
        collapseElement,
        1.6,
        {
          className: "+=heightZero",
          ease: Expo.easeInOut,
        },
        "open"
      );
      tl.staggerFrom(
        collapseElementChildren,
        1,
        {
          autoAlpha: 0,
          y: "40%",
          ease: Expo.easeInOut,
        },
        0.08,
        "open+=.1"
      );

      clickTarget.addEventListener("click", () => {
        tl.reversed() ? tl.play() : tl.reverse();
      });
    });
  }, []);
  return (
    <div className={`description-review-area mt-4 ${spaceBottomClass}`}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4} sm={4} md={4}>
          <div className="product-details">Product Details</div>
        </Grid>
        <Grid item xs={12} lg={8} sm={8} md={8}>
          <Accordion />
        </Grid>
      </Grid>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;

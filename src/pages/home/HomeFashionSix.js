import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
// import HeroSliderFourteen from "../../wrappers/hero-slider/HeroSliderFourteen";
// import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import TabProductEight from "../../wrappers/product/TabProductEight";
// import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
// import ImageSliderOne from "../../wrappers/image-slider/ImageSliderOne";

import Demo from '../Shop'
const HomeFashionSix = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutSeven>
        {/* hero slider */}
        <Demo />
        {/* section title */}
      
      </LayoutSeven>
    </Fragment>
  );
};

export default HomeFashionSix;

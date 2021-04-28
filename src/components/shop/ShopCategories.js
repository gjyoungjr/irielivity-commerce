import React, { useEffect, Fragment } from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import gsap, { Power2 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// imgs
import cat1 from "../../assets/img/cat1.jpg";
import cat2 from "../../assets/img/cat2.jpg";

gsap.registerPlugin(ScrollTrigger);
const ProductBanner = () => {
  const history = useHistory();

  // const handleRedirect = (url) => {
  //   history.push(url);
  // };
  useEffect(() => {
    let revealContainers = document.querySelectorAll(".img-reveal");

    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          // toggleActions: "restart none none reset",
        },
      });

      tl.set(container, { autoAlpha: 1 });
      tl.from(container, 1.5, {
        xPercent: -70,
        ease: Power2.out,
      });
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out,
      });
    });
  });
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <div
            className="categories-img-container"
            onClick={() => history.push("/shop/Jewelry")}
          >
            <div className="img-reveal">
              <motion.img
                src={cat1}
                alt=""
                whileHover={{
                  scale: 1.1,
                }}
              />
            </div>
          </div>
          <div className="categories-link">T-Shirts</div>
        </Grid>
        <Grid item xs={12} lg={8}>
          {" "}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          {" "}
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="categories-img-container">
            <div className="img-reveal">
              <motion.img
                src={cat2}
                alt=""
                whileHover={{
                  scale: 1.1,
                }}
              />{" "}
            </div>
          </div>
          <div className="categories-link right">Accessories</div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <div className="categories-img-container">
            <div className="img-reveal">
              <motion.img
                src={cat1}
                alt=""
                whileHover={{
                  scale: 1.1,
                }}
              />{" "}
            </div>
          </div>
          <div className="categories-link">Jewelry</div>
        </Grid>
        <Grid item xs={12} lg={8}>
          {" "}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          {" "}
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="categories-img-container">
            <div className="img-reveal">
              <motion.img
                src={cat2}
                alt=""
                whileHover={{
                  scale: 1.1,
                }}
              />{" "}
            </div>
          </div>
          <div className="categories-link right">T-Shirts</div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProductBanner;

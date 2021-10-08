import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

// imgs
import clothingImg from "../../assets/img/home-3.jpg";
import jewelryImg from "../../assets/img/shop.jpg";
import craftImg from "../../assets/img/craft.jpg";

// data for product categories
const productCategories = [
  {
    id: 1,
    label: "Shop",
    url: "/shop",
    imgSrc: clothingImg,
  },
  {
    id: 2,
    label: "About Us",
    imgSrc: jewelryImg,
  },
  {
    id: 3,
    label: "Gallery",
    // url: "/shop/Tops",
    imgSrc: craftImg,
  },
];

const ProductBanner = () => {
  const history = useHistory();

  useEffect(() => {
    // select all imgs
    let images = document.querySelectorAll(".category-item");
    // select slider
    let slider = document.querySelector(".categories-slider");
    let sliderWidth = 0,
      current = 0,
      target = 0,
      ease = 0.05;
    let imgWidth = 0;

    // smooth scroll fxn
    const activateSmoothScroll = (start, end, t) => {
      return start * (1 - t) + end * t;
    };

    // transform div
    const setTransform = (el, transform) => {
      el.style.transform = transform;
    };

    // activate horizontal scroll
    const init = () => {
      sliderWidth = slider.getBoundingClientRect().width;
      imgWidth = sliderWidth / images.length;
      document.body.style.height = `${
        sliderWidth - (window.innerWidth - window.innerHeight)
      }px`;
    };

    // animate slider
    const animate = () => {
      current = parseFloat(activateSmoothScroll(current, target, ease)).toFixed(
        2
      );
      target = window.scrollY;
      setTransform(slider, `translateX(-${current}px)`);
      animateImages();
      requestAnimationFrame(animate);
    };

    // parallax animation on imgs
    const animateImages = () => {
      let ratio = current / imgWidth;
      let intersectionRatioValue;
      images.forEach((img, index) => {
        intersectionRatioValue = ratio - index * 0.7;
        setTransform(img, `translateX(${intersectionRatioValue * 100}px)`);
      });
    };
    init();
    animate();

    //whenver browsers resize run init fxn
    window.addEventListener("resize", () => init());
  }, []);
  return (
    <Fragment>
      <div className="category-bg-title">Collections</div>
      <div className="category-wrapper">
        <div className="categories-slider">
          <div className="categories-slider-inner">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="category-item"
                style={{ backgroundImage: `url(${category.imgSrc})` }}
                onClick={() => {
                  history.push(category.url);
                  window.location.reload();
                }}
              >
                <p className="category-label">{category.label}</p>

                <div className="category-img"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductBanner;

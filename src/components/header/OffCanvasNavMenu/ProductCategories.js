import React from "react";
import { Divider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
//imgs
import img1 from "../../../assets/img/home-5.jpg";
import img2 from "../../../assets/img/home-3.jpg";
import img3 from "../../../assets/img/home-2.jpg";
//icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const productCategories = [
  {
    id: 1,
    label: "Clothing",
    url: "/new/shop",
    imgUrl: img2,
  },
  {
    id: 2,
    label: "Jewelry",
    url: "/",
    imgUrl: img1,
  },
  {
    id: 3,
    label: "Food",
    url: "/",
    imgUrl: img3,
  },
];

export default function ProductCategories({ hideProductCategories }) {
  const history = useHistory();
  return (
    <section className="project">
      <div className="menu-back">
        <p onClick={hideProductCategories}>
          <ArrowBackIcon /> Main Menu
        </p>
      </div>
      <div className="project-container">
        <div>
          <nav className="menu" id="categories-links">
            {productCategories.map((category) => (
              <React.Fragment key={category.id}>
                <Divider className="" style={{ backgroundColor: "white" }} />
                <div className="menu__item">
                  <Link
                    to={category.url}
                    onClick={() => {
                      history.push(category.url);
                      window.location.reload(false);
                    }}
                    className="menu__item-link"
                  >
                    {category.label}
                  </Link>
                  <img
                    className="menu__item-img"
                    src={category.imgUrl}
                    alt=""
                  />
                  <div className="marquee">
                    <div className="marquee__inner">
                      <span>{category.label}</span>
                      <span>{category.label}</span>
                      <span>{category.label}</span>
                      <span>{category.label}</span>
                    </div>
                  </div>
                </div>

                <Divider
                  className="mt-4"
                  style={{ backgroundColor: "white" }}
                />
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

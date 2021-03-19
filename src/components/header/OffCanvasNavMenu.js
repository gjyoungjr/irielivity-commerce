import React, { useEffect } from "react";
import gsap, { TimelineMax, Expo } from "gsap";
import {Link} from 'react-router-dom'

import img1 from "../../assets/img/home-1.jpg";
import img2 from "../../assets/img/home-2.jpg";
gsap.registerPlugin();

export default function Menu() {
  useEffect(() => {
    var t1 = new TimelineMax({ paused: true });

    t1.to(".nav-container1", 1.6, {
      left: 0,
      ease: Expo.easeInOut,
    });

    t1.staggerFrom(
      ".menu > div",
      0.8,
      { y: 100, opacity: 0, ease: Expo.easeOut },
      "0.1",
      "-=0.4"
    );

    t1.staggerFrom(
      ".socials",
      0.8,
      { y: 100, opacity: 0, ease: Expo.easeOut },
      "0.4",
      "-=0.6"
    );

    // grabs DOM Elements
    const openMenu = document.querySelector(".menu-open");
    const closeMenu = document.querySelector(".menu-close");

    // fxn reveleals/hide nav menu on click
    openMenu.addEventListener("click", () => {
      t1.reversed(!t1.reversed());
    });
    closeMenu.addEventListener("click", () => {
      t1.reversed(!t1.reversed());
    });

    t1.reverse();

    // grabs all nav links
    const navItems = document
      .getElementById("menu-items")
      .querySelectorAll("a");
    // for each when clicked, close nav container
    navItems.forEach((item) =>
      item.addEventListener("click", () => {
        t1.reversed(!t1.reversed());
      })
    );
  }, []);
  return (
    <div className="nav-container1">
      <div className="menu-close">Close</div>
      <div className="socials">
        <span>facebook</span>
        <span>instagram</span>
      </div>
      <nav className="menu" id="menu-items">
        <div className="menu__item">
          <Link className="menu__item-link" to="/">
            Home
          </Link>
          <img className="menu__item-img" src={img1} alt="" />
          <div className="marquee">
            <div className="marquee__inner">
              <span>Home - Home - Home - Home - Home - Home - Home</span>
            </div>
          </div>
        </div>
        <div className="menu__item">
          <Link className="menu__item-link"  to="/">Shop</Link>
          <img className="menu__item-img" src={img2} alt="" />
          <div className="marquee">
            <div className="marquee__inner">
              <span>Shop - Shop - Shop - Shop - Shop - Shop - Shop</span>
            </div>
          </div>
        </div>
        <div className="menu__item">
          <Link className="menu__item-link"  to="/">About</Link>
          <img className="menu__item-img" src={img1} alt="" />
          <div className="marquee">
            <div className="marquee__inner">
              <span>About - About - About - About - About - About - About</span>
            </div>
          </div>
        </div>
        <div className="menu__item"  to="/">
          <Link className="menu__item-link">Contact</Link>
          <img className="menu__item-img" src={img1} alt="" />
          <div className="marquee">
            <div className="marquee__inner">
              <span>
                Contact - Contact - Contact - Contact - Contact - Contact -
                Contact
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

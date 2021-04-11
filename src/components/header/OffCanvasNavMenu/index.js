import React, { useEffect, useState } from "react";
import gsap, { TimelineMax, Expo, Power2 } from "gsap";
import { Link } from "react-router-dom";

// components
import ProductCategories from "./ProductCategories";
import AuthFormDialog from "../../auth/FormDialog";
import MobileAuthNav from "./MobileAuthNav";
// icons & imgs
import closeIcon from "../../../assets/img/close-icon.png";
gsap.registerPlugin();

export default function Menu() {
  const [showProductCategories, setShowProductCategories] = useState(false);
  const [showAuthForm, setShowAuthForm] = React.useState(false);

  // handles dipslay of auth form signin /register
  const handleOpenAuthForm = () => {
    setShowAuthForm(true);
  };
  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };
  // handles display of product categories menu
  const handleShowProductCategories = () => {
    setShowProductCategories(true);
  };
  const handleHideProductCategories = () => {
    setShowProductCategories(false);
  };

  // open menu and nav link animations
  useEffect(() => {
    const tl = new TimelineMax({ paused: true });

    tl.to(".nav-menu-left", 1.8, {
      left: 0,
      ease: Expo.easeInOut,
    });

    tl.to(
      ".nav-menu-right",
      1.8,
      {
        right: 0,
        ease: Expo.easeInOut,
      },
      "-=1.8"
    );

    tl.staggerFrom(
      ".nav-menu-links > div",
      0.8,
      {
        y: 100,
        opacity: 0,
        ease: Expo.easeOut,
      },
      "0.1",
      "-=0.4"
    );

    tl.staggerFrom(
      ".mail > div, .socials > div",
      0.8,
      {
        y: 100,
        opacity: 0,
        ease: Expo.easeOut,
      },
      "0.1",
      "-=1"
    );

    tl.from(
      ".nav-menu-close",
      1,
      {
        scale: 0,
        opacity: 1,
        ease: Expo.easeInOut,
      },
      "-=1"
    );

    tl.to(
      ".hr",
      0.4,
      {
        scaleY: 1,
        transformOrigin: "0% 50%",
        ease: Power2.ease,
      },
      "-=2"
    );

    tl.reverse();
    const openMenu = document.querySelector(".menu-open");
    const closeMenu = document.querySelector(".nav-menu-close");

    openMenu.addEventListener("click", () => {
      tl.reversed(!tl.reversed());
    });
    closeMenu.addEventListener("click", () => {
      tl.reversed(!tl.reversed());
    });

    // // grabs all nav links
    const navItems = document
      .getElementById("nav-menu-links")
      .querySelectorAll("a");
    // for each when clicked, close nav container
    navItems.forEach((item, index) => {
      // remove closing menu when shop is clicked
      // because it wil run into product categories
      if (index === 1) return;
      item.addEventListener("click", () => {
        tl.reversed(!tl.reversed());
      });
    });
  }, []);

  return (
    <React.Fragment>
      {/* Log in regsiter form  */}
      <AuthFormDialog open={showAuthForm} onClose={handleCloseAuthForm} />

      <div className="menu-container">
        <div className="nav-menu-close">
          <div className="menu-close-img">
            <img src={closeIcon} alt="" className="nav-close-icon" />
          </div>
        </div>
        <div className="hr"></div>
        <div className="nav-menu1">
          <div className="nav-menu-left">
            {!showProductCategories ? (
              <>
                <div className="nav-menu-links" id="nav-menu-links">
                  <div className="nav-menu-link">
                    <Link to="/">
                      Home <span>01</span>
                    </Link>
                  </div>
                  <div className="nav-menu-link">
                    <Link to="#" onClick={handleShowProductCategories}>
                      Shop <span>02</span>
                    </Link>
                  </div>
                  <div className="nav-menu-link">
                    <Link to="#">
                      Media <span>03</span>
                    </Link>
                  </div>
                  <div className="nav-menu-link">
                    <Link to="#">
                      Contact <span>04</span>
                    </Link>
                  </div>
                </div>

                <MobileAuthNav handleOpenAuthForm={handleOpenAuthForm} />
              </>
            ) : (
              <ProductCategories
                hideProductCategories={handleHideProductCategories}
              />
            )}
          </div>
          <div className="nav-menu-right">
            <div className="contact">
              <div className="mail">
                <div>
                  <span className="title">Contact</span>
                  <br />
                  <br />
                </div>
                <div>
                  <span className="info">
                    <a href="mailto:iriebrand21@gmail.com">
                      iriebrand21@gmail.com
                    </a>
                  </span>
                  <br />
                </div>
              </div>
              <div className="socials">
                <div>
                  <span className="title">Follow Us</span>
                  <br />
                  <br />
                </div>
                <div className="d-flex justify-content-between contact-links">
                  <span className="info">
                    <a href="https://www.instagram.com/irielivity/" target="#">
                      Instagram
                    </a>
                  </span>
                  <span className="info">
                    <a href="https://www.facebook.com/irie.brand" target="#">
                      Facebook
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

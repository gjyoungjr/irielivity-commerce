import React, { useEffect } from "react";
import gsap, { TimelineMax, Expo, Power2 } from "gsap";
import { Link } from "react-router-dom";

// components
import AuthFormDialog from "../../auth/FormDialog";
import MobileAuthNav from "./MobileAuthNav";
// icons & imgs
import closeIcon from "../../../assets/img/close-icon.png";
gsap.registerPlugin();

const menuItems = [
  {
    id: 1,
    name: "Home",
    url: "/home",
    number: "01",
  },
  {
    id: 2,
    name: "Shop",
    url: "/categories",
    number: "02",
  },
  {
    id: 3,
    name: "About",
    url: "/about",
    number: "03",
  },
  {
    id: 4,
    name: "Contact",
    url: "/",
    number: "04",
  },
];
export default function Menu() {
  const [showAuthForm, setShowAuthForm] = React.useState(false);

  // handles dipslay of auth form signin /register
  const handleOpenAuthForm = () => {
    setShowAuthForm(true);
  };
  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
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
            <div className="nav-menu-links" id="nav-menu-links">
              {menuItems.map((item, key) => (
                <div className="nav-menu-link" key={key}>
                  <Link to={item.url}>
                    {item.name} <span>{item.number}</span>
                  </Link>
                </div>
              ))}
            </div>

            <MobileAuthNav handleOpenAuthForm={handleOpenAuthForm} />
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

import React, { useEffect } from "react";
import { Expo, TimelineMax } from "gsap";
import { useHistory, Link } from "react-router-dom";

export default function MinimalLayout({ children }) {
  const history = useHistory();

  useEffect(() => {
    var t1 = new TimelineMax({ paused: true });

    t1.to(".nav", 1.8, {
      width: "100%",
      ease: Expo.easeInOut,
    });

    t1.staggerTo(
      ".nav-item a",
      0.6,
      { top: "0px", ease: Expo.easeInOut },
      0.1,
      "-=0.8"
    );

    t1.reverse();

    const navToggle = document.getElementById("nav_toggle");
    navToggle.addEventListener("click", () => {
      t1.reversed(!t1.reversed());
    });

    const navItems = document.getElementById("nav_items").querySelectorAll("a");

    navItems.forEach((item) =>
      item.addEventListener("click", () => {
        t1.reversed(!t1.reversed());
      })
    );
  }, []);
  return (
    <div className="wrapper">
      <div className="artist" onClick={() => history.push("/")}>
        IRIELIVITY
      </div>
      <div className="watch">
        cart<span className="cart-items-count">(0)</span>
      </div>

      <div className="navbar">
        <div className="nav-toggle" id="nav_toggle">
          menu
        </div>
      </div>

      <div className="nav">
        <div className="nav-items" id="nav_items">
          <div className="nav-item">
            <Link to="/">Home</Link>
            <div className="nav-item-wrapper"></div>
          </div>
          <div className="nav-item">
            <Link to="/new">Merch</Link>
            <div className="nav-item-wrapper"></div>
          </div>
          <div className="nav-item">
            <Link to="#">Media</Link>
            <div className="nav-item-wrapper"></div>
          </div>
          <div className="nav-item">
            <Link to="#">Contact</Link>
            <div className="nav-item-wrapper"></div>
          </div>
          <div className="nav-item">
            <Link to="/login">Account</Link>
            <div className="nav-item-wrapper"></div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "block",
          paddingTop: "100px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

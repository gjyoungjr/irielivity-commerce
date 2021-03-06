import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

// utils
import { landingPageAnimation } from "./animations";

export default function LandingGif() {
  const history = useHistory();

  // run GSAP animation on component first load
  useEffect(() => {
    landingPageAnimation();
  }, []);

  return (
    <div className="wrapper">
      <div className="artist" onClick={() => history.push("/")}>
        IRIELIVITY
      </div>
      <div className="watch">
        cart
        <span className="cart-items-count">(0)</span>
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

      <div className="hero-section">
        <div className="hero-gif"></div>

        <div className="hero-title">
          <h1 className="glitch1">IRIE LIFESTYLE</h1>
        </div>

        <div className="rotatethis">
          <h2 id="rotated">stone • fox • swim • tapcheck • wolves </h2>
        </div>

        <div className="social-media">
          <ul>
            <li>
              <a href="https://www.instagram.com/irielivity/" target="#">
                facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/irielivity/" target="#">
                instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="copyright">
          <ul>
            <li> &#169; IRIELIVITY 2021.</li>
          </ul>
        </div>
      </div>

      <div className="gif-overlay"></div>
    </div>
  );
}

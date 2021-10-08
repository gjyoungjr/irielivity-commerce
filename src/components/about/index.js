import React from "react";
import Slider from "react-slick";

export default function AboutMe() {
  const imgConfigs = {
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    cssEase: "cubic-bezier(.84, 0, .08, .99)",
    // asNavFor: ".text-slider",
    // centerMode: true,
    // infinite: true,
    // prevArrow: $("#prev"),
    // nextArrow: $("#next"),
  };

  return (
    <div className="about-wrapper" id="about-wrapper">
      <div className="about-inner">
        <Slider {...imgConfigs}>
          <div className="about-slide active" id="active">
            <div className="about-card">
              <div className="card-img" id="img01"></div>
              <div className="card-content">
                {/* <p className="card-theme">Biography</p> */}
                <h2 className="card-header" id="know-me">
                  Who we are?
                </h2>
                <p className="card-para">Rasta youths on a journey. IRIE.</p>
                {/* <a className="card-link">Read</a> */}
              </div>
            </div>
          </div>
          <div className="about-slide">
            <div className="about-card">
              <div className="card-img" id="img02"></div>
              <div className="card-content">
                {/* <p className="card-theme">Travel</p> */}
                <h2 className="card-header">Our Mission</h2>
                <p className="card-para">
                  As a collective, the necessity for a Sustainable Rastafari
                  Community in Belize was meditated. We decided to incorporate
                  and dedicate our strength and talents as one, to work towards
                  developing the first ever Self Sustainable Rastafari community
                  in our country Belize.  
                </p>
              </div>
            </div>
          </div>
          <div className="about-slide">
            <div className="about-card">
              <div className="card-img" id="img03"></div>
              <div className="card-content">
                <p className="card-theme"></p>
                <h2 className="card-header">Our Products</h2>
                <p className="card-para">
                  Most of our products are one of a kind as each handcrafted
                  product is individually made with its own irie natural
                  meditation. All our products and services strive to uplift
                  humanity without harming our customers or Mother Naturem,
                  Organic.
                </p>
              </div>
            </div>
          </div>
        </Slider>

        {/* <div className="prevnext">
          <button className="pn-btn" id="prev"></button>
          <button className="pn-btn" id="next"></button>
        </div> */}
      </div>
    </div>
  );
}

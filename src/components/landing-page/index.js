import React from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
// import { IconButton } from "@material-ui/core";
// import { Howl } from "howler";
import { Hidden } from "@material-ui/core";
import CountUp from "react-countup";
// audio
// import introAudio from "../../assets/audio/intro.mp3";
// icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import VolumeOffTwoToneIcon from "@material-ui/icons/VolumeOffTwoTone";
// import VolumeUpIcon from "@material-ui/icons/VolumeUp";

export default function LandingPage({ onFirstLoad }) {
  const history = useHistory();
  // const [isPlaying, setIsPlaying] = useState(false);

  // var sound = new Howl({
  //   src: [introAudio],
  //   autoplay: true,
  //   loop: true,
  //   volume: 0.5,
  //   onend: function () {
  //     console.log("Finished!");
  //   },
  // });

  // config/settings for slider
  const imgConfigs = {
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 2700,
    cssEase: "cubic-bezier(.84, 0, .08, 1)",
    // asNavFor: ".text-slider",
    centerMode: true,
    // prevArrow: $(".prev"),
    // nextArrow: $(".next"),
  };
  const mobileImgConfigs = {
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2700,
    cssEase: "cubic-bezier(.84, 0, .08, .99)",
    // asNavFor: ".text-slider",
    // centerMode: true,
    // prevArrow: $(".prev"),
    // nextArrow: $(".next"),
  };

  const textConfigs = {
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2500,
    cssEase: "cubic-bezier(.84, 0, .08, .99)",
    // asNavFor: ".image-slider",
    // prevArrow: $(".prev"),
    // nextArrow: $(".next"),
  };
  return (
    <div className="landing-wrapper" id="landing-wrapper">
      {onFirstLoad ? (
        <div className="animated-text-container">
          <div className="animated-text-wrapper">
            <div className="loader-text-1 loader-text">
              Loading - <CountUp start={0} end={100} duration={3.5} />%
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="landing-inner">
        <div className="text-slider-wrapper">
          <div className="text-slider">
            <Slider {...textConfigs}>
              <div className="text-slide">
                <h1>
                  we found Haile-I way, <br />
                  trodding now! 🇪🇹
                </h1>
              </div>
              <div className="text-slide">
                <h1>
                  An introduction to <br />
                  Rastafari Livity.
                </h1>
              </div>

              <div className="text-slide">
                <h1>
                  From youths
                  <br />
                  for the youths.
                </h1>
              </div>
              <div className="text-slide">
                <h1>
                  They didn’t
                  <br />
                  teach us the right way,
                </h1>
              </div>
            </Slider>
          </div>
        </div>

        {/* <div
          style={{ position: "absolute", top: "2%", zIndex: "100", right: 15 }}
        >
          {!isPlaying ? (
            <IconButton
              color="primary"
              onClick={() => {
                setIsPlaying(true);
                sound.play();
              }}
            >
              <VolumeOffTwoToneIcon style={{ color: "white" }} />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              onClick={() => {
                setIsPlaying(false);
                sound.stop();
              }}
            >
              <VolumeUpIcon style={{ color: "white" }} />
            </IconButton>
          )}
        </div> */}

        <div className="slider-control">
          <p className="explore" onClick={() => history.push("/categories")}>
            Explore <ArrowForwardIcon />
          </p>
        </div>

        <div className="blocks">
          <div className="block-1"></div>
          <div className="block-2"></div>
          <div className="block-3"></div>
        </div>

        <div className="overlay"></div>

        <div className="image-slider">
          <Hidden mdUp>
            <Slider {...mobileImgConfigs}>
              <div className="image-slide" id="one"></div>
              <div className="image-slide" id="two"></div>
              <div className="image-slide" id="three"></div>
              <div className="image-slide" id="four"></div>
              <div className="image-slide" id="five"></div>
            </Slider>
          </Hidden>
          <Hidden smDown>
            <Slider {...imgConfigs}>
              <div className="image-slide" id="one"></div>
              <div className="image-slide" id="two"></div>
              <div className="image-slide" id="three"></div>
              <div className="image-slide" id="four"></div>
              <div className="image-slide" id="five"></div>
            </Slider>
          </Hidden>
        </div>
      </div>
    </div>
  );
}

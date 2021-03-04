import { TweenMax, TweenLite, Expo, TimelineMax } from "gsap";
import CircleType from "circletype";

const landingPageAnimation = () => {
  new CircleType(document.getElementById("rotated"));

  TweenMax.from(".artist", 2, {
    delay: 5.4,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut,
  });

  TweenMax.from(".watch", 2, {
    delay: 5.5,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut,
  });

  TweenMax.from(".navbar", 2, {
    delay: 5.6,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut,
  });

  TweenMax.from(".rotatethis", 2, {
    delay: 6,
    opacity: 0,
    ease: Expo.easeInOut,
  });

  TweenMax.staggerFrom(
    ".social-media ul li",
    2,
    {
      delay: 5.7,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut,
    },
    0.1
  );

  TweenMax.staggerFrom(
    ".copyright ul li",
    2,
    {
      delay: 5.9,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut,
    },
    0.1
  );

  TweenLite.fromTo(
    ".hero-title h1",
    0.3,
    {
      x: -6,
      y: 2,
      opacity: 0,
    },
    {
      delay: 5,
      x: 6,
      y: -2,
      opacity: 1,

      clearProps: "all",
    }
  );

  TweenLite.fromTo(
    ".hero-title p",
    0.3,
    {
      x: -6,
      y: 2,
      opacity: 0,
    },
    {
      delay: 9,
      x: 6,
      y: -2,
      opacity: 1,
      clearProps: "all",
    }
  );

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

  // add effects on nav menu off canvas
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
};

export { landingPageAnimation };

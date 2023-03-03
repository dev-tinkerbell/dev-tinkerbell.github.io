// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
//   direction: "vertical", // vertical, horizontal
//   gestureDirection: "vertical", // vertical, horizontal, both
//   smooth: true,
//   mouseMultiplier: 1,
//   smoothTouch: false,
//   touchMultiplier: 2,
//   infinite: false,
// });

// //get scroll value
// lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
//   console.log({ scroll, limit, velocity, direction, progress });
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);
// gsap.registerPlugin(ScrollTrigger);

class Interactions {
  constructor(element, animate) {
    this.element = element;
    this.animate = animate;
  }

  createGsap(scrollTrigger) {
    this.animate = { scrollTrigger };
    return gasp.to(this.element, this.animate);
  }
}

const ElEMENTS = {
  newHeroSection: document.querySelector(".new-hero__section"),
  heroScrollWrapperContainer: document.querySelector(
    ".hero-scroll__wrapper-container"
  ),
  // heroTextWrapper: document.querySelector(".hero-text__wrapper"),
  // mainTitle: document.querySelector("h1"),
  heroScrollWrapper: document.querySelector(".hero-scroll__wrapper"),
  heroScrollParagraph: document.querySelectorAll(".hero-scroll__paragraph"),
};

gsap.to("h1", {
  scale: 1,
  duration: 1.5,
});

const textTimeLine = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-scroll__wrapper-container",
    start: "5% top",
    end: "bottom -30%",
    toggleActions: "play pause resume reset",
    scrub: 1,
    // markers: true,
  },
});

textTimeLine
  .to(".hero-background__heading", {
    scale: 0.7,
    opacity: 0,
  })
  .to(".hero-scroll__paragraph.is--one", {
    scale: 1,
    opacity: 1,
  })
  .set(".hero-scroll__paragraph.is--one", {
    opacity: 0,
  })
  .to(".hero-scroll__paragraph.is--two", {
    scale: 1,
    opacity: 1,
  });

const rotateCardTimeLine = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-scroll__wrapper-container",
    start: "45% top",
    end: "95% center",
    toggleActions: "play pause resume reset",
    scrub: 1,
    // markers: true,
  },
});

rotateCardTimeLine.fromTo(
  ".opacity__wrapper",
  { opacity: 0 },
  {
    opacity: 1,
  }
);

gsap.to(".hero-scroll__wrapper", {
  scrollTrigger: {
    trigger: ".hero-text__wrapper",
    start: "40% top",
    end: "bottom -100%",
    toggleActions: "play pause resume reset",
    scrub: 1,
    // markers: true,
  },

  scale: 4.5,
  rotate: "225deg",
});

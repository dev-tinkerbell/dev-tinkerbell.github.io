let currentViewport = null;

const viewportList = {
  PC: "PC",
  MOBILE: "MOBILE",
};

const lottieList = {
  PC: "#lottie-animation-pc",
  MOBILE: "#lottie-animation-mobile",
};

function getViewport() {
  let width = window.innerWidth;

  if (width > 480) return viewportList.PC;
  return viewportList.MOBILE;
}

function onInterectionInPc() {
  // init aniamtion
  gsap.fromTo(
    ".hero-background__heading",
    {
      scale: 0.9,
    },
    {
      scale: 1,
      duration: 1.5,
    }
  );

  // heading, paragraph animation
  const textTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: ".is--pc .hero-scroll__wrapper-container",
      start: "top top",
      end: "bottom -40%",
      toggleActions: "play pause resume reset",
      scrub: 1.5,
      // markers: true,
    },
  });

  textTimeLine
    .to(".hero-background__heading", {
      scale: 0.7,
      autoAlpha: 0,
      duration: 2,
    })
    .fromTo(
      ".hero-scroll__paragraph.is--one",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
      }
    )
    .set(".hero-scroll__paragraph.is--one", {
      autoAlpha: 0,
    })
    .fromTo(
      ".hero-scroll__paragraph.is--two",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 2,
      }
    );

  const rotateCardTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: ".is--pc .hero-scroll__wrapper-container",
      start: "50% top",
      end: "200% center",
      toggleActions: "play pause resume reset",
      scrub: 1.5,
      // markers: true,
    },
  });

  rotateCardTimeLine.fromTo(
    ".hero-scroll__wrapper",
    {
      scale: 0.5,
      rotate: "45deg",
    },
    {
      autoAlpha: 1,
      scale: 4.5,
      rotate: "225deg",
      ease: "none",
    }
  );

  gsap.to(".dim", {
    scrollTrigger: {
      trigger: ".is--pc .hero-scroll__wrapper-container",
      start: "50% top",
      end: "bottom center",
      toggleActions: "play pause resume reset",
      scrub: 1.5,
      // markers: true,
    },
    autoAlpha: 0,
  });

  gsap.to(".mockup-cards__wrapper", {
    scrollTrigger: {
      trigger: ".mockup-cards-opening__section",
      start: "top bottom",
      end: "bottom center",
      toggleActions: "play pause resume reset",
      scrub: 1.5,
      // markers: true,
    },
    scale: 1.2,
  });

  gsap.to(".mockup-cards__wrapper img[data-position]", {
    scrollTrigger: {
      trigger: ".mockup-cards-opening__section",
      start: "top bottom",
      end: "bottom 10%",
      scrub: 1.5,
      // markers: true,
    },
    x: (i, el) => el.getAttribute("data-position"),
    ease: "none",
  });

  playLottie(lottieList.PC);
}

function onInterectionInMobile() {
  // init aniamtion
  gsap.fromTo(
    ".mobile-hero-mockup__wrapper",
    {
      autoAlpha: 0,
      scale: 0.5,
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 1.5,
    }
  );

  gsap.to(".mobile-hero-mockup__wrapper img[data-position]", {
    x: (i, el) => `${el.getAttribute("data-position")}px`,
    duration: 1.5,
  });

  gsap.to(".hero-background__heading.is--mobile", {
    y: "-30px",
    duration: 1,
  });

  // move card animation
  const showCardTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".is--mobile.mobile-hero__section",
      start: "top top",
      end: "30% center",
      toggleActions: "play pause resume reset",
      scrub: 2,
      // markers: true,
    },
  });

  showCardTimeline.fromTo(
    ".mobile-hero-mockup__wrapper img[data-position]",
    {
      x: (i, el) => `${el.getAttribute("data-position")}px`,
    },
    {
      x: "0px",
    }
  );

  // scale down, up animation
  const scaleCardTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".is--mobile.mobile-hero__section",
      start: "top top",
      end: "30% center",
      toggleActions: "play pause resume reset",
      scrub: 2,
      // markers: true,
    },
  });

  scaleCardTimeline.fromTo(
    ".mobile-hero-mockup__wrapper",
    {
      autoAlpha: 1,
      scale: 1,
    },
    {
      autoAlpha: 0,
      scale: 0.5,
    }
  );

  // show, hide heading animation
  gsap.to(".hero-background__heading.is--mobile", {
    scrollTrigger: {
      trigger: ".is--mobile.mobile-hero__section",
      start: "top top",
      end: "20% center",
      toggleActions: "play pause resume reset",
      scrub: 1.5,
      // markers: true,
    },
    autoAlpha: 0,
  });

  // rotate card animation
  const rotateCardTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: ".is--mobile.mobile-hero__section",
      start: "32% center",
      end: "bottom bottom",
      toggleActions: "play pause resume reset",
      scrub: 2,
      // markers: true,
    },
  });

  rotateCardTimeLine.fromTo(
    ".is--mobile .hero-scroll__wrapper",
    {
      scale: 0.5,
      rotate: "45deg",
    },
    {
      autoAlpha: 1,
      scale: 4.5,
      rotate: "225deg",
      ease: "none",
    }
  );

  gsap.to(".is--mobile .dim", {
    scrollTrigger: {
      trigger: ".is--mobile.mobile-hero__section",
      start: "32% center",
      end: "35% center",
      toggleActions: "play pause resume reset",
      scrub: 2,
      // markers: true,
    },
    autoAlpha: 0,
  });

  // heading, paragraph animation
  const textTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: ".is--mobile.mobile-hero__section",
      start: "38% center",
      end: "bottom bottom",
      toggleActions: "play pause resume reset",
      scrub: 2,
      // markers: true,
    },
  });

  textTimeLine
    .fromTo(
      ".is--mobile .hero-scroll__paragraph.is--1",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
      }
    )
    .set(".is--mobile .hero-scroll__paragraph.is--1", {
      autoAlpha: 0,
    })
    .fromTo(
      ".is--mobile .hero-scroll__paragraph.is--2",
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      }
    );
}

function playLottie(target) {
  LottieScrollTrigger({
    target,
    path: "https://global-uploads.webflow.com/639e76b6a0716a69a2134f59/63bd80d5bfbced1b1d641e5a_healthy-competition__animation.json",
  });

  function LottieScrollTrigger(lottieObject) {
    let playhead = { frame: 0 };
    let target = gsap.utils.toArray(lottieObject.target)[0];
    let customScrollTrigger = {
      trigger: target,
      start: "top center",
      end: "center center",
      scrub: 2,
      // markers: true,
    };
    let context = gsap.context && gsap.context();
    let animation = lottie.loadAnimation({
      container: target,
      renderer: lottieObject.renderer || "svg",
      loop: false,
      autoplay: false,
      path: lottieObject.path,
      rendererSettings: lottieObject.rendererSettings || {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    for (let p in lottieObject) {
      // let users override the ScrollTrigger defaults
      customScrollTrigger[p] = lottieObject[p];
    }

    animation.addEventListener("DOMLoaded", function () {
      let createTween = function () {
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: "none",
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: customScrollTrigger,
        });
        return () => animation.destroy && animation.destroy();
      };

      context && context.add ? context.add(createTween) : createTween();
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return animation;
  }
}

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  playLottie(lottieList.MOBILE);

  if (getViewport() === viewportList.PC) {
    currentViewport = viewportList.PC;
    return onInterectionInPc();
  }

  currentViewport = viewportList.MOBILE;
  onInterectionInMobile();
});

window.addEventListener("resize", () => {
  let previouseViewport = currentViewport;
  currentViewport = getViewport();

  if (
    currentViewport === viewportList.PC &&
    previouseViewport !== viewportList.PC
  ) {
    return onInterectionInPc();
  }

  if (
    currentViewport === viewportList.MOBILE &&
    previouseViewport !== viewportList.MOBILE
  ) {
    ScrollTrigger.refresh();
    return onInterectionInMobile();
  }
});

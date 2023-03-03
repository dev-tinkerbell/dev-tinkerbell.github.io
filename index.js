window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

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

  // text animation
  const textTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-scroll__wrapper-container",
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
      trigger: ".hero-scroll__wrapper-container",
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
      trigger: ".hero-scroll__wrapper-container",
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

  gsap.to("[data-position]", {
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

  LottieScrollTrigger({
    target: "#animationWindow",
    path: "https://global-uploads.webflow.com/639e76b6a0716a69a2134f59/63bd80d5bfbced1b1d641e5a_healthy-competition__animation.json",
    scrub: 2,
  });

  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      st = {
        trigger: target,
        start: "top center",
        end: "center center",
        scrub: 1.5,
        // markers: true,
      },
      ctx = gsap.context && gsap.context(),
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path,
        rendererSettings: vars.rendererSettings || {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    for (let p in vars) {
      // let users override the ScrollTrigger defaults
      st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function () {
      let createTween = function () {
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: "none",
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st,
        });
        return () => animation.destroy && animation.destroy();
      };
      ctx && ctx.add ? ctx.add(createTween) : createTween();
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return animation;
  }
});

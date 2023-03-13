class Viewport {
  constructor() {
    this.pc = "PC";
    this.mobile = "MOBILE";
    this.currentDevice = null;
    this.previouseViewport = null;
  }

  setDevice() {
    let width = window.innerWidth;
    this.previouseViewport = this.currentDevice;

    if (width > 480) {
      this.currentDevice = this.pc;
    } else {
      this.currentDevice = this.mobile;
    }

    this.excuteScript();
  }

  excuteScript() {
    if (this.currentDevice === this.previouseViewport) return;

    if (this.currentDevice === this.pc) {
      return new InteractionOnPc().render();
    }
    new InteractionOnMobile().render();
  }
}

const toggleActions = "play pause resume reset";

class InteractionLottie {
  constructor() {
    this.lottieListElements = {
      PC: "#lottie-animation-pc",
      MOBILE: "#lottie-animation-mobile",
    };
  }

  playLottie(target) {
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
        end: "70% bottom",
        scrub: 2,
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
      });

      return animation;
    }
  }
}

class InteractionOnPc {
  render() {
    this.setInitAnimation();
    this.setHeadeingParagraphAnimation();
    this.setHeroScrollCardsAnimation();
    this.setMockupCardsAnimation();
  }

  setInitAnimation() {
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
  }

  setHeadeingParagraphAnimation() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".is--pc .hero-scroll__wrapper-container",
          start: "top top",
          end: "bottom -40%",
          toggleActions,
          scrub: 1.5,
        },
      })
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
  }

  setHeroScrollCardsAnimation() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".is--pc .hero-scroll__wrapper-container",
          start: "50% top",
          end: "200% center",
          toggleActions,
          scrub: 1.5,
        },
      })
      .fromTo(
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
        toggleActions,
        scrub: 1.5,
      },
      autoAlpha: 0,
    });
  }

  setMockupCardsAnimation() {
    gsap.to(".mockup-cards__wrapper", {
      scrollTrigger: {
        trigger: ".mockup-cards-opening__section",
        start: "top bottom",
        end: "bottom center",
        toggleActions,
        scrub: 1.5,
      },
      scale: 1.2,
    });

    gsap.to(".mockup-cards__wrapper img[data-position]", {
      scrollTrigger: {
        trigger: ".mockup-cards-opening__section",
        start: "top bottom",
        end: "bottom 10%",
        scrub: 1.5,
      },
      x: (i, el) => el.getAttribute("data-position"),
      ease: "none",
    });
  }
}

class InteractionOnMobile {
  render() {
    this.setMockupCardsAnimation();
    this.setHeadingAnimation();
    this.setHeroScrollCardsAnimation();
    this.setParagraphAnimation();

    // this.setInitAnimation();
  }

  setInitAnimation() {
    const mockupAnimation01 = gsap
      .fromTo(
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
      )
      .paused(true);

    const mockupAnimation02 = gsap
      .fromTo(
        ".mobile-hero-mockup__wrapper img[data-position]",
        {
          x: 0,
        },
        {
          x: (i, el) => `${el.getAttribute("data-position")}px`,
          duration: 1.5,
        }
      )
      .paused(true);

    const headingAnimation = gsap
      .to(".hero-background__heading.is--mobile", {
        y: "-30px",
        duration: 1,
      })
      .paused(true);

    setTimeout(() => {
      if (window.scrollY < 10) {
        mockupAnimation01.paused(false);
        mockupAnimation02.paused(false);
        headingAnimation.paused(false);
      }
    }, 50);
  }

  setMockupCardsAnimation() {
    const start = "start";
    const end = "end";

    function getPosition(standard) {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const endPoint = window.innerHeight * 0.7;
      const cardScrollSection = window.scrollY < window.innerHeight * 2;

      if (standard === start && cardScrollSection) {
        return scrollTop * -1;
      }

      if (standard === end && cardScrollSection) {
        return scrollTop * -1 + endPoint;
      }

      if (standard === start && !cardScrollSection) {
        return windowHeight * -2;
      }

      if (standard === end && !cardScrollSection) {
        return windowHeight * -2 + endPoint;
      }
    }

    let isEnterBack = false;
    let isEnter = false;

    // scale, opacity animation
    gsap.fromTo(
      ".mobile-hero-mockup__wrapper",
      {
        autoAlpha: 1,
        scale: 1,
      },
      {
        autoAlpha: 0,
        scale: 0.5,
        scrollTrigger: {
          trigger: ".is--mobile .hero-scroll__wrapper-container",
          start: `${getPosition(start) - 1}px top`,
          end: `${getPosition(end)}px center`,
          toggleActions,
          scrub: 1,

          onEnter: () => (isEnter = true),
          onEnterBack: () => (isEnterBack = true),
          onUpdate: (self) => {
            if (self.progress < 0.05 && !isEnterBack && !isEnter) {
              document
                .querySelector(".is--mobile .mobile-hero-mockup__wrapper")
                .classList.add("mobile-active");
            }
          },
        },
      }
    );

    // tanslateX animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".is--mobile .hero-scroll__wrapper-container",
          start: `${getPosition(start)}px top`,
          end: `${getPosition(end)}px center`,
          toggleActions,
          scrub: 1,
        },
      })
      .fromTo(
        ".mobile-hero-mockup__wrapper img[data-position]",
        {
          x: (i, el) => `${el.getAttribute("data-position")}px`,
        },
        {
          x: "0px",
        }
      );
  }

  setHeadingAnimation() {
    gsap.fromTo(
      ".hero-background__heading.is--mobile",
      {
        autoAlpha: 1,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: ".mobile-hero__section",
          start: "top top",
          end: "20% center",
          toggleActions,
          scrub: 0.8,
        },
        autoAlpha: 0,
        scale: 0.5,
      }
    );
  }

  setHeroScrollCardsAnimation() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".mobile-hero__section",
          start: "32% center",
          end: "bottom bottom",
          toggleActions,
          scrub: 1,
        },
      })
      .fromTo(
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
        trigger: ".mobile-hero__section",
        start: "32% center",
        end: "35% center",
        toggleActions,
        scrub: 1,
      },
      autoAlpha: 0,
    });
  }

  setParagraphAnimation() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".mobile-hero__section",
          start: "38% center",
          end: "bottom bottom",
          toggleActions,
          scrub: 1,
        },
      })
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
}

gsap.registerPlugin(ScrollTrigger);

const viewport = new Viewport();

window.addEventListener("load", () => {
  viewport.setDevice();

  const interactionLottie = new InteractionLottie();
  interactionLottie.playLottie(interactionLottie.lottieListElements.MOBILE);
  interactionLottie.playLottie(interactionLottie.lottieListElements.PC);
});

window.addEventListener("resize", () => {
  viewport.setDevice();
});

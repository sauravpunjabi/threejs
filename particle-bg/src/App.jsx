import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "./components/ParticleBackground";


// Register ScrollTrigger so GSAP can react to page scrolling
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  /*
    appRef points to the main page container.
    GSAP uses this as the animation scope.
  */
  const appRef = useRef(null);

  /*
    This value is shared between GSAP and R3F.

    GSAP changes this value while scrolling.
    R3F reads this value inside useFrame.

    This is the bridge:
    GSAP scroll animation → React ref → R3F particle movement
  */
  const scrollProgress = useRef(0);

  useLayoutEffect(() => {
    /*
      gsap.context keeps animations scoped to appRef.
      It also helps clean everything properly when the component unmounts.
    */
    const ctx = gsap.context(() => {
      /*
        Hero text entrance animation.

        It selects every direct child inside .hero-content:
        eyebrow, h1, paragraph.
      */
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      /*
        This is the important scroll animation.

        We animate:
        scrollProgress.current from 0 to 1

        Because scrub is true, it follows the scroll position smoothly.
      */
      gsap.to(scrollProgress, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      /*
        This fades and scales the whole canvas background
        when the content section starts coming in.
      */
      gsap.to(".particle-bg", {
        opacity: 0.45,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".content-section",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      /*
        Card animation on scroll.
        Cards move up and fade in when the section enters the viewport.
      */
      gsap.from(".section-card", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-section",
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });
    }, appRef);

    // Cleanup GSAP animations when component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <main ref={appRef} className="app">
      {/*
        Pass scrollProgress to the 3D background.
        GSAP updates it, particles use it.
      */}
      <ParticleBackground scrollProgressRef={scrollProgress} />

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">R3F + GSAP</p>
          <h1>Soft Particle Wave</h1>
          <p>
            A cinematic particle background that reacts smoothly while you
            scroll.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-card">
          <span>01</span>
          <h2>Particles move with scroll</h2>
          <p>
            GSAP controls scroll progress, and React Three Fiber uses that value
            to move the particle field.
          </p>
        </div>

        <div className="section-card">
          <span>02</span>
          <h2>DOM text animates separately</h2>
          <p>
            Text and cards use normal GSAP animations while the background stays
            inside the 3D canvas.
          </p>
        </div>
      </section>
    </main>
  );
}
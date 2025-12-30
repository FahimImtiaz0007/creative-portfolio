
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null); // Ref for "Creator" changing text
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial State Set
      gsap.set(badgeRef.current, { y: 20, opacity: 0 });
      gsap.set(titleRef.current, { y: 20, opacity: 1, scale: 1.1, filter: "blur(12px)" }); // Reduced blur/scale for performance
      // Ensure subtitle is fully hidden initially
      gsap.set(subtitleRef.current, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 1, letterSpacing: "0.5em" });
      gsap.set([descRef.current, buttonsRef.current], { y: 20, opacity: 0, filter: "blur(10px)" });

      // Helper for cycling words (Intro one-off)
      const cycleWords = (target: HTMLElement, words: string[], finalWord: string, duration: number, startDelay: number = 0) => {
        const cycleTl = gsap.timeline({ delay: startDelay });
        const interval = duration / (words.length + 1);

        words.forEach((word) => {
          cycleTl.to(target, {
            duration: interval,
            onStart: () => { if (target) target.innerText = word; },
          });
        });

        cycleTl.to(target, {
          duration: interval,
          onStart: () => { if (target) target.innerText = finalWord; }
        });
        return cycleTl;
      };

      // 2. Entrance Animation
      tl.to(badgeRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out"
      })
        .to(titleRef.current, {
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out" // Smoother easing than circ.out
        }, "-=0.5");

      // Removed "Imtiaz" cycling per user feedback ("you changed imtiaz not creator")

      tl.to(subtitleRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        letterSpacing: "0em",
        duration: 1.2,
        ease: "power2.inOut",
      }, "-=1.0")
        .to(descRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
        }, "-=0.8")
        .to(buttonsRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.7)"
        }, "-=1.0");

      // 4. Random "Glitch" Effect for Badge
      const glitchAnim = gsap.timeline({ repeat: -1, repeatDelay: 5 });
      glitchAnim
        .to(badgeRef.current, { skewX: 20, duration: 0.1, ease: "power4.inOut" })
        .to(badgeRef.current, { skewX: -20, duration: 0.1, ease: "power4.inOut" })
        .to(badgeRef.current, { skewX: 0, duration: 0.1, ease: "power4.inOut" })
        .to(badgeRef.current, { opacity: 0.5, duration: 0.05, yoyo: true, repeat: 3 }, "-=0.3"); // Flicker

      // 5. Infinite Text Cycling for "Creator"
      // Starts after the main sequence settles.
      const infiniteLoop = gsap.timeline({ repeat: -1, delay: 4 });
      const roles = ["Visualist", "Artist", "Creator"]; // Cycle through these

      roles.forEach((role) => {
        infiniteLoop
          .to(roleRef.current, {
            opacity: 0,
            y: -20,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "power2.in",
            delay: 0.5 // Faster cycle (Total ~1.5s)
          })
          .call(() => {
            if (roleRef.current) roleRef.current.innerText = role;
          })
          .set(roleRef.current, { y: 20 })
          .to(roleRef.current, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out"
          });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16" ref={containerRef}>
      {/* Expanded Glow effect for wider focal point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-brand-500/10 blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 text-center">
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8 rounded-full border border-brand-500/30 bg-brand-500/5 px-6 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400 opacity-0 transform translate-y-4 will-change-[transform,opacity]">
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
          AI Visual Synthesis
        </div>

        <h1 ref={titleRef} className="mb-8 text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.9] opacity-0 transform translate-y-8 will-change-[transform,opacity,filter]">
          Fahim <span ref={lastNameRef} className="text-brand-600 dark:text-brand-500">Imtiaz</span>
        </h1>

        <h1 ref={subtitleRef} className="mb-8 text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.9] text-gray-900 dark:text-white opacity-0 transform translate-y-8 will-change-[transform,opacity,clip-path]" style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}>
          AI <span ref={roleRef}>Creator</span>
        </h1>

        <p ref={descRef} className="mx-auto mb-14 max-w-4xl text-xl text-gray-600 dark:text-gray-400 sm:text-2xl font-light leading-relaxed opacity-0 transform translate-y-4 will-change-[transform,opacity]">
          Crafting tomorrow's visual language today. A demonstration of production-ready AI video and image generation, showcasing the commercial potential of generative creativity.
        </p>

        <div ref={buttonsRef} className="flex flex-col items-center justify-center gap-6 sm:flex-row opacity-0 transform translate-y-4 will-change-[transform,opacity]">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <a
              href="#showcase"
              onClick={(e) => handleScroll(e, '#showcase')}
              className="relative flex items-center justify-center w-full overflow-hidden rounded-2xl bg-brand-600 px-12 py-5 text-center text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:w-auto"
            >
              <span className="relative z-10">Explore Videos</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"></div>
            </a>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white via-gray-200 to-white rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <a
              href="#images"
              onClick={(e) => handleScroll(e, '#images')}
              className="relative flex items-center justify-center w-full overflow-hidden rounded-2xl bg-white px-12 py-5 text-center text-sm font-black uppercase tracking-[0.2em] text-slate-900 transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:w-auto"
            >
              <span className="relative z-10">Explore Images</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-900/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"></div>
            </a>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="relative flex items-center justify-center w-full rounded-2xl border border-white/20 bg-slate-950/50 px-12 py-5 text-center text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-95 sm:w-auto"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

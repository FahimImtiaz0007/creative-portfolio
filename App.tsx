
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryCard from './components/GalleryCard';
import Modal from './components/Modal';
import Contact from './components/Contact';
import CoreExpertise from './components/CoreExpertise';
import { IMAGES, VIDEOS } from './constants';
import { GalleryItem } from './types';

/**
 * AI Neural Motion Background
 * Generates a connected network of particles drifting through space
 */
const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 180;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const color = isDark ? `rgba(139, 92, 246, ${this.alpha})` : `rgba(139, 92, 246, ${this.alpha * 0.8})`;
        ctx.fillStyle = color;

        if (isDark) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
        } else {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(139, 92, 246, 0.2)';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx, isDark);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / connectionDistance) * (isDark ? 0.25 : 0.3);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-90 dark:opacity-100 transition-opacity duration-1000"
      />
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none"></div>
    </div>
  );
};

import profileImg from './images/1.png';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(10); // Start with 10 images

  const aboutRef = useRef<HTMLElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const bioTextRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(10);

  const visibleImages = IMAGES.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, IMAGES.length));
  };

  useLayoutEffect(() => {
    if (!imageGridRef.current) return;
    if (visibleCount > prevCountRef.current) {
      const items = Array.from(imageGridRef.current.children);
      const newItems = items.slice(prevCountRef.current);
      if (newItems.length > 0) {
        gsap.fromTo(newItems,
          { y: 100, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)", overwrite: true }
        );
      }
    }
    prevCountRef.current = visibleCount;
  }, [visibleCount]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // About Section Animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Digital Portrait Scan (Scale + Spin + Materialize)
      tl.from(profileContainerRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1,
        ease: "back.out(1.5)"
      })
        .from(bioTextRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5");

    }, aboutRef); // Scope to aboutRef usually, but here checking scope carefully. 
    // Ideally scope to a container wrapping the elements. using aboutRef is good if it wraps them.

    return () => ctx.revert();
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <NeuralBackground />

      <div className="relative z-10">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main>
          <Hero />

          {/* Video Gallery Section */}
          <section id="showcase" className="py-24 scroll-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row max-w-[1400px] mx-auto">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-brand-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]"></div>
                  <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase">AI Video Archive</h2>
                  <p className="mt-2 text-sm font-medium tracking-widest text-gray-500 dark:text-gray-400 uppercase">Latent motion & fluid synthesis</p>
                </div>
                <div className="h-px flex-1 bg-gray-200 dark:bg-white/10 md:mx-10"></div>
              </div>

              {/* Video Grid - Gapless Masonry Layout */}
              {/* CSS Columns (Masonry) allow items to stack naturally without vertical gaps */}
              {/* Video Grid - Pinterest Style Dense Grid */}
              {/* Video Grid - Pinterest Style Dense Grid */}
              <div
                className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto sm:auto-rows-[150px] md:auto-rows-[180px]"
                style={{ gridAutoFlow: 'dense' }}
              >
                {VIDEOS.map((vid) => {
                  const isPortrait = vid.aspectRatio === '9/16';

                  return (
                    <div
                      key={vid.id}
                      className={`relative perspective-[1000px] ${isPortrait ? 'sm:row-span-3' : 'sm:row-span-1'}`}
                    >
                      <GalleryCard item={vid} onClick={setSelectedItem} />
                    </div>
                  );
                })}
              </div>

              {/* Still Image Section */}
              <div id="images" className="scroll-mt-24 mb-16 mt-40 flex flex-col items-center justify-between gap-6 md:flex-row max-w-[1400px] mx-auto">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.8)]"></div>
                  <h2 className="text-4xl font-black tracking-tight sm:text-5xl uppercase">Neural Imagery</h2>
                  <p className="mt-2 text-sm font-medium tracking-widest text-gray-500 dark:text-gray-400 uppercase">Hyper-fidelity static captures</p>
                </div>
                <div className="h-px flex-1 bg-gray-200 dark:bg-white/10 md:mx-10"></div>
              </div>

              {/* Image Grid - Uniform Cinematic Grid */}
              {/* Image Grid - Uniform Cinematic 5-Column Grid */}
              <div ref={imageGridRef} className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {visibleImages.map((img) => (
                  <div key={img.id} className="image-card-item group perspective-[1000px] aspect-[9/16]">
                    <GalleryCard item={img} onClick={setSelectedItem} />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleImages.length < IMAGES.length && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="group relative overflow-hidden rounded-full bg-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-slate-800 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      See More Work
                      <i className="fas fa-arrow-down transition-transform group-hover:translate-y-1"></i>
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-500/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"></div>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* About / Bio Section */}
          <section id="about" ref={aboutRef} className="py-32 border-t border-gray-200 dark:border-white/5 scroll-mt-24 perspective-[1000px]">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mx-auto max-w-[1400px]">
                {/* Bio Header */}
                <div className="flex flex-col items-center text-center mb-24">
                  <div ref={profileContainerRef} className="relative mb-12 inline-block">
                    <div className="absolute inset-0 animate-pulse-slow rounded-full bg-brand-500/30 blur-[40px]"></div>
                    <div className="relative p-1 rounded-full bg-gradient-to-tr from-brand-500 to-purple-600">
                      <img
                        src={profileImg}
                        alt="Creator Portrait"
                        className="h-40 w-40 rounded-full border-4 border-slate-900 object-cover transition-all duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div ref={bioTextRef}>
                    <h2 className="mb-6 text-5xl font-black tracking-tighter uppercase text-gray-900 dark:text-white sm:text-6xl">Fahim Imtiaz</h2>
                    <p className="text-2xl leading-relaxed text-gray-600 dark:text-gray-400 font-extralight tracking-tight max-w-4xl mx-auto">
                      "I see AI as my most versatile brush. My process blends creative direction with technical dialogue, pushing generative tools to produce work that feels unmistakably human."
                    </p>
                  </div>
                </div>

                {/* Core Expertise Cards */}
                <CoreExpertise />
              </div>
            </div>
          </section>

          <Contact />
        </main>

        <footer className="border-t border-gray-200 py-20 dark:border-white/5 bg-white/20 dark:bg-transparent backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} Fahim Imtiaz
            </p>
          </div>
        </footer>
      </div>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default App;

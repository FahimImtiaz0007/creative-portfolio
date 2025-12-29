
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Holographic Reveal Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse", // Play on enter, Reverse on leave back (scroll up)
        }
      });

      // 1. Container expands from a horizontal line (Laser Beam)
      tl.fromTo(containerRef.current,
        {
          scaleY: 0.02,
          scaleX: 0,
          opacity: 0,
          filter: "brightness(2) blur(10px)" // Intense light start
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut"
        }
      )
        .to(containerRef.current, {
          scaleY: 1,
          filter: "brightness(1) blur(0px)",
          duration: 0.4,
          ease: "expo.out"
        })
        .from([titleRef.current?.children], {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .from(cardsRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.6");

      // Magnetic Hover Effect
      cardsRef.current.forEach((card) => {
        if (!card) return;

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            x: x * 0.2,
            y: y * 0.2,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactLinks = [
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      href: 'https://www.facebook.com/kuroashi.03',
      color: 'hover:bg-blue-600',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      isExternal: true
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      // Using Gmail compose link to ensure it opens in a new tab and navigates directly to webmail
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=fahim.imtiaz860@gmail.com',
      color: 'hover:bg-brand-600',
      textColor: 'text-brand-400',
      borderColor: 'border-brand-500/20',
      isExternal: true
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      href: 'https://www.linkedin.com/in/fahimimtiaz-/',
      color: 'hover:bg-blue-700',
      textColor: 'text-sky-400',
      borderColor: 'border-sky-500/20',
      isExternal: true
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 scroll-mt-20 perspective-[2000px]">
      <div className="container mx-auto px-6">
        <div ref={containerRef} className="mx-auto max-w-6xl overflow-hidden rounded-[3.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-2xl p-8 md:p-16 lg:p-20 shadow-[0_0_80px_rgba(0,0,0,0.4)] will-change-transform origin-center">
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="mb-6 text-5xl font-black tracking-tight sm:text-7xl">
              Let's <span className="text-brand-500">Connect</span>.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400 font-light leading-relaxed">
              Open for high-end collaborations, cinematic commissions, and AI-driven creative direction. Reach out through my direct channels below.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {contactLinks.map((link, i) => (
              <a
                key={link.name}
                ref={(el) => (cardsRef.current[i] = el)}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className={`group relative flex flex-col items-center justify-center rounded-[2.5rem] border ${link.borderColor} bg-white/5 p-10 transition-colors duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${link.color} overflow-hidden will-change-transform`}
              >
                {/* Background Glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl transition-all group-hover:bg-white/20"></div>

                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950/50 ${link.textColor} border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-slate-900 shadow-xl`}>
                  <i className={`${link.icon} text-3xl`}></i>
                </div>

                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 transition-colors group-hover:text-white">
                  {link.name}
                </h4>

                <div className="absolute bottom-4 right-6 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  <i className="fas fa-arrow-right text-white/40"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

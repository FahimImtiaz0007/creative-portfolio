import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
    {
        title: "Content & Prompt",
        desc: "AI Content Creator & Prompt Engineer",
        icon: "fa-terminal",
        gradient: "from-blue-500/20 to-brand-500/20"
    },
    {
        title: "Video Generation",
        desc: "Specialized in video generation (Veo3, Sora, Runway)",
        icon: "fa-film",
        gradient: "from-brand-500/20 to-purple-600/20"
    },
    {
        title: "Image Synthesis",
        desc: "Image synthesis with Nano Banana, Meta Ai, Midjourney, whisk",
        icon: "fa-wand-magic-sparkles",
        gradient: "from-purple-600/20 to-pink-500/20"
    },
    {
        title: "Narrative AI",
        desc: "Focus on cinematic & narrative AI content",
        icon: "fa-clapperboard",
        gradient: "from-orange-500/20 to-brand-500/20"
    },
    {
        title: "Future Tech",
        desc: "Currently exploring real-time AI generation",
        icon: "fa-microchip",
        gradient: "from-cyan-500/20 to-brand-500/20"
    }
];

const CoreExpertise: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Robust 3D Flip Entrance
            // FAILSAFE: Do not start with opacity 0 in .set(). Let .from() handle it.

            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Animate FROM hidden state. 
                // Using immediateRender: false prevents FOUC in some cases, but here we want standard behavior.
                // Animate FROM hidden state (Best for visibility safety)
                // Animate with fromTo for maximum reliability
                // This forces the start and end states, preventing any "GSAP guessing" issues.
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 50,
                        rotateY: 90
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            toggleActions: "play none none reverse",
                        },
                        delay: index * 0.05
                    }
                );
            });

            // Header Animation
            gsap.fromTo(".expertise-header",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%"
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            {/* Core Expertise Header */}
            <div className="mb-12 flex items-center justify-center gap-4 expertise-header">
                <div className="h-px w-12 bg-brand-500/50"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 dark:text-gray-400">Core Expertise</h3>
                <div className="h-px w-12 bg-brand-500/50"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-[1000px]">
                {specialties.map((s, i) => (
                    <div
                        key={i}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className={`group relative overflow-hidden rounded-[2.5rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${i === 3 ? 'sm:col-span-2 lg:col-span-1' : ''} ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                        <div className="relative z-10">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:bg-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 shadow-lg">
                                <i className={`fas ${s.icon} text-xl`}></i>
                            </div>
                            <h4 className="mb-3 text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white">{s.title}</h4>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">{s.desc}</p>
                        </div>

                        <div className="absolute -bottom-4 -right-4 text-7xl font-black text-gray-50 dark:text-white/5 select-none transition-all group-hover:scale-110 group-hover:-translate-x-4 group-hover:-translate-y-4">
                            0{i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoreExpertise;

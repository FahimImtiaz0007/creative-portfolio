
import React from 'react';
import { GalleryItem } from '../types';

interface GalleryCardProps {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  const hasTitle = item.title && item.title.trim().length > 0;

  return (
    <div
      onClick={() => onClick(item)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-transparent w-full h-full isolate transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
      style={{ aspectRatio: item.aspectRatio }}
    >
      {/* 1. Moving Neon Border (Spinning Conic Beam) */}
      <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#a855f7_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_2s_linear_infinite] will-change-transform z-0"></div>

      {/* 2. Inner Content Container (Masks the center) */}
      <div className="absolute inset-[3px] rounded-[15px] bg-slate-900 overflow-hidden z-10">

        {/* Shine Effect */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>

        {/* Image Layer */}
        <img
          src={item.thumbnail}
          alt={item.title || 'AI Artwork'}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
          loading="lazy"
        />

        {/* Video Indicator */}
        {item.type === 'video' && (
          <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-500 group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:scale-110 shadow-lg">
            <i className="fas fa-play text-xs ml-0.5"></i>
          </div>
        )}

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"></div>

        {/* Content Layer */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
          <div className="translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 delay-100">
            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              {item.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Title */}
            {hasTitle && (
              <h3 className="text-2xl font-black uppercase leading-none tracking-tighter text-white mb-1">
                {item.title}
              </h3>
            )}

            {/* Subtext/Arrow */}
            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-brand-400 transition-colors duration-300">
              <span>View Project</span>
              <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;

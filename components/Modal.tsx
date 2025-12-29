
import React from 'react';
import { GalleryItem } from '../types';

interface ModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isVertical = item.aspectRatio === '9/16' || item.src.includes('/shorts/');
  const hasTitle = item.title && item.title.trim().length > 0;
  const hasDescription = item.description && item.description.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"
        onClick={onClose}
      ></div>

      {/* Content Container */}
      <div
        className={`relative z-10 flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-[0_0_100px_rgba(0,0,0,0.9)] transition-all duration-500 lg:flex-row 
        ${isVertical ? 'max-w-xl' : 'max-w-6xl'} max-h-[92vh] border border-white/10`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-white backdrop-blur-md transition-all hover:bg-brand-500 border border-white/10 hover:scale-110 active:scale-95 shadow-xl"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Media Side */}
        {item.type === 'image' ? (
          <div className={`relative flex items-center justify-center bg-slate-900 overflow-hidden group/media lg:w-[50%] h-auto`}>
            {/* Enhanced Ambient Background for Images */}
            <div className="absolute inset-0 opacity-40 blur-[100px] scale-150 pointer-events-none">
              <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full flex items-center justify-center">
              <img
                src={item.src}
                alt={item.title || 'AI Generated Image'}
                className="w-full h-auto block"
              />
            </div>
          </div>
        ) : (
          <div className={`relative flex items-center justify-center bg-black overflow-hidden group/media
          ${isVertical ? 'lg:w-[50%] h-[60vh] lg:h-auto aspect-[9/16]' : 'lg:w-2/3 min-h-[400px] aspect-video'}`}>

            {/* Enhanced Ambient Background with Neon Pulse */}
            <div className="absolute inset-0 opacity-40 blur-[100px] scale-150 pointer-events-none animate-pulse-slow z-0">
              <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 h-full w-full flex items-center justify-center">
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-full w-full block group"
              >
                <img
                  src={item.thumbnail}
                  className="h-full w-full object-cover relative z-0 opacity-90 transition-all duration-1000 group-hover/media:scale-110 group-hover/media:opacity-100"
                  alt={item.title || 'Video Thumbnail'}
                />

                {/* Floating Play State */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/20 transition-all group-hover/media:bg-slate-950/10">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-500/90 text-white shadow-[0_0_50px_rgba(139,92,246,0.6)] backdrop-blur-md transition-all group-hover/media:scale-110 group-hover/media:bg-brand-500">
                    <i className="fas fa-play text-3xl ml-1.5"></i>
                  </div>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Info Side */}
        <div className="flex flex-col border-t border-white/5 bg-slate-900/50 p-6 lg:flex-1 lg:border-l lg:border-t-0 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block rounded-lg bg-brand-500/10 border border-brand-500/20 px-2 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand-400">
                {item.type}
              </span>
              {item.aspectRatio && (
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] border-l border-white/5 pl-2">
                  {item.aspectRatio} format
                </span>
              )}
            </div>

            {hasTitle && (
              <h2 className="mb-3 text-2xl font-black text-white leading-[1.1] tracking-tighter">
                {item.title}
              </h2>
            )}

            {hasDescription && (
              <p className="text-sm leading-relaxed text-slate-400 font-light italic opacity-90 mb-6 border-l-2 border-brand-500/30 pl-4">
                {item.description}
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <span key={tool} className="rounded-lg bg-slate-800/40 border border-white/5 px-3 py-1.5 text-[9px] font-bold text-slate-300 transition-all hover:bg-brand-500/20 hover:border-brand-500/30 hover:text-white hover:-translate-y-1">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-3 pt-6 border-t border-white/5">
            {/* Redesigned Pro Primary Button */}
            <a
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-600 p-4 text-[10px] font-black text-white transition-all hover:bg-brand-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              <i className={`${item.type === 'video' ? 'fab fa-youtube' : 'fas fa-external-link-alt'} text-xl transition-transform group-hover:scale-110`}></i>
              <span className="uppercase tracking-[0.3em]">
                {item.type === 'video' ? 'Launch on YouTube' : 'View Full Resolution'}
              </span>
            </a>

            {/* Subtle Secondary Button */}
            <button
              onClick={onClose}
              className="w-full rounded-2xl bg-white/5 border border-white/5 p-6 text-[10px] font-bold text-slate-500 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em]"
            >
              Return to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

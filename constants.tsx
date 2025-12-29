
import { GalleryItem, WorkflowStep } from './types';

/**
 * AI IMAGES SECTION
 */
/**
 * AI IMAGES SECTION
 * Dynamically loaded from images/image directory
 */
// @ts-ignore - Vite specific
const imageModules = import.meta.globEager('./images/image/*.jpg');

export const IMAGES: GalleryItem[] = Object.entries(imageModules).map(([path, mod], index) => {
  // @ts-ignore - module structure
  const url = mod.default as string;
  return {
    id: `img-dynamic-${index}`,
    type: 'image',
    title: `AI Artwork ${index + 1}`,
    tools: ['Nano Banana'],
    thumbnail: url,
    src: url,
    description: 'Generative exploration of form and light.',
    aspectRatio: '9/16'
  };
});

/**
 * AI VIDEOS SECTION
 * Total: 10 videos (Standard 16:9 and Shorts 9:16)
 */
export const VIDEOS: GalleryItem[] = [
  {
    id: 'vid-fish',
    type: 'video',
    title: '',
    tools: ['Nano Banana', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/ig9RS8wgDW0/maxresdefault.jpg',
    src: 'https://youtube.com/shorts/ig9RS8wgDW0',
    videoId: 'ig9RS8wgDW0',
    aspectRatio: '9/16', // Tall 1
    description: ''
  },
  {
    id: 'vid-couple',
    type: 'video',
    title: '',
    tools: ['Nano Banana', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/E9s-z1EyDgU/maxresdefault.jpg',
    src: 'https://www.youtube.com/shorts/E9s-z1EyDgU', // Assuming this is couple
    videoId: 'E9s-z1EyDgU',
    aspectRatio: '9/16', // Tall 2
    description: ''
  },
  {
    id: 'vid-caps',
    type: 'video',
    title: '',
    tools: ['Whisk', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/Mwn6IspkRD0/maxresdefault.jpg',
    src: 'https://www.youtube.com/watch?v=Mwn6IspkRD0',
    videoId: 'Mwn6IspkRD0',
    aspectRatio: '16/9', // Wide 1 (Top of stack)
    description: ''
  },
  {
    id: 'vid-sunset',
    type: 'video',
    title: '',
    tools: ['Nano Banana', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/-xJQSvZUvxM/maxresdefault.jpg',
    src: 'https://www.youtube.com/shorts/-xJQSvZUvxM',
    videoId: '-xJQSvZUvxM',
    aspectRatio: '9/16', // Tall 3 (Rightmost col)
    description: ''
  },
  {
    id: 'vid-swimmer',
    type: 'video',
    title: '',
    tools: ['Whisk', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/_ElPCMIl25s/maxresdefault.jpg',
    src: 'https://www.youtube.com/watch?v=_ElPCMIl25s',
    videoId: '_ElPCMIl25s',
    aspectRatio: '16/9', // Wide 2 (Middle of stack)
    description: ''
  },
  {
    id: 'vid-sneakers',
    type: 'video',
    title: '',
    tools: ['Nano Banana', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/NwjGRhycFCM/maxresdefault.jpg',
    src: 'https://www.youtube.com/watch?v=NwjGRhycFCM',
    videoId: 'NwjGRhycFCM',
    aspectRatio: '16/9', // Wide 3 (Bottom of stack)
    description: ''
  },
  {
    id: 'vid-room',
    type: 'video',
    title: '',
    tools: ['Meta Ai'],
    thumbnail: 'https://img.youtube.com/vi/iMkxs3C0vHQ/maxresdefault.jpg',
    src: 'https://www.youtube.com/shorts/iMkxs3C0vHQ',
    videoId: 'iMkxs3C0vHQ',
    aspectRatio: '9/16', // Tall 4 (Row 2 Start)
    description: ''
  },
  {
    id: 'vid-field',
    type: 'video',
    title: '',
    tools: ['Meta Ai'],
    thumbnail: 'https://img.youtube.com/vi/xgBu3A6Lfuc/maxresdefault.jpg',
    src: 'https://www.youtube.com/shorts/xgBu3A6Lfuc',
    videoId: 'xgBu3A6Lfuc',
    aspectRatio: '9/16', // Tall 5
    description: ''
  },
  {
    id: 'vid-scared',
    type: 'video',
    title: '',
    tools: ['Nano Banana', 'Veo3'],
    thumbnail: 'https://img.youtube.com/vi/7NM8ztRbvVY/maxresdefault.jpg',
    src: 'https://www.youtube.com/shorts/7NM8ztRbvVY',
    videoId: '7NM8ztRbvVY',
    aspectRatio: '9/16', // Tall 6 (Fills gap or next slot)
    description: ''
  },
  {
    id: 'vid-goddess',
    type: 'video',
    title: '',
    tools: ['Meta Ai'],
    thumbnail: 'https://img.youtube.com/vi/tzKWyzUBJhg/maxresdefault.jpg',
    src: 'https://www.youtube.com/shorts/tzKWyzUBJhg',
    videoId: 'tzKWyzUBJhg',
    aspectRatio: '9/16', // Tall 7
    description: ''
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    title: 'Conceptual Ideation',
    description: 'Using LLMs to brainstorm complex narratives and unique visual metaphors before any pixels are generated.',
    icon: 'fa-lightbulb'
  },
  {
    title: 'Generative Synthesis',
    description: 'Iterative prompting through high-end models like Midjourney and Runway to find the "soul" of the piece.',
    icon: 'fa-microchip'
  },
  {
    title: 'Refining & Upscaling',
    description: 'Using Magnific AI and Topaz to bring out hyper-realistic textures and ensure production-quality resolution.',
    icon: 'fa-wand-magic-sparkles'
  },
  {
    title: 'Post-Production',
    description: 'Final compositing in Adobe Creative Cloud to add the human touch, color grading, and specific artistic intent.',
    icon: 'fa-clapperboard'
  }
];

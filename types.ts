
export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  type: MediaType;
  title: string;
  tools: string[];
  thumbnail: string;
  src: string;
  description: string;
  videoId?: string;
  aspectRatio?: string; // e.g., '9/16' or '16/9'
  embedCode?: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
  icon: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  author: string;
  platform: 'tiktok' | 'instagram';
  hq_url?: string;
  music_url?: string;
}

export type Page = 'home' | 'about' | 'contact' | 'terms' | 'privacy' | 'feedback' | 'admin';

import axios from 'axios';
import { VideoMetadata } from '../types';

export const fetchTikTokVideo = async (url: string): Promise<VideoMetadata> => {
  try {
    const response = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = response.data.data;
    
    if (!data) throw new Error('Could not fetch video data');

    // Track usage
    try { await axios.post('/api/track'); } catch (e) { /* ignore tracking errors */ }

    return {
      id: data.id,
      title: data.title || 'TikTok Video',
      thumbnail: data.cover,
      url: data.play,
      author: data.author?.nickname || 'Unknown',
      platform: 'tiktok',
      hq_url: data.hdplay || data.play,
      music_url: data.music
    };
  } catch (error) {
    console.error('TikTok Fetch Error:', error);
    throw new Error('Failed to fetch TikTok video. Please check the link and try again.');
  }
};

export const fetchInstagramVideo = async (url: string): Promise<VideoMetadata> => {
  // Instagram is harder without a dedicated API. 
  // For demo/prototype, we use a public scraper or a mock if no stable one is found.
  // Actually, many public scrapers exist but they are volatile.
  // We'll use a placeholder logic that explains the limitation or tries a common pattern.
  try {
    // Note: This is an example of how you might call a 3rd party API. 
    // In a real app, you'd use a stable provider like RapidAPI or a dedicated backend scraper.
    // For now, I'll attempt a common public one if available, otherwise fallback.
    
    // Attempting to get metadata via oembed to at least show something
    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`;
    // Note: oembed often requires a token now. 
    
    // Instead, for this specific request, we might need a generic proxy/scraper.
    // I will mock this for the initial UI but attempt to use a real one if I find it.
    
    throw new Error('Instagram downloader requires a specialized API key for production use. Only TikTok is fully functional in this preview.');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch Instagram video.');
  }
};

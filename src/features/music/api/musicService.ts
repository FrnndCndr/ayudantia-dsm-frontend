import { api } from '../../../services/http';
import { Song, SongsResponse, SongResponse } from '../models/song.models';
import { environment } from '../../../../environments/environment';

/**
 * ETAPA 1: Corrige el prefijo de la URL (localhost → IP real)
 * 
 * http://localhost:7070 → http://192.168.0.19:7070
 */
const fixLocalhost = (url: string): string => {
  if (!url) return url;

  const envHost = environment.apiUrl.replace(/^https?:\/\//, '').replace(/:\d+$/, '');

  return url
    .replace(/localhost/g, envHost)
    .replace(/127\.0\.0\.1/g, envHost)
    .replace(/0\.0\.0\.0/g, envHost);
};

/**
 * ETAPA 2: Aplica el fix a las rutas específicas de audio y cover
 * 
 * audioUrl: /uploads/audio/song.mp3
 * coverUrl: /uploads/images/cover.jpg
 */
const fixSongUrls = (song: Song): Song => {
  return {
    ...song,
    audioUrl: fixLocalhost(song.audioUrl),
    coverUrl: fixLocalhost(song.coverUrl),
  };
};

export const musicService = {
  /**
   * Obtener todas las canciones
   */
  getAllSongs: async (): Promise<Song[]> => {
    try {
      const response = await api<SongsResponse>('/songs');
      // Corregir URLs de localhost a IP correcta
      const songs = (response.songs || []).map(fixSongUrls);
      return songs;
    } catch (error) {
      console.error('musicService.getAllSongs error:', error);
      return [];
    }
  },

  /**
   * Obtener una canción por ID
   */
  getSongById: async (id: number): Promise<Song | null> => {
    try {
      const response = await api<SongResponse>(`/songs/${id}`);
      const song = response.song ? fixSongUrls(response.song) : null;
      return song;
    } catch (error) {
      console.error(`musicService.getSongById(${id}) error:`, error);
      return null;
    }
  },
};

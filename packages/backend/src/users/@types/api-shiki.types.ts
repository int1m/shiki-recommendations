import { Images } from '@/@types';
import { ApiShikiAnime } from '@/animes/@types/api-shiki.types';

import { UserRateStatus } from './users.types';

export interface ApiShikiUser {
  id: number;
  avatar: string;
  image: Images;
  last_online_at: Date;
  nickname: string;
  url: string;
}

export interface ApiShikiUserRate {
  id: number;
  chapters: number;
  episodes: number;
  rewatches: number;
  score: number;
  status: UserRateStatus;
  text: string | null;
  text_html: string;
  user: ApiShikiUser;
  anime: null | Pick<ApiShikiAnime, 'id' | 'url' | 'image' | 'episodes' | 'episodes_aired'>;
  created_at: Date;
  updated_at: Date;
}

import {
  Genre, Images, RateScoresStat, RateStatusesStat, Studio,
} from '@/animes/@types/animes.types';

export interface ApiShikiAnimeListItem {
  id: number;
  url: string;
  name?: string;
  russian?: string;
  kind?: string;
  aired_on?: string;
  released_on?: string;
  status?: string;
  episodes: number;
  episodes_aired: number;
  score: number;
  image: Images;
}

export interface ApiShikiAnime {
  id: number;
  url: string;
  score: number;
  rating: string; // возрастной рейтинг
  name?: string;
  russian?: string;
  english?: Array<string>;
  japanese?: Array<string>;
  synonyms?: Array<string>;
  aired_on?: string;
  released_on?: string;
  kind?: string; // tv | ova | film ...
  description?: string;
  status?: string;
  franchise?: string;
  studios: Array<Studio>;
  genres: Array<Genre>;
  image: Images;
  duration: number;
  episodes: number;
  episodes_aired: number;
  next_episode_at?: string;
  favoured: boolean;
  anons: boolean;
  ongoing: boolean;
  rates_scores_stats: Array<RateScoresStat>;
  rates_statuses_stats: Array<RateStatusesStat>;
}

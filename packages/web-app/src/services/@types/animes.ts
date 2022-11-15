import { Images } from '@/services/@types/common';

export interface StudioApi {
  id: number;
  name?: string;
  filteredName?: string;
  images?: string;
  real?: boolean;
}

export interface GenreApi {
  id: number;
  kind?: string;
  name?: string;
  nameRussian?: string;
}

export interface RateScoresStatApi {
  name: number;
  value: number;
}

export interface RateStatusesStatApi {
  name: 'Запланировано' | 'Просмотрено' | 'Смотрю' | 'Брошено' | 'Отложено';
  value: number;
}

export interface SeyuApi {
  externalId: number;
  name: string;
  nameRussian: string;
  images: Images;
  url: string;
}

export interface CharacterApi {
  externalId: number;
  images: Images;
  name: string;
  nameRussian: string;
  url: string;
  seyus: SeyuApi[];
}

export enum RoleEnumApi {
  'Original Creator' = 'Автор оригинала',
  'Director' = 'Режиссёр',
}

export interface RoleApi {
  name: string;
  nameRussia: string;
}

export interface PersonApi {
  externalId: number;
  images: Images;
  name: string;
  nameRussian: string;
  roles: RoleApi[];
}

export interface AnimeApi {
  externalId: number;
  url: string;
  score: number;
  rating: string; // возрастной рейтинг
  name?: string;
  nameRussian?: string;
  namesEnglish?: Array<string>;
  namesJapanese?: Array<string>;
  synonyms?: Array<string>;
  airedOn?: string;
  releasedOn?: string;
  kind?: string; // tv | ova | film ...
  description?: string;
  status?: string;
  franchise?: string;
  studios: Array<StudioApi>;
  genres: Array<GenreApi>;
  images: Images;
  duration: number;
  episodes: number;
  episodesAired: number;
  nextEpisodeAt?: string;
  favoured: boolean;
  anons: boolean;
  ongoing: boolean;
  ratesScoresStats: Array<RateScoresStatApi>;
  ratesStatusesStats: Array<RateStatusesStatApi>;
  characters: Array<CharacterApi>;
  persons: Array<PersonApi>;
}

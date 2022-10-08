export interface Images {
  original?: string;
  preview?: string;
  x48?: string;
  x96?: string;
}

export interface Studio {
  id: number;
  name?: string;
  filteredName?: string;
  image?: string;
  real?: boolean;
}

export interface Genre {
  id: number;
  kind?: string;
  name?: string;
  nameRussian?: string;
}

export interface RateScoresStat {
  name: number;
  value: number;
}

export interface RateStatusesStat {
  name: 'Запланировано' | 'Просмотрено' | 'Смотрю' | 'Брошено' | 'Отложено';
  value: number;
}

export interface Seyu {
  externalId: number;
  name: string;
  nameRussian: string;
  images: Images;
  url: string;
}

export interface Character {
  externalId: number;
  images: Images;
  name: string;
  nameRussian: string;
  url: string;
  seyus: Seyu[];
}

export enum RoleEnum {
  'Original Creator' = 'Автор оригинала',
  'Director' = 'Режиссёр',
}

export interface Role {
  name: string;
  nameRussia: string;
}

export interface Person {
  externalId: number;
  images: Images;
  name: string;
  nameRussian: string;
  roles: Role[];
}

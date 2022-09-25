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

import { Images } from '@/services/@types/common';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number
  avatar: string;
  image: Images;
  nickname: string;
  url: string;
}

export const RateStatusApi: { [key: string]: string } = {
  planned: 'Запланировано',
  watching: 'Смотрю',
  rewatching: 'Пересматриваю',
  completed: 'Просмотрено',
  on_hold: 'Отложено',
  dropped: 'Брошено',
};

export interface ApiRateCreate {
  userId: number;
  animeId: number;
  status: string;
}

export interface ApiRateUpdate {
  rateId: number;
  status: string;
}

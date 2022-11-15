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

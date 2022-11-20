import useFetch from '@/hooks/useFetch';
import {
  config, SHIKIMORI_CLIENT_ID, SHIKIMORI_CLIENT_SECRET, SHIKIMORI_REDIRECT_URL,
} from '@/config';
import { RateApi } from '@/services/@types/animes';

import { AuthTokens, User } from '@/services/@types/shikimoriIntegration';
import { useUserStore } from '@/stores/userStore';

const baseUrl = `${config.shikimoriUrl}`;

export const getAuthTokens = async (code: string) => {
  const userStore = useUserStore();
  userStore.$patch({ isAuthorized: false });
  localStorage.removeItem('tokenAccess');
  localStorage.removeItem('tokenRefresh');
  const response = await useFetch.post<AuthTokens>(`${baseUrl}/oauth/token`, {
    grant_type: 'authorization_code',
    client_id: SHIKIMORI_CLIENT_ID,
    client_secret: SHIKIMORI_CLIENT_SECRET,
    code,
    redirect_uri: SHIKIMORI_REDIRECT_URL,
  }, {}, {
    'User-Agent': 'Shikireki',
  });
  const result = await response.json();
  return result;
};

export const getUserInfo = async () => {
  const response = await useFetch.get<User>(`${baseUrl}/api/users/whoami`, {}, {
    'User-Agent': 'Shikireki',
  });

  const result = await response.json();
  return result;
};

export const getAnimeRates = async (userId: number) => {
  const response = await useFetch.get<unknown>(`${baseUrl}/api/v2/user_rates`, {
    user_id: userId,
    target_type: 'Anime',
    status: 'completed',
  }, {
    'User-Agent': 'Shikireki',
  });
  const result = (await response.json()) as RateApi[];
  return result;
};

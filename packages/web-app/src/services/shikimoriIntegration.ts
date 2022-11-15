import useFetch from '@/hooks/useFetch';
import { config } from '@/config';

import { AuthTokens, User } from '@/services/@types/shikimoriIntegration';
import { useUserStore } from '@/stores/userStore';

const baseUrl = `${config.shikimoriUrl}`;

export const getAuthTokens = async (code: string, redirectUri: string) => {
  const userStore = useUserStore();
  userStore.$patch({ isAuthorized: false });
  localStorage.removeItem('tokenAccess');
  const response = await useFetch.post<AuthTokens>(`${baseUrl}/oauth/token`, {
    grant_type: 'authorization_code',
    client_id: '86nfY-LpRn2UnfWzboTnZZVSZWPMzS5A4f3OBPE0PHo',
    client_secret: 'l-HTBWWuyoyZxdWkpO3hmeVVHPauVNSe4nvj0uKq_dQ',
    code,
    redirect_uri: redirectUri,
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
  }, {
    'User-Agent': 'Shikireki',
  });
  const result = await response.json();
  return result;
};

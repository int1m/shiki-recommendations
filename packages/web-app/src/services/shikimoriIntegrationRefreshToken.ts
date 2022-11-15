import { config } from '@/config';
import { useUserStore } from '@/stores/userStore';
import { AuthTokens } from '@/services/@types/shikimoriIntegration';

const baseUrl = `${config.shikimoriUrl}`;

export const refreshTokens = async () => {
  const userStore = useUserStore();
  localStorage.removeItem('tokenAccess');
  const tokenRefresh = localStorage.getItem('tokenRefresh');
  localStorage.removeItem('tokenRefresh');
  userStore.$patch({ isAuthorized: false });
  if (tokenRefresh) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('User-Agent', 'Shikireki');
    const paramsValue: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: '86nfY-LpRn2UnfWzboTnZZVSZWPMzS5A4f3OBPE0PHo',
        client_secret: 'l-HTBWWuyoyZxdWkpO3hmeVVHPauVNSe4nvj0uKq_dQ',
        refresh_token: tokenRefresh,
        redirect_uri: `${window.location.origin}${window.location.pathname}`,
      }),
      headers: requestHeaders,
    };
    const response = await fetch(`${baseUrl}/oauth/token`, paramsValue);
    const tokens = await response.json() as AuthTokens;

    if (tokens.access_token) {
      localStorage.setItem('tokenAccess', tokens.access_token);
      localStorage.setItem('tokenRefresh', tokens.refresh_token);
      userStore.$patch({ isAuthorized: true });

      return true;
    }

    return false;
  }

  return false;
};

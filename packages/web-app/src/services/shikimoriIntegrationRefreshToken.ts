import { config, SHIKIMORI_CLIENT_ID, SHIKIMORI_CLIENT_SECRET } from '@/config';
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
        client_id: SHIKIMORI_CLIENT_ID,
        client_secret: SHIKIMORI_CLIENT_SECRET,
        refresh_token: tokenRefresh,
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

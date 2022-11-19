export const config = {
  urlBase: import.meta.env.VITE_API_BASE_DOMAIN,
  urlWs: import.meta.env.MODE === 'development'
    ? `ws://${import.meta.env.VITE_API_BASE_DOMAIN}:8080`
    : `wss://${import.meta.env.VITE_API_BASE_DOMAIN}/ws`,
  urlRest: import.meta.env.MODE === 'development'
    ? `https://${import.meta.env.VITE_API_BASE_DOMAIN}:3000`
    : `https://${import.meta.env.VITE_API_BASE_DOMAIN}`,
  apiVersion: 'v1',
  shikimoriUrl: 'https://shikimori.one',
  mode: import.meta.env.MODE as 'development' | 'production' | 'staging',
  mocks: {
    isGlobalUseMockedData: false,
  },
};

export const SHIKIMORI_CLIENT_ID = import.meta.env.VITE_SHIKIMORI_CLIENT_ID ?? '';
export const SHIKIMORI_CLIENT_SECRET = import.meta.env.VITE_SHIKIMORI_CLIENT_SECRET ?? '';
export const SHIKIMORI_REDIRECT_URL = import.meta.env.VITE_SHIKIMORI_REDIRECT_URL
  ?? 'https://localhost:5173/recommendation';

export default {
  urlBase: import.meta.env.VITE_API_BASE_DOMAIN,
  urlWs: import.meta.env.MODE === 'development'
    ? `ws://${import.meta.env.VITE_API_BASE_DOMAIN}:8080`
    : `wss://${import.meta.env.VITE_API_BASE_DOMAIN}/ws`,
  urlRest: import.meta.env.MODE === 'development'
    ? `https://${import.meta.env.VITE_API_BASE_DOMAIN}:3000`
    : `https://${import.meta.env.VITE_API_BASE_DOMAIN}`,
  apiVersion: 'v1',
  mode: import.meta.env.MODE as 'development' | 'production' | 'staging',
  mocks: {
    isGlobalUseMockedData: false,
  },
};

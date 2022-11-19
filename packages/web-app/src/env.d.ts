/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_DOMAIN: string;
  readonly VITE_SHIKIMORI_CLIENT_ID: string;
  readonly VITE_SHIKIMORI_CLIENT_SECRET: string;
  readonly VITE_SHIKIMORI_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

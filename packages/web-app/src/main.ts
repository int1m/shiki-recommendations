import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { router } from '@/routes';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)
  .mount('#app');

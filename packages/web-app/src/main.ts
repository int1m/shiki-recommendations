import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/routes';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from './App.vue';

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app');

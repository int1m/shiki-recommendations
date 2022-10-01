import {
  createWebHistory,
  createRouter,
  RouteRecordRaw,
  RouteLocationNormalized,
} from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MessengerLayout',
    component: () => import('@/views/AnimeSearch.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

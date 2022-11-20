import {
  createWebHistory,
  createRouter,
  RouteRecordRaw,
  RouteLocationNormalized,
} from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'anime-search',
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/recommendation',
    name: 'recommendation',
    component: () => import('@/views/Recommendation.vue'),
    props: (route) => ({ query: route.query.code }),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

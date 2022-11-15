<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { config } from '@/config';

import { useUserStore } from '@/stores/userStore';

import { getAnimeRates, getAuthTokens } from '@/services/shikimoriIntegration';

import { useGetUserInfo } from '@/hooks/useGetUserInfo';

import VButton from '@/components/kit/VButton.vue';

const route = useRoute();

const userStore = useUserStore();

const { code } = route.query;
const tokenRefresh = localStorage.getItem('tokenRefresh');

onBeforeMount(async () => {
  if (typeof code === 'string' && !userStore.isAuthorized) {
    const tokens = await getAuthTokens(code, `${window.location.origin}${window.location.pathname}`);
    if (tokens.access_token) {
      userStore.$patch({
        isAuthorized: true,
      });
      await useGetUserInfo();
      localStorage.setItem('tokenAccess', tokens.access_token);
      localStorage.setItem('tokenRefresh', tokens.refresh_token);
    }
  }
});

const onAuthButtonClickHandler = () => {
  const redirectParams = new URLSearchParams({
    client_id: '86nfY-LpRn2UnfWzboTnZZVSZWPMzS5A4f3OBPE0PHo',
    redirect_uri: `${window.location.origin}${window.location.pathname}`,
    response_type: 'code',
    scope: '',
  });
  const redirectUrl = `${config.shikimoriUrl}/oauth/authorize?${redirectParams.toString()}`;
  window.location.href = redirectUrl;
};

const onGetAnimeRatesButtonClickHandler = async () => {
  if (userStore.isAuthorized && userStore.id) {
    const userAnimeRates = await getAnimeRates(userStore.id);
    console.log(userAnimeRates);
  }
};
</script>

<template>
  <div class="anime-search">
    <h1>Здесь будут рекомендации123</h1>
    <v-button type="primary" @click="onAuthButtonClickHandler">
      Авторизоваться
    </v-button>
    <v-button type="primary" @click="onGetAnimeRatesButtonClickHandler">
      Получить оценки аниме
    </v-button>
  </div>
</template>

<style lang="scss" scoped>
.anime-search {
  height: 100%;
  background-color: #383838;
}
</style>

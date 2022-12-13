import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Images } from '@/services/@types/common';

export const useUserStore = defineStore('userStore', () => {
  const isAuthorized = ref(false);

  const id = ref<number | undefined>(undefined);
  const nickname = ref<string | undefined>(undefined);
  const images = ref<Images | undefined>(undefined);
  const avatar = ref<string | undefined>(undefined);
  const url = ref<string | undefined>(undefined);

  const exit = () => {
    isAuthorized.value = false;
    id.value = undefined;
    nickname.value = undefined;
    images.value = undefined;
    avatar.value = undefined;
    url.value = undefined;
  };

  return {
    isAuthorized,
    id,
    nickname,
    images,
    avatar,
    url,
    exit,
  };
}, { persist: true });

import { useUserStore } from '@/stores/userStore';
import { getUserInfo } from '@/services/shikimoriIntegration';

export const useGetUserInfo = async () => {
  const userStore = useUserStore();

  if (userStore.isAuthorized) {
    const user = await getUserInfo();
    userStore.$patch({
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      images: user.image,
      url: user.url,
    });
  }
};

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useMutation, useQuery, useQueryClient } from 'vue-query';

import { ApiRateCreate, ApiRateUpdate, RateStatusApi } from '@/services/@types/shikimoriIntegration';
import {
  createAnimeRate, deleteAnimeRate, getAnimeRate, updateAnimeRate,
} from '@/services/shikimoriIntegration';

import VPopover from '@/components/kit/VPopover.vue';
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import VButton from '@/components/kit/VButton.vue';
import VMenuButton from '@/components/kit/VMenuButton.vue';

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  animeExternalId: {
    type: Number,
    required: true,
  },
});

const { data: userRate, isLoading } = useQuery(
  ['get-user-rate', props.userId, props.animeExternalId],
  () => getAnimeRate(props.userId, props.animeExternalId),
  {
    refetchOnWindowFocus: false,
  },
);

const userRatesOptions = computed(() => ['planned', 'watching', 'rewatching', 'completed', 'on_hold', 'dropped']
  .filter((rate) => rate !== userRate.value?.status));

const queryClient = useQueryClient();

const createRateMutation = useMutation(['create-rate'], (animeRate: ApiRateCreate) => createAnimeRate(animeRate), {
  onSuccess: async () => {
    await queryClient.invalidateQueries(['get-user-rate', props.userId, props.animeExternalId]);
  },
  onError: (error, messageNew, context: { previousState: unknown } | undefined) => {
    queryClient.setQueriesData<unknown>(['get-user-rate', props.userId, props.animeExternalId], context?.previousState);
  },
  onSettled: async () => {
    await queryClient.invalidateQueries<unknown>(['get-user-rate', props.userId, props.animeExternalId]);
  },
});

const updateRateMutation = useMutation(['create-rate'], (animeRate: ApiRateUpdate) => updateAnimeRate(animeRate), {
  onSuccess: async () => {
    await queryClient.invalidateQueries(['get-user-rate', props.userId, props.animeExternalId]);
  },
  onError: (error, messageNew, context: { previousState: unknown } | undefined) => {
    queryClient.setQueriesData<unknown>(['get-user-rate', props.userId, props.animeExternalId], context?.previousState);
  },
  onSettled: async () => {
    await queryClient.invalidateQueries<unknown>(['get-user-rate', props.userId, props.animeExternalId]);
  },
});

const deleteRateMutation = useMutation(['delete-rate'], (animeId: number) => deleteAnimeRate(animeId), {
  onSuccess: async () => {
    await queryClient.invalidateQueries(['get-user-rate', props.userId, props.animeExternalId]);
  },
  onError: (error, messageNew, context: { previousState: unknown } | undefined) => {
    queryClient.setQueriesData<unknown>(['get-user-rate', props.userId, props.animeExternalId], context?.previousState);
  },
  onSettled: async () => {
    await queryClient.invalidateQueries<unknown>(['get-user-rate', props.userId, props.animeExternalId]);
  },
});

const isShow = ref(false);
const onClickActionButtonChevronHandler = () => {
  isShow.value = true;
};
const onClickActionOutsideHandler = () => {
  isShow.value = false;
};

const currentUserRateText = computed(() => (userRate.value?.status
  ? RateStatusApi[userRate.value.status] : 'Добавить в список'));

const onClickOptionButtonHandler = (status: string) => {
  if (userRate.value?.id) {
    updateRateMutation.mutate({
      rateId: userRate.value.id,
      status,
    });
  } else {
    createRateMutation.mutate({
      userId: props.userId,
      animeId: props.animeExternalId,
      status,
    });
  }
};

const onClickDeleteButtonHandler = () => {
  if (userRate.value?.id) {
    deleteRateMutation.mutate(userRate.value.id);
  }
};

const onClickActionHandler = () => {
  if (typeof userRate.value?.status === 'undefined') {
    createRateMutation.mutate({
      userId: props.userId,
      animeId: props.animeExternalId,
      status: 'planned',
    });
  } else {
    isShow.value = true;
  }
};
</script>

<template>
  <v-popover
    :is-show="isShow"
    to="#action-popover-container"
    placement="bottom-end"
    @click-outside="onClickActionOutsideHandler"
  >
    <template #trigger>
      <div class="action">
        <div class="action-right" @click="onClickActionHandler">
          <v-icon-import
            name="plus"
            fill="#ffffff"
          />
          <div v-if="!isLoading" class="title">
            {{ currentUserRateText }}
          </div>
        </div>
        <div class="action-left">
          <v-button
            :circle="true"
            :size="2.5"
            @click="onClickActionButtonChevronHandler"
          >
            <template #icon>
              <v-icon-import
                name="chevron-down"
                fill="#ffffff"
              />
            </template>
          </v-button>
        </div>
      </div>
    </template>
    <template #default>
      <div class="action-select">
        <v-menu-button
          v-for="(rate, index) in userRatesOptions"
          :key="index"
          size="small"
          @click="onClickOptionButtonHandler(rate)"
        >
          <template #default>
            {{ RateStatusApi[rate] }}
          </template>
        </v-menu-button>
        <v-menu-button
          size="small"
          type="danger"
          @click="onClickDeleteButtonHandler"
        >
          <template #default>
            Удалить
          </template>
        </v-menu-button>
      </div>
    </template>
  </v-popover>
</template>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background-color: var(--color-primary);
  border-radius: var(--border-radius-default-small);
  color: var(--color-white);
  user-select: none;
  cursor: pointer;

  .action-right {
    height: 100%;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    flex: 1;
    gap: 0.5rem;

    &:hover {
      .title {
        text-decoration: underline;
      }
    }

    .title {
      font-weight: 400;
    }
  }

  .action-left {
    display: flex;
    align-items: center;
  }
}

.action-select {
  width: 13rem;
  padding: 0.5rem;
  background-color: var(--color-background);
  border-radius: var(--border-radius-default);
  display: flex;
  flex-direction: column;
}
</style>

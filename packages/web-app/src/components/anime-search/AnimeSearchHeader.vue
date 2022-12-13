<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import { NAutoComplete, AutoCompleteProps } from 'naive-ui';

import { useGetCSSVariable } from '@/hooks/useCssVariables';
import { useUserStore } from '@/stores/userStore';

import VIcon from '@/components/kit/VIcon.vue';
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import VPopover from '@/components/kit/VPopover.vue';
import VMenuButton from '@/components/kit/VMenuButton.vue';

import { AnimeApi } from '@/services/@types/animes';

type AutoCompleteThemeOverrides = NonNullable<AutoCompleteProps['themeOverrides']>;

const props = defineProps({
  animes: {
    type: Object as PropType<AnimeApi[]>,
    required: true,
  },
});

const emit = defineEmits(['search', 'select']);

const { isAuthorized, images, exit } = useUserStore();

const colorPrimary = useGetCSSVariable('--color-primary');

const autoCompleteThemeOverrides: AutoCompleteThemeOverrides = {
  peers: {
    Input: {
      paddingMedium: '1rem 1rem',
      lineHeight: '1.5rem',
      borderRadius: '1rem',
      heightMedium: '3.25rem',
      caretColor: colorPrimary,
      boxShadowFocus: 'none',
      borderFocus: 'none',
      borderHover: 'none',
      border: 'none',
    },
    InternalSelectMenu: {
      borderRadius: '1rem',
    },
  },
};

const search = ref('');

const options = computed(() => props.animes.map((anime) => ({
  value: anime._id,
  label: anime.nameRussian,
})));

const onSearchInputHandler = (searchValue: string) => {
  search.value = searchValue;
  emit('search', searchValue);
};

const onSelectInputHandler = (id: string | number) => {
  emit('select', id);
};

const isShow = ref(false);

const onClickActionButtonChevronHandler = () => {
  isShow.value = true;
};
const onClickActionOutsideHandler = () => {
  isShow.value = false;
};

const onExitButtonClickHandler = () => {
  localStorage.removeItem('tokenRefresh');
  localStorage.removeItem('tokenAccess');
  exit();
};
</script>

<template>
  <div class="header">
    <n-auto-complete
      v-model:value="search"
      class="search-auto-complete"
      :options="options"
      placeholder="Найти аниме"
      size="medium"
      :theme-overrides="autoCompleteThemeOverrides"
      :on-select="onSelectInputHandler"
      :on-input="onSearchInputHandler"
    >
      <template #prefix>
        <VIcon name="search" :size="28" />
      </template>
    </n-auto-complete>
    <div>
      <v-popover
        v-if="isAuthorized"
        :is-show="isShow"
        to="#header-action-popover-container"
        placement="bottom-end"
        @click-outside="onClickActionOutsideHandler"
      >
        <template #trigger>
          <div class="user-profile" @click="onClickActionButtonChevronHandler">
            <div class="avatar-circle">
              <img
                class="avatar"
                :src="images.x64"
                alt="user-avatar"
              >
            </div>
            <VIconImport name="chevron-down" :fill="colorPrimary" />
          </div>
        </template>
        <template #default>
          <div class="action-select">
            <v-menu-button
              size="small"
              type="danger"
              @click="onExitButtonClickHandler"
            >
              <template #default>
                Выйти
              </template>
            </v-menu-button>
          </div>
        </template>
      </v-popover>
      <div id="header-action-popover-container" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem;

  @media (min-width: 927px) {
    padding: var(--padding-containter);
  }

  .subtitle {
    margin-top: 0.5rem;

    @media (min-width: 927px) {
      margin-top: 1rem;
      font-size: 1.375rem;

      span {
        color: var(--color-primary);
      }
    }

    span {
      font-weight: 500;
    }
  }

  .search-auto-complete {
    max-width: 990px;

    :deep(.n-input) {
      box-shadow: 0 12px 40px 10px rgba(19, 19, 19, 0.05);
      background-color: var(--color-background-light);
      color: var(--color-text);

      input {
        color: var(--color-text);
      }

      .n-input__placeholder {
        color: var(--color-text-secondary-light)
      }

      &.n-input--focus {
        .n-input__prefix {
          svg use {
            fill: var(--color-primary);
          }
        }
      }

      .n-input__prefix {
        margin-right: 0.75rem;
        svg use {
          fill: var(--color-icon);
          transition: fill ease-out .1s;
        }
      }
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    user-select: none;
    cursor: pointer;

    .avatar-circle {
      height: 3.25rem;
      width: 3.25rem;
      padding: 0.25rem;
      border: 1px solid var(--color-primary);
      border-radius: 50%;

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        pointer-events: none;
      }
    }
  }
}

.action-select {
  min-width: 7rem;
  display: flex;
}
</style>

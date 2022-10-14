<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';
import { NAutoComplete, AutoCompleteProps } from 'naive-ui';

import { useGetCSSVariable } from '@/hooks/useCssVariables';

import VIcon from '@/components/kit/VIcon.vue';
import { AnimeApi } from '@/services/@types/animes';

type AutoCompleteThemeOverrides = NonNullable<AutoCompleteProps['themeOverrides']>;

const props = defineProps({
  animes: {
    type: Object as PropType<AnimeApi[]>,
    required: true,
  },
});

const emit = defineEmits(['search', 'select']);

const colorPrimary = useGetCSSVariable('--color-primary');
const colorText = useGetCSSVariable('--color-text');

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
      textColor: colorText,
    },
    InternalSelectMenu: {
      borderRadius: '1rem',
    },
  },
};

const search = ref('');

const options = computed(() => props.animes.map((anime) => ({
  value: anime.externalId.toString(),
  label: anime.nameRussian,
})));

const onSearchInputHandler = () => {
  emit('search', search.value);
};

const onSelectInputHandler = (animeExternalId: string | number) => {
  console.log(`select: ${animeExternalId}`);
  emit('select', animeExternalId);
};
</script>

<template>
  <div class="header">
    <h1>Рекомендации по твоему любимому аниме</h1>
    <div class="subtitle">
      Поиск по <span>18454</span> тайтлам
    </div>
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
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-primary);
  padding: 1.5rem 1rem;
  border-bottom-left-radius: 1.875rem;
  border-bottom-right-radius: 1.875rem;
  color: #ffffff;

  @media (min-width: 927px) {
    width: fit-content;
    color: var(--color-text);
    background-color: unset;

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
    margin-top: 1rem;

    @media (min-width: 927px) {
      margin-top: 1.5rem;
    }

    :deep(.n-input) {
      @media (min-width: 927px) {
        box-shadow: 0 12px 40px 10px rgba(19, 19, 19, 0.05);
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
          fill: #D3D3D3;
          transition: fill ease-out .1s;
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import VPopover from '@/components/kit/VPopover.vue';
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import VButton from '@/components/kit/VButton.vue';
import VMenuButton from '@/components/kit/VMenuButton.vue';

const isShow = ref(false);
const onClickActionButtonChevronHandler = () => {
  isShow.value = true;
};
const onClickActionOutsideHandler = () => {
  isShow.value = false;
};

const value = ref('Добавить в список');
const options = [
  {
    value: 'Просмотрено',
    label: 'Просмотрено',
  },
  {
    value: 'Брошено',
    label: 'Брошено',
  },
];
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
        <div class="action-right">
          <v-icon-import
            name="plus"
            fill="#ffffff"
          />
          <div class="title">
            {{ value }}
          </div>
        </div>
        <div class="action-left">
          <v-button :circle="true" @click="onClickActionButtonChevronHandler">
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
        <v-menu-button size="small">
          <template #default>
            Просмотрено
          </template>
        </v-menu-button>
        <v-menu-button size="small">
          <template #default>
            Брошено
          </template>
        </v-menu-button>
      </div>
    </template>
  </v-popover>
  <div id="action-popover-container" />
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

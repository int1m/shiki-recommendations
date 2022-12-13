<script lang="ts" setup>
import VIcon from '@/components/kit/VIcon.vue';
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import { computed, onMounted } from 'vue';
import { useChangeColorSchema } from '@/hooks/useChangeColorSchema';
import { useInitialStore } from '@/stores/initialStore';
import VButton from '@/components/kit/VButton.vue';

const initialStore = useInitialStore();

const currentYear = (new Date()).getFullYear();

const colorSchemas = [
  { name: 'shiki-light', label: 'Светлая тема' },
  { name: 'shiki-dark', label: 'Темная тема' },
];

const disabledColorSchema = computed(() => colorSchemas
  .find((schema) => schema.name !== initialStore.activeColorSchema));

let applyColorSchema: (schemaName: string) => void;
onMounted(async () => {
  applyColorSchema = (await useChangeColorSchema()).applyColorSchema;
  applyColorSchema(initialStore.activeColorSchema);
});
const changeColorSchemaClickHandler = (schemaName: string | undefined) => {
  if (applyColorSchema && schemaName) {
    applyColorSchema(schemaName);
    initialStore.saveColorSchema(schemaName);
  }
};
</script>
<template>
  <footer>
    <div class="footer-up">
      <div class="footer-up-left">
        <v-icon-import
          class="logo"
          name="logo"
          :size="48"
          fill="none"
        />
        <div class="footer-up-left-text">
          shikireki
        </div>
      </div>
      <div class="footer-up-right">
        <v-button :circle="true" @click="changeColorSchemaClickHandler(disabledColorSchema?.name)">
          <template #icon>
            <VIcon
              name="sun"
              :size="24"
            />
          </template>
        </v-button>
      </div>
    </div>
    <div class="footer-down">
      <div class="footer-down-left">
        <a href="https://github.com/pont1s/shikireki" target="_blank">
          <span class="text-down">GitHub</span>
        </a>
      </div>
      <div class="footer-down-right">
        <span class="text-down">Copyright © startdown {{ currentYear }}</span>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 3rem;
  width: 100%;
  background: var(--color-background-footer);
  color: #ffffff;

  a {
    color: #ffffff;
  }

  .footer-up {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      :deep(svg) {
        .footer-main {
          fill: var(--color-icon-footer-main);
        }

        .footer-secondary {
          fill: var(--color-icon-footer-secondary);
        }
      }
    }

    .footer-up-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
    }

    .footer-up-right {
      :deep(use) {
        fill: #ffffff;
        transition: fill ease-in-out .2s;
      }

      //&:hover {
      //  color: var(--color-primary);
      //
      //  :deep(use) {
      //    fill: var(--color-primary);
      //  }
      //}
    }
  }

  .footer-down {
    display: flex;
    justify-content: space-between;
  }
}
</style>

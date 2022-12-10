<script lang="ts" setup>
</script>

<template>
  <div class="information">
    <div class="information-item">
      <div class="title">
        Тип:
      </div>
      <div class="value">
        TV Сериал
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Эпизоды:
      </div>
      <div class="value">
        2
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Следующий эпизод:
      </div>
      <div class="value">
        24 окт. 18:00
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Длительность эпизода:
      </div>
      <div class="value">
        24 мин.
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Статус:
      </div>
      <div class="value">
        с 11 окт. 2022 г.
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Рейтинг:
      </div>
      <div class="value">
        R-17
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        По-японски:
      </div>
      <div class="value">
        BLEACH: 千年血戦篇
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        По-английски:
      </div>
      <div class="value">
        Bleach: Thousand-Year Blood War
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.information {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .information-item {
    display: flex;
    gap: 1rem;

    .title {
      width: 7rem;
      font-weight: 500;
    }
  }
}
</style>

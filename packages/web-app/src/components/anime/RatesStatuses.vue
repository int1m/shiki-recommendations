<script lang="ts" setup>
</script>

<template>
  <div class="rates-statuses">
    <div class="title">
      В списках у людей
    </div>
    <div class="rates-statuses-content">
      <div class="rate-statuses">
        <div class="rate-statuses-char">
          <span />
        </div>
        <div class="rate-statuses-title">
          Запланировано
        </div>
      </div>
      <div class="rate-statuses">
        <div class="rate-statuses-char">
          <span />
        </div>
        <div class="rate-statuses-title">
          Просмотренно
        </div>
      </div>
      <div class="rate-statuses">
        <div class="rate-statuses-char">
          <span />
        </div>
        <div class="rate-statuses-title">
          Смотрю
        </div>
      </div>
      <div class="rate-statuses">
        <div class="rate-statuses-char">
          <span />
        </div>
        <div class="rate-statuses-title">
          Брошено
        </div>
      </div>
      <div class="rate-statuses">
        <div class="rate-statuses-char">
          <span />
        </div>
        <div class="rate-statuses-title">
          Отложено
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rates-statuses {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .rates-statuses-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

   .rate-statuses {
     display: flex;
     align-items: center;
     gap: 2rem;

     .rate-statuses-char {
       position: relative;
       width: 100%;
       height: 0.5rem;
       background-color: var(--color-background-rates);
       border-radius: 0.25rem;

       span {
         position: absolute;
         top: 0;
         left: 0;
         height: 100%;
         width: 60%;
         background-color: var(--color-primary);
         border-radius: 0.25rem;
       }
     }

     .rate-statuses-title {
       text-align: end;
       max-width: 7.5rem;
       width: 100%;
     }
   }
  }
}
</style>

<script lang="ts" setup>

</script>
<template>
  <footer class="footer">
    <div class="footer-up">
      <div class="footer-up-left">
        <div class="footer-up-left-icon">
          <svg class="v-icon">
            <use class="svg" href="#icon-logo-light" />
          </svg>
        </div>
        <div class="footer-up-left-text">
          <span class="text-up"> shikireki</span>
        </div>
      </div>
      <div class="footer-up-right">
        <div class="footer-up-right-icon">
          <svg class="v-icon">
            <use class="svg" href="#icon-sun" />
          </svg>
        </div>
      </div>
    </div>
    <div class="footer-down">
      <div class="footer-down-left">
        <a href="#">
          <span class="text-down">GitHub</span>
        </a>
      </div>
      <div class="footer-down-right">
        <span class="text-down">Copyright © startdown 2022</span>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 3.125rem;
  width: 100%;
  height: 8.813rem;
  left: 0;
  top: 50rem;
  background: #5C77F2;
  @media (min-width: 927px) {
    display: none;
  }
  .footer-up{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .footer-up-right{
    display: flex;
    align-items: center;
    left: 0.0833rem;
    right: 0.0833rem;
    top: 0.0833rem;
    bottom: 0.0833rem;

  }
  .footer-up-right-icon{
    display: flex;
    align-items: center;
    width: 1.667rem;
    height: 1.667rem;
    fill: #ffffff;

  }
  .footer-up-left{
    display: flex;
    align-items: center;

  }
  .footer-up-left-icon{
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    left: 0;
    top: 0;
  }
  .text-up{
    display: flex;
    width: 5.688rem;
    height: 1.75rem;
    top: 0.469rem;
    left: 3.469px;
    font-size: 24px;
    line-height: 1.758rem;
    color: #ffffff;
  }
  .footer-down{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .footer-down-left{
    width: 3.125rem;
    height: 1.188rem;
  }
  .text-down{
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 16px;
    line-height: 1.172rem;
    font-style: normal;
    font-weight: 400;
  }
  .footer-down-right{
    width: 12.625rem;
    height: 1.188rem;
  }
}
</style>

<template>
  <div class="social-medias">
    <a href="/" class="social-medias__item"> <TelegramSvg /> </a>
    <a href="/" class="social-medias__item"> <WhatsupSvg /> </a>
    <a href="/" class="social-medias__item"> <MessengerSvg /> </a>
  </div>
</template>

<script lang="ts" setup>
import TelegramSvg from '@/assets/images/icons/telegram.svg?component';
import WhatsupSvg from '@/assets/images/icons/whatsup.svg?component';
import MessengerSvg from '@/assets/images/icons/messenger.svg?component';

</script>

<style lang="scss" scoped>
.social-medias{
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
</style>

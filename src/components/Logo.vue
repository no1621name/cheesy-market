<template>
  <NuxtLink to="/" class="logo">
    <Logo2Svg v-if="isTablet" />
    <LogoSvg v-else />
    <div class="logo__content">
      <h3 class="logo__title">
        Сыроварение
      </h3>
      <span class="logo__subcontent">
        Оборудование и товары для сыроделия
      </span>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import LogoSvg from '@/assets/images/icons/logo.svg?component';
import Logo2Svg from '@/assets/images/icons/logo-2.svg?component';

const { isTablet } = useGetWidowWidth();
</script>

<style lang="scss" scoped>
.logo{
  display: flex;
  text-decoration: none;
  align-items: center;
  svg{
    margin-right: 10px;
  }
  .logo__content{
    display: flex;
    align-items: center;
    flex-direction: column;
    .logo__title{
      color: $brown;
      @include Heading1();
      text-transform: uppercase;
      margin: 0 0 -10px 0;
    }
    .logo__subcontent{
      color: $brown;
      text-align: center;
      @include CirceRounded16();
      font-weight: 700;
      font-size: .75rem;
    }
  }
}

@media (max-width: 1200px) {
  .logo .logo__content .logo__title{
    font-size: 1.5rem;
  }
}
@media (max-width: 1023px) {
  .logo .logo__content{
    .logo__title{
      font-size: 1.2rem;
      margin-bottom: -17px;
    }
    .logo__subcontent{
      font-size: 0.5rem;
    }
  }
}
</style>

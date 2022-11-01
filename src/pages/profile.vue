<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <NuxtLayout name="min">
    <template #beforeMain>
      <BreadCrumbs />
    </template>
    <template #default>
      <div class="profile w-100 mt-3">
        <template v-if="!userStore.isAuth">
          <Info>
            <p class="m-0 text-center fs-3">
              Чтобы попасть в профиль <NuxtLink to="/auth" class="highlighted">
                авторизуйтесь
              </NuxtLink>
            </p>
          </Info>
        </template>
        <template v-else>
          <h3 class="profile__title brown">
            Личный кабинет
          </h3>
          <CRow class="profile__content" :xs="{gutterX: 0}">
            <CCol :xs="12">
              <nav class="mt-3 w-100 d-flex flex-row justify-content-between">
                <span v-for="(item, key) in navItems" :key="key">
                  <CButton
                    class="profile__nav__button"
                    @click="() => selectetSection = key"
                    v-html="item.text"
                  />
                </span>
              </nav>
            </CCol>
            <CCol :xs="12">
              <component :is="navItems[selectetSection as keyof typeof navItems].component" />
            </CCol>
          </CRow>
        </template>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import User3Svg from '@/assets/images/icons/user-3.svg?raw';
import OrdersSvg from '@/assets/images/icons/orders.svg?raw';
import FollowSvg from '@/assets/images/icons/follow-2.svg?raw';
import CouponSvg from '@/assets/images/icons/coupon.svg?raw';
import PasswordSvg from '@/assets/images/icons/password.svg?raw';
import LogoutSvg from '@/assets/images/icons/logout.svg?raw';

import BreadCrumbs from '@/components/UI/BreadCrumbs.vue';
import Info from '@/components/UI/Info.vue';

import Favourites from '@/components/Profile/Favourites.vue';
import Orders from '@/components/Profile/Orders.vue';
import Coupons from '@/components/Profile/Coupons.vue';
import ChangePassword from '@/components/Profile/ChangePassword.vue';
import Logout from '@/components/Profile/Logout.vue';
import Home from '@/components/Profile/Home.vue';

import { useUserStore } from '@/store/user';
import { useBreadCrumbsStore } from '@/store/breadCrumbs';

definePageMeta({
  layout: false,
});

useBreadCrumbsStore().addBreadCrumb({ name: 'Личный кабинет', href: '/profile' });
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.$state.userInfo) {
    await userStore.saveUserData(false);
  }
});

const navItems = {
  home: {
    text: `${User3Svg} Мой профиль`,
    component: Home
  },
  orders: {
    text: `${OrdersSvg} Мои заказы`,
    component: Orders
  },
  favourites: {
    text: `${FollowSvg} Избранные товары`,
    component: Favourites
  },
  coupons: {
    text: `${CouponSvg} Мои купоны`,
    component: Coupons
  },
  changePassword: {
    text: `${PasswordSvg} Сменить пароль`,
    component: ChangePassword
  },
  logout: {
    text: `${LogoutSvg} Выход`,
    component: Logout
  },
};

const selectetSection = ref('home');
</script>

<style lang="scss">
.profile{
  @include CirceRounded16();
  .profile__title{
    @include Heading1();
  }
  .profile__nav__button{
    transition: all .2s linear;
    border-radius: 0;
    color: $brown;
    display: flex;
    align-items: center;
    svg{
      margin-right: 5px;
    }
    &:hover{
      border-bottom: 1px solid $brown !important;
    }
  }
}
</style>

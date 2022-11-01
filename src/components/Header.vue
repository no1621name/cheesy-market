<template>
  <header class="header">
    <CContainer class="header__container p-0" md>
      <CRow class="header__top" :xs="{gutter: 0}">
        <CCol
          class="header__city"
          xs="7"
          md="6"
          lg="5"
          xl="4"
        >
          <CDropdown class="header__city-select">
            <CDropdownToggle class="header__city-toggle" @click.once="getCitiesList">
              <ClientOnly>
                <template v-if="!isMobile">
                  <LocationPointSvg /> {{ `Ваш город: ${userInfo.address.city}` }}  <DropdownArrow1Svg />
                </template>
                <template v-else>
                  {{ userInfo.address.city }}
                </template>
                <template #placeholder>
                  <LocationPointSvg /> Ваш город: Москва  <DropdownArrow1Svg />
                </template>
              </ClientOnly>
            </CDropdownToggle>
            <CDropdownMenu class="header__city-list">
              <template v-if="citiesList.length">
                <CDropdownItem
                  v-for="city in citiesList"
                  :key="city._id"
                  class="header__city-item"
                  href="#"
                  @click="changeUserCity(city._id)"
                >
                  {{ city.name }}
                </CDropdownItem>
              </template>
              <template v-else>
                <CDropdownItem>
                  Загрузка...
                </CDropdownItem>
              </template>
            </CDropdownMenu>
          </CDropdown>
          <span class="header__worktime">
            <ClockSvg v-if="!isMobile" />
            Пн-Пт 9:00 - 19:00
          </span>
        </CCol>
        <CCol
          class="header__user"
          xs="4"
          xl="2"
        >
          <NuxtLink
            v-if="isAuth"
            to="/profile"
            class="header__link"
          >
            <UserSvg />
            Профиль
          </NuxtLink>
          <CButton
            v-else
            class="header__button_auth"
            @click="toggleAuth"
          >
            <UserSvg />
            Войти в аккаунт
          </CButton>
        </CCol>
      </CRow>
      <template v-if="isTablet">
        <CRow class="header__middle tablet" :xs="{gutter: 0}">
          <CCol class="header__logo-wrapper" xs="5">
            <Logo />
          </CCol>
          <CCol class="header__navigation-buttons" xs="5">
            <CButton
              :class="{
                'header__button_search': true,
                active: isVisibleSearch
              }"
              @click="() => {isVisibleMobileMenu ? toggleMobileMenu() : ''; toggleSearch();}"
            >
              <SearchLoupeSvg />
            </CButton>
            <CartDropdownToggler @click="() => {isVisibleMobileMenu = false; isVisibleSearch = false}" />
            <CButton
              :class="{
                'header__button_burger': true,
                active: isVisibleMobileMenu
              }"
              @click="() => {isVisibleSearch ? toggleSearch() : ''; toggleMobileMenu();}"
            >
              <BurgerSvg />
            </CButton>
          </CCol>
          <CCol class="header__call" xs="12">
            <span class="header__phone-number"> <PhoneSvg /> +7 916 460-19-60</span>
          </CCol>
        </CRow>
        <CRow class="header__bottom tablet" :xs="{gutter: 0}">
          <Transition name="header-menu-mobile">
            <CCol
              v-if="isVisibleSearch"
              class="header__search"
              xs="12"
            >
              <SearchInput />
            </CCol>
          </Transition>
          <Transition name="header-menu-mobile">
            <CCol
              v-if="isVisibleMobileMenu"
              class="header__menu"
              xs="12"
            >
              <Menu />
            </CCol>
          </Transition>
        </CRow>
      </template>
      <template v-else>
        <CRow class="header__middle" :xs="{gutter: 0}">
          <CCol
            class="header__logo-wrapper"
            lg="3"
          >
            <Logo />
          </CCol>
          <CCol
            class="header__advantages"
            lg="5"
            xl="5"
            xxl="4"
          >
            <Advantages />
          </CCol>
          <CCol class="header__social-meadias" lg="1">
            <SocialMedias />
          </CCol>
          <CCol
            class="header__call"
            lg="2"
          >
            <span class="header__phone-number">+7 916 460-19-60</span>
          </CCol>
          <CCol class="header__cart" lg="2">
            <CartDropdownToggler />
          </CCol>
        </CRow>
        <CRow class="header__bottom" :xs="{gutter: 0}">
          <CCol class="header__nav" lg="7">
            <Menu />
          </CCol>
          <CCol class="header__search" lg="4">
            <SearchInput />
          </CCol>
        </CRow>
      </template>
    </CContainer>
    <AuthModal
      :show="isVisibleAuth"
      @close="toggleAuth"
    />
  </header>
</template>

<script lang="ts" setup>
import LocationPointSvg from '@/assets/images/icons/location-point.svg?component';
import DropdownArrow1Svg from '@/assets/images/icons/dropdown-arrow-1.svg?component';
import ClockSvg from '@/assets/images/icons/clock.svg?component';
import UserSvg from '@/assets/images/icons/user.svg?component';
import SearchLoupeSvg from '@/assets/images/icons/search-loupe.svg?component';
import PhoneSvg from '@/assets/images/icons/phone.svg?component';
import BurgerSvg from '@/assets/images/icons/burger.svg?component';

import SocialMedias from '@/components/Content/Header/SocialMedias.vue';
import Advantages from '@/components/Content/Header/Advantages.vue';
import CartDropdownToggler from '@/components/CartDropdown/Toggler.vue';
import Menu from '@/components/Menu.vue';
import SearchInput from '@/components/Search/Input.vue';
import AuthModal from '@/components/Auth/Modal.vue';
import Logo from '@/components/Logo.vue';

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useNotifierStore } from '@/store/notifier';

const userStore = useUserStore();
const notifierStore = useNotifierStore();

const { userInfo, isAuth } = storeToRefs(userStore);
const { addServerError } = notifierStore;

const { isMobile, isTablet } = useGetWidowWidth();
const { bool: isVisibleAuth, toggleBool: toggleAuth } = useGetToggledBoolean();
const { bool: isVisibleSearch, toggleBool: toggleSearch } = useGetToggledBoolean();
const { bool: isVisibleMobileMenu, toggleBool: toggleMobileMenu } = useGetToggledBoolean();

const citiesList = ref<City[]>([]);

const getCitiesList = async () => {
  await $fetchApi<ServerResponseI<'cities', City[]>>('/cities', {
    async onResponse({ response }) {
      citiesList.value = response._data.data.cities;
    }
  });
};

const changeUserCity = async (id: number) => {
  await $fetchApi<ServerResponseI<'city', City>>(`/cities/${id}`, {
    async onResponse({ response }) {
      if (response.ok) {
        userInfo.value.address.city = response._data.data.city.name;
        userInfo.value.address.city_id = response._data.data.city._id;
        userInfo.value.address.subject = response._data.data.city.subject;
      }
    },
    async onResponseError() {
      addServerError();
    }
  });
};
</script>

<style lang="scss" scoped>
.header{
  border: none;
  padding: 0;
  padding-bottom: 12px;
  .header__container{
    @include Roboto14();
    .row > div {
      display: flex;
      align-items: center;
    }
    .header__top{
      padding-top: 12px;
      justify-content: space-between;
      .header__city{
        display: flex;
        align-items: center;
        .header__city-select{
          padding-right: 10px;
          border-radius: 0;
          .header__city-list{
            .header__city-item{
              font-size: .875rem;
            }
          }
        }
        .header__worktime{
          padding-left: 10px;
        }
      }
      .header__user{
        display: flex;
        justify-content: flex-end;
        > *{
          text-decoration: none;
          color: $black;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: .875rem;
          padding: 0;
          svg{
            margin-right: 5px;
          }
        }
      }
    }
    .header__middle{
      padding: 24px 0;
      .header__social-meadias{
        padding: 0 10px !important;
      }
      .header__call{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .header__cart{
        display: flex;
        align-self: center;
        justify-content: flex-end;
      }
      &.tablet{
        justify-content: space-between;
        align-items: flex-start;
        .header__navigation-buttons{
          justify-content: flex-end;
          flex-wrap: wrap;
          .header__button_search svg path{
            stroke: $black;
          }
          .active svg path{
            stroke: $orange;
          }
          svg path{
            transition: stroke .2s linear;
          }
        }
        .header__call{
          padding-top: 10px;
          justify-content: center;
          .header__phone-number{
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            line-height: 1.375rem;
            justify-content: center;
            svg {
              margin-right: 5px;
              width: 20px;
              height: 20px;
              path{
                stroke: $brown;
              }
            }
          }
        }
      }
    }
    .header__bottom{
      justify-content: space-between;
      &.tablet {
        > div {
          margin: 5px 0;
        }
      }
    }
    .header__phone-number{
      @include Roboto16Bold();
      font-size: 1.25rem;
      color: $brown;
    }
    .dropdown-toggle{
      padding: 0;
      font-size: 14px !important;
    }
  }
}

.header-menu-mobile-enter-active,
.header-menu-mobile-leave-active {
  transition: transform .2s ease;
}

.header-menu-mobile-enter-from,
.header-menu-mobile-leave-to {
  transform: scaleY(0);
}
.header-menu-mobile-enter-to,
.header-menu-mobile-leave-from{
  transform: scaleY(1);
}

@media (max-width: 1399px) {
  .header .header__container {
    .header__middle{
      .header__social-meadias{
        display: none;
      }
      .header__call .header__phone-number{
        font-size: 1.1rem;
      }
    }
  }
}

@media (max-width: 767px) {
  .header .header__container{
    padding: 0;
    > .row {
      padding-left: 10px;
      padding-right: 10px
    }
    .header__top{
      padding: 10px;
      background: $black;
      > .btn {
        border: none !important;
      }
      .header__city{
        .header__city-select{
          border-right: 1px solid $darkGrey;
          .header__city-toggle{
            color: $white;
            border: none !important;
          }
        }
        .header__worktime{
          color: $white;
        }
      }
      .header__user{
        .header__button_auth{
          border: none !important;
        }
        > *{
          color: $white;
          svg{
            fill: $orange;
          }
        }
      }
    }
  }
}

@media (max-width: 375px) {
  .header .header__container .header__top .header__user .header__button_auth{
    flex-direction: column;
  }
}
</style>

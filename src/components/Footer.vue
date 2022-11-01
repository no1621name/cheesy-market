<template>
  <footer class="footer">
    <CContainer class="footer__container">
      <CRow class="footer__main">
        <CCol
          class="footer__author ps-0"
          md="4"
          xs="12"
        >
          <Logo />
          <p>
            Данный сайт является лишь <b>демонстрацией функционала</b> и не несёт в себе коммерческой цели.
            <a href="https://www.figma.com/file/7RKQRyjZm6KhKKMNQrhQMt/Syrolavka-Website-design">Макет</a> был взят из открытых источиков.
            <a href="https://syrolavka.ru/">Оригинальный сайт.</a>
            По всем вопросам: <a href="https://t.me/george1621">телеграм</a> или почта georges1621@gmail.com.
          </p>
        </CCol>
        <CCol
          class="footer__list"
          md="2"
          sm="3"
          xs="6"
        >
          <h5 class="footer__title">
            О проекте
          </h5>
          <div class="footer__list-container">
            <a class="footer__list-link" href="https://github.com/no1621name">
              GitHub
            </a>
          </div>
        </CCol>
        <CCol
          class="footer__list"
          md="2"
          sm="3"
          xs="6"
        >
          <h5 class="footer__title">
            Способы оплаты
          </h5>
          <div class="footer__payment">
            <CashSvg />
            <SberbankSvg />
            <YandexMoneySvg />
            <MastercardSvg />
            <VisaSvg />
          </div>
        </CCol>
        <CCol
          class="footer__contacts pe-0"
          md="2"
          sm="12"
          xs="6"
        >
          <span class="footer__title">
            +7 495 120-00-00
          </span>
          <span class="footer__worktime">
            <ClockSvg /> Пн-пт 9:00 - 19:00
          </span>
          <span class="footer__worktime">
            <LocationPointSvg /> г. Москва,  улица Свободы 1/7
          </span>
          <div class="footer__social-medias">
            <a href="/">
              <InstagramSvg />
            </a>
            <a href="/">
              <VkSvg />
            </a>
            <a href="/">
              <TwitterSvg />
            </a>
            <a href="/">
              <FacebookSvg />
            </a>
            <a href="/">
              <YoutubeSvg />
            </a>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </footer>
</template>

<script lang="ts" setup>
import CashSvg from '@/assets/images/icons/cash.svg?component';
import SberbankSvg from '@/assets/images/icons/sberbank.svg?component';
import YandexMoneySvg from '@/assets/images/icons/yandex-money.svg?component';
import MastercardSvg from '@/assets/images/icons/mastercard.svg?component';
import VisaSvg from '@/assets/images/icons/visa.svg?component';
import ClockSvg from '@/assets/images/icons/clock.svg?component';
import LocationPointSvg from '@/assets/images/icons/location-point.svg?component';
import InstagramSvg from '@/assets/images/icons/instagram.svg?component';
import VkSvg from '@/assets/images/icons/vk.svg?component';
import TwitterSvg from '@/assets/images/icons/twitter.svg?component';
import FacebookSvg from '@/assets/images/icons/facebook.svg?component';
import YoutubeSvg from '@/assets/images/icons/youtube.svg?component';

import Logo from '@/components/Logo.vue';
</script>

<style lang="scss" scoped>
.footer{
  background: $white;
  border: none;
  padding: 0 !important;
  .footer__container{
    padding: 50px 0;
    .footer__main {
      justify-content: space-between;
      padding: 0 !important;
      .footer__author{
        p{
          margin-top: 20px;
          color: $darkGrey;
          @include CirceRounded16();
          font-size: .875rem;
          a{
            color: $orange;
          }
        }
      }
      .footer__title{
        @include CirceRounded16();
        font-size: 1.125rem;
        margin-bottom: 10px;
      }
      .footer__list{
        .footer__list-container{
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .footer__list-link{
            @include Link();
            @include CirceRounded16();
            font-size: .875rem;
            line-height: 1.25rem;
          }
        }
        .footer__payment{
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }
      .footer__contacts{
          display: flex;
          flex-direction: column;
          text-align: right;
          @include CirceRounded16();
          font-size: .875rem;
          line-height: 1.25rem;
          .footer__social-medias{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
          }
      }
    }
  }
}

@media (max-width: 767px) {
  .footer .footer__container .footer__main .footer__contacts{
    text-align: center;
    margin-top: 40px;
  }
}
@media (max-width: 575px){
  .footer .footer__container .footer__main {
    .footer__list:nth-child(n+2){
      height: max-content;
      padding-bottom: 20px;
    }
    .footer__contacts{
      margin: 0;
      text-align: right;
    }
  }
}
</style>

<template>
  <div class="auth w-100">
    <template v-if="!useIsAuth().value">
      <CRow
        v-if="formContent === 'regist'"
        class="auth__form"
        :lg="{gutter:0}"
      >
        <CCol :lg="6" class="auth__side-content">
          <header>
            <h4 class="brown auth__side-content__title">
              Регистрация аккаунта
            </h4>
            <p>Делайте покупки быстро и удобно, отслеживайте статус заказа и получайте скидки.</p>
          </header>
          <CRow :xs="{gutterX: 0, gutterY: 4}">
            <CCol :xs="12" class="auth__side-content__item">
              <Gift2Svg />
              <h5>
                Возвращаем 10% бонусами
              </h5>
              <p>При заказе на сумму от 3500 руб. и весе до 3 кг. предоставляется бесплатная доставка по всей Россиию</p>
            </CCol>
            <CCol :xs="12" class="auth__side-content__item">
              <Medal2Svg />
              <h5>
                Гарантия качества
              </h5>
              <p>При заказе на сумму от 3500 руб. и весе до 3 кг. предоставляется бесплатная доставка по всей Россиию</p>
            </CCol>
            <CCol :xs="12" class="auth__side-content__item">
              <CreditCard3Svg />
              <h5>
                Удобные способы оплаты
              </h5>
              <p>При заказе на сумму от 3500 руб. и весе до 3 кг. предоставляется бесплатная доставка по всей Россиию</p>
            </CCol>
          </CRow>
        </CCol>
        <CCol :lg="6">
          <AuthRegistForm
            :header="false"
            @change-form="(val) => formContent = val"
          />
        </CCol>
      </CRow>
      <CRow
        v-else-if="formContent === 'login'"
        class="auth__form"
        :lg="{gutter:0}"
      >
        <CCol :lg="6" class="d-flex justify-content-around flex-column">
          <h3 class="brown mx-auto d-block fw-bold">
            Постоянный покупатель
          </h3>
          <AuthLoginForm
            :tip="false"
            :header="false"
            @submit="() => navigateTo('/profile')"
            @change-form="(val) => formContent = val"
          />
        </CCol>
        <CCol :lg="6" class="auth__side-content d-flex align-items-center flex-column justify-content-evenly">
          <header class="text-center">
            <h4 class="brown auth__side-content__title">
              Создайте аккаунт
            </h4>
            <p>Делайте покупки быстро и удобно, отслеживайте статус заказа и получайте скидки.</p>
          </header>
          <CButton class="button_reverse w-75" @click="() => formContent ='regist'">
            Зарегистрироваться
          </CButton>
        </CCol>
      </CRow>
      <CRow
        v-else-if="formContent === 'recover'"
        class="auth__form justify-content-center"
        :lg="{gutter:0}"
      >
        <CCol :lg="6" class="d-flex justify-content-around flex-column">
          <header>
            <h3 class="brown fw-bold">
              Восстановить пароль
            </h3>
            <p>
              Введите адрес электронной почты Вашей учетной записи. Нажмите кнопку продолжить, чтобы получить пароль по электронной почте.
            </p>
          </header>
          <AuthRecoverForm
            :header="false"
            @submit="() => navigateTo('/profile')"
            @change-form="(val) => formContent = val"
          />
        </CCol>
      </CRow>
      <CRow v-else class="auth__form auth__info d-flex justify-content-center">
        <Info>
          <h3 class="brown fw-bold d-block mx-auto">
            Письмо отправлено на вашу почту!
          </h3>
        </Info>
      </CRow>
    </template>
    <template v-else>
      <CRow class="auth__form auth__info d-flex justify-content-center">
        <Info>
          <h3>
            Вы уже вошли в аккаунт!
          </h3>
          <p>
            Перейдите в
            <NuxtLink to="/profile">
              профиль
            </NuxtLink>
          </p>
        </Info>
      </CRow>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Gift2Svg from '@/assets/images/icons/gift-2.svg?component';
import Medal2Svg from '@/assets/images/icons/medal-2.svg?component';
import CreditCard3Svg from '@/assets/images/icons/credit-card-3.svg?component';

import Info from '@/components/UI/Info.vue';
import AuthLoginForm from '@/components/Auth/LoginForm.vue';
import AuthRegistForm from '@/components/Auth/RegistForm.vue';
import AuthRecoverForm from '@/components/Auth/RecoverForm.vue';

definePageMeta({
  layout: 'min',
});

const formContent = ref<ModalContent>('regist');
</script>

<style lang="scss">
.auth{
  @include CirceRounded16();
  overflow: hidden;
  border-radius: 8px;
  .auth__form {
    > *{
      padding: 30px 48px;
    }
    h3{
      width: max-content;
    }
    .auth__side-content{
      background: #FDF2D8;
      .auth__side-content__title{
        @include Heading1();
      }
      .auth__side-content__item{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        svg{
          margin-bottom: 10px;
        }
        h5{
          font-weight: 700;
        }
        p{
          color: $darkGrey;
        }
      }
    }
    &.auth__info{
      background: #FDF2D8;
    }
  }
}
</style>

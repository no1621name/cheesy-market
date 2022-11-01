<template>
  <NuxtLayout name="min">
    <template #beforeMain>
      <BreadCrumbs />
    </template>
    <template #default>
      <Info v-if="!isAuth">
        <p class="m-0 text-center fs-3">
          Чтобы попасть в профиль <NuxtLink to="/auth" class="highlighted">
            авторизуйтесь
          </NuxtLink>
        </p>
      </Info>
      <CRow v-else class="order">
        <CCol class="ps-0 order__content" :lg="8">
          <h2 class="brown fw-bold mb-4">
            Оформление заказа
          </h2>
          <ClientOnly>
            <List :title="`Заказ (${amount})`" class="order__cart-list">
              <template #header>
                <span class="order__cart-list__cost">
                  {{ `на сумму ${cost} руб.` }}
                </span>
              </template>
              <template #main>
                <CCol
                  v-for="product in cartList"
                  :key="product._id"
                  :xs="12"
                >
                  <Card :img="false" class="border-0">
                    <CRow class="justify-content-between" :xs="{gutterX:0}">
                      <CCol :lg="2">
                        <NuxtLink
                          :to="`/products/${product._id}`"
                          class="card-link text-decoration-none"
                        >
                          <NuxtImg
                            class="w-100 h-100"
                            provider="cloudinary"
                            :src="`/products/${product.images[0] || 'placegolder'}.png`"
                          />
                        </NuxtLink>
                      </CCol>
                      <CCol class="d-flex flex-column align-items-start" :lg="6">
                        <NuxtLink
                          :to="`/products/${product._id}`"
                          class="card-link text-decoration-none"
                        >
                          <h5>{{ product.name }}</h5>
                        </NuxtLink>
                        <span class="darkened">
                          Артикул: {{ product.vendor }}
                        </span>
                        <CButton class="p-0 mt-3 text-decoration-underline highlighted" @click="removeProduct">
                          Удалить
                        </CButton>
                      </CCol>
                      <CCol :lg="2">
                        <Counter
                          :value="product.amount"
                          :max="product.quantityInStock"
                          @plus="changeProductCount(product._id, 1)"
                          @minus="changeProductCount(product._id, -1)"
                        />
                      </CCol>
                      <CCol :lg="2" class="d-flex justify-content-end">
                        <span class="fw-bold fs-4">
                          {{ useGetPriceWithDiscount(product.price, product.discount) }} ₽
                        </span>
                      </CCol>
                    </CRow>
                  </Card>
                </CCol>
              </template>
            </List>
            <div class="px-3">
              <h3 class="order__sub-title">
                Ваши данные:
              </h3>
              <UserFrom />
            </div>
            <CRow>
              <CCol>
                <h3 class="order__sub-title">
                  Способ доставки
                </h3>
                <Radio
                  v-for="deliveryType in deliveryTypes"
                  :id="`deliveryTypeRadio${deliveryType._id}`"
                  :key="deliveryType._id"
                  :model-value="deliveryTypesForSelect[deliveryType._id]"
                  :disabled="deliveryType._id === 1 && cost < 2500"
                  name="delivery"
                  disabled-msg="Чтобы получить бесплатню доставку, сделайте заказ более, чем на 2500 рублей"
                  @update:modelValue="(v) => {
                    clearSelectedDeliveryType();
                    deliveryTypesForSelect[deliveryType._id] = v;
                  }"
                >
                  {{ `${deliveryType.name} (${deliveryType.priceList[deliveryTypePriceIndex(deliveryType)].value})` }}
                </Radio>
              </CCol>
              <CCol>
                <h3 class="order__sub-title">
                  Способ оплаты
                </h3>
                <Radio
                  v-for="paymentType in paymentTypes"
                  :id="`paymentTypeRadio${paymentType._id}`"
                  :key="paymentType._id"
                  v-model="paymentTypesForSelect[paymentType._id]"
                  name="payment"
                >
                  {{ paymentType.name }}
                </Radio>
              </CCol>
            </CRow>

            <template #placeholder>
              <CCol class="d-flex justify-content-center">
                <Spinner />
              </CCol>
            </template>
          </ClientOnly>
        </CCol>
        <CCol class="pe-0" :lg="4">
          <div class="order__accept p-4">
            <h4 class="fw-bold brown">
              Итоги заказа
            </h4>
            <div class="order__accept__middle">
              <fieldset id="fieldsetCoupon">
                <CFormLabel for="couponInput">
                  Есть промокод для скидки?
                </CFormLabel>
                <span class="order__coupon-input">
                  <CFormInput
                    id="couponInput"
                    v-model.trim="couponCode"
                    class="border-0 brown"
                    placeholder="Введите его сюда"
                    @input="() => {
                      couponError = '';
                    }"
                  />
                  <CButton class="brown fw-bold border-0" @click="sendCouponRequest">
                    Применить
                  </CButton>
                </span>
                <p v-if="couponError || err" class="order__error">
                  {{ couponError || err }}
                </p>
              </fieldset>
              <div class="mt-3">
                <p>
                  Сумма заказа
                  <span>{{ cost }} руб.</span>
                </p>
                <p>
                  Доставка
                  <span>{{ selectedDeliveryTypeInfo.deliveryValue.value || 0 }} руб.</span>
                </p>
                <p>
                  Купон
                  <span> {{ coupon.discountValue ? `-${coupon.discountValue}` : 0 }} руб.</span>
                </p>
              </div>
            </div>
            <p class="fw-bold my-3">
              К оплате
              <span> {{ total }} руб.</span>
            </p>
            <CButton class="button_success w-100" @click="registOrderRequest">
              Подтвердить заказ
            </CButton>
          </div>
        </CCol>
      </CRow>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import BreadCrumbs from '@/components/UI/BreadCrumbs.vue';
import List from '@/components/UI/List.vue';
import Spinner from '@/components/UI/Spinner.vue';
import Card from '@/components/UI/Card.vue';
import Radio from '@/components/UI/Radio.vue';
import Info from '@/components/UI/Info.vue';
import Counter from '@/components/CartDropdown/Counter.vue';
import UserFrom from '@/components/Profile/UserFrom.vue';

import { useBreadCrumbsStore } from '@/store/breadCrumbs';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { useNotifierStore } from '@/store/notifier';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: false
});

useBreadCrumbsStore().addBreadCrumb({ name: 'Оформление заказа', href: '/cart' });
const userStore = useUserStore();
const cartStore = useCartStore();
const { userInfo, isAuth } = storeToRefs(userStore);
const { amount, cost, cartList } = storeToRefs(cartStore);
const { updateUserInfo } = userStore;
const { addNotification } = useNotifierStore();
const { changeProductCount, removeProduct } = cartStore;

const deliveryResponse = await useApiAsyncData<ServerResponseI<'deliveryTypes', Delivery[]>>('deliveryTypes', '/delivery');
const paymentResponse = await useApiAsyncData<ServerResponseI<'paymentTypes', PaymentType[]>>('paymentTypes', '/payment');
const deliveryTypes = useValidateResponse(deliveryResponse)?.data.deliveryTypes || [];
const paymentTypes = useValidateResponse(paymentResponse)?.data.paymentTypes || [];

const err = ref('');
const couponCode = ref('');
const couponError = ref('');
const coupon = ref<Coupon>({
  discountValue: 0,
  _id: 1,
  expires: '',
  code: '',
});
const deliveryTypesForSelect = ref(deliveryTypes.reduce((prev: {[key: number]: boolean}, curr: Delivery) => {
  prev[curr._id] = false;
  return prev;
}, {}));
const paymentTypesForSelect = ref(deliveryTypes.reduce((prev: {[key: number]: boolean}, curr: PaymentType) => {
  prev[curr._id] = false;
  return prev;
}, {}));

const selectedDeliveryTypeInfo = computed(() => {
  const selectedDeliveryTypeId = +(Object.keys(deliveryTypesForSelect.value).find((k: string) => deliveryTypesForSelect.value[+k]) || 0);
  const selectedDeliveryType = deliveryTypes.find(d => d._id === selectedDeliveryTypeId);
  if (!selectedDeliveryType) {
    return {
      deliveryOption_index: -1,
      delivery_id: -1,
      deliveryValue: {
        description: '',
        value: 0,
        subjects_ids: []
      },
    };
  }
  return {
    deliveryOption_index: deliveryTypePriceIndex(selectedDeliveryType),
    delivery_id: selectedDeliveryTypeId,
    deliveryValue: selectedDeliveryType.priceList[deliveryTypePriceIndex(selectedDeliveryType)],
  };
});

const selectedPaymentTypeId = computed(() => {
  return +(Object.keys(paymentTypesForSelect.value).find((k: string) => paymentTypesForSelect.value[+k]) || 0);
});

const total = computed(() => {
  const productsTotal = cost.value + selectedDeliveryTypeInfo.value.deliveryValue.value;
  return productsTotal - (coupon.value.discountValue < productsTotal ? coupon.value.discountValue : (productsTotal / 100) * 70);
});

const registOrderRequest = async () => {
  err.value = '';

  if (Object.keys(userInfo.value).some((k: string) => {
    const value = userInfo.value[k as keyof User];
    if (k === 'address') {
      return Object.values(value).some(v => !v);
    }
    return !value;
  })) {
    err.value = 'Заполните всю информацию о себе';
    return;
  } else if (!selectedDeliveryTypeInfo.value.delivery_id) {
    err.value = 'Выберите способ доставки';
    return;
  } else if (!selectedPaymentTypeId.value) {
    err.value = 'Выберите способ оплаты';
    return;
  }

  await $fetchApi('/orders', {
    method: 'post',
    body: {
      coupon_id: 0,
      user_id: userInfo.value._id,
      products: cartList.value,
      total: total.value,
      delivery_id: selectedDeliveryTypeInfo.value.delivery_id,
      deliveryOption_index: selectedDeliveryTypeInfo.value.deliveryOption_index,
      paymentType_id: selectedPaymentTypeId.value
    },
    async onResponse({ response }) {
      if (response.ok) {
        addNotification({
          title: 'Заказ оформлен!',
          body: `Ваш заказ успешно принят и ушёл на обработку!
            На вашу почту придёт письмо с дальнейшими деталями заказа.`,
          variant: 'success',
          autohide: false
        });
        setTimeout(async () => {
          await navigateTo('/');
          await updateUserInfo();
        }, 5000);
      }
    }
  });
};

const sendCouponRequest = async () => {
  await $fetchApi<ServerResponseI<'coupon', Coupon>>('/coupons', {
    query: {
      code: couponCode.value
    },
    async onResponse({ response }) {
      if (response.ok) {
        coupon.value = response._data.data.coupon;
      } else {
        couponError.value = 'Купон истёк либо его код введён неверно';
      }
    },
  }, false);
};

const clearSelectedDeliveryType = () => {
  deliveryTypesForSelect.value = Object.fromEntries(
    Object.entries(deliveryTypesForSelect.value)
      .map((entry) => { entry[1] = false; return entry; })
  );
};

const deliveryTypePriceIndex = (d: Delivery) => {
  if (d._id === 1) {
    return 0;
  }
  return d.priceList.findIndex((p: any) => p.subjects_ids.includes(userInfo.value.address.subject_id));
};
</script>

<style lang="scss" scoped>
.order{
  @include CirceRounded16();
  .order__content{
    & > div, & > section{
      margin-top: 20px !important;
    }
    .order__sub-title{
      font-weight: bold;
      color: $brown;
    }
    .order__cart-list{
      max-height: 300px;
      overflow-y: auto;
      .order__cart-list__cost {
        color: $brown;
        @include CirceRounded16();
      }
    }
  }
  .order__accept{
    background: #FEF0C2;
    border-radius: 6px;
    .order__accept__middle{
      border-top: 1px solid rgba($color: $orange, $alpha: .5);
      border-bottom: 1px solid rgba($color: $orange, $alpha: .5);
      padding: 20px 0;
      .order__coupon-input{
        display: flex;
        align-items: center;
        > * {
          padding: 10px;
        }
        input{
          border-radius: 6px 0 0 6px !important;
          &:focus{
            box-shadow: none;
          }
        }
        button{
          background: $white;
          border-radius: 0 6px 6px 0 !important;
        }
      }
    }
    p{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      &.order__error{
        color: $red;
        margin-top: 15px;
        justify-content: center;
      }
    }
  }
}

</style>

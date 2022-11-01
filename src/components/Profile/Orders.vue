<template>
  <List
    :title="`<span class=\&quot; align-items-start\&quot;>
      Мои заказы <p class=\&quot;darkened fw-normal fs-6 mb-0\&quot;>Список ваших прошлых покупок</p>
    </span>`"
    class="mt-4"
    :not-found="!ordersList.length"
  >
    <template #notFound>
      <Info>
        <h4>Вы ещё не сделали ни одного заказа</h4>
      </Info>
    </template>
    <template #main>
      <CCol v-if="!ordersList.length" class="d-flex justify-content-center">
        <Spinner />
      </CCol>
      <CCol
        v-for="order in ordersList"
        v-else
        :key="order._id"
        :xs="12"
        class="order"
      >
        <CRow class="order__header align-items-center">
          <CCol :xs="1" class="highlighted fs-5">
            &#8470; {{ order._id }}
          </CCol>
          <CCol :xs="2" class="fw-bold fs-6">
            Сумма:
            <span class="highlighted">{{ order.total }} ₽</span>
          </CCol>
        </CRow>
        <List
          :title="`<span class=\&quot;highlighted\&quot;>Состав заказа</span>`"
          class="px-4 mt-3"
        >
          <template #beforeMain>
            <CRow class="mt-3 order__header">
              <CCol :lg="1" />
              <CCol :lg="4">
                Товар
              </CCol>
              <CCol>
                Стоимость
              </CCol>
              <CCol>
                Количество
              </CCol>
              <CCol>
                Итого
              </CCol>
              <CCol :lg="2" />
            </CRow>
          </template>
          <template #main>
            <CCol
              v-for="product in order.products"
              :key="product._id"
              :xs="12"
            >
              <CRow class="order__product">
                <CCol :lg="1">
                  <NuxtImg
                    :src="`/products/${product.images[0] || 'placeholder'}.png`"
                    provider="cloudinary"
                    class="w-100 h-100"
                  />
                </CCol>
                <CCol :lg="4" class="fs-6">
                  {{ product.name }}
                  <p class="darkened mb-0">
                    Код товара: {{ product.vendor }}
                  </p>
                </CCol>
                <CCol>
                  {{ product.price - (product.price/100 * product.discount) }} ₽
                </CCol>
                <CCol>
                  {{ product.amount }} шт.
                </CCol>
                <CCol>
                  {{ (product.price - (product.price/100 * product.discount)) * product.amount }} ₽
                </CCol>
                <CCol :lg="2" class="align-items-center">
                  <CButton class="button_success" @click="() => addProduct(product._id)">
                    Добавить
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </template>
        </List>
      </CCol>
    </template>
  </List>
</template>

<script lang="ts" setup>
import Info from '@/components/UI/Info.vue';
import List from '@/components/UI/List.vue';
import Spinner from '@/components/UI/Spinner.vue';

import { useUserStore } from '@/store/user';
import { useCartStore } from '@/store/cart';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { addProduct } = useCartStore();
const { userInfo } = storeToRefs(userStore);

const ordersList = ref<Order[]>([]);
const ordersRequest = await useApiAsyncData<ServerResponseI<'orders', Order[]>>(`ordersUser${userInfo.value._id}`, `/orders/${userInfo.value._id}`);

ordersList.value = useValidateResponse(ordersRequest)?.data.orders || [];
</script>

<style lang="scss" scoped>
.order__header{
  background: #FDF2D8;
  padding: 16px;
  color: $brown;
  font-weight: bold;
}
.order__product > div{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>

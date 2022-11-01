<template>
  <CRow :lg="{gutterY: 4}">
    <CCol
      v-if="couponsList.length !== userStore.userInfo.coupons.length"
      :xs="12"
      class="d-flex justify-content-center"
    >
      <Spinner />
    </CCol>
    <CCol
      v-for="coupon in couponsList"
      v-else-if="couponsList.length"
      :key="coupon._id"
      :xs="12"
      class="d-flex justify-content-between align-items-start border rounded py-2"
    >
      <div>
        <span :class="['coupon__active-mark',`${coupon.expires < new Date().toISOString() ? 'non-active': ''}`]">
          {{ coupon.expires < new Date().toISOString() ? 'Неактивный' : 'Активный' }}
        </span>
        <div>
          <h5 class="fw-bold brown">
            Скидочный купон на {{ coupon.discountValue }} руб.
          </h5>
          <span class="coupon__expires">
            До {{ coupon.expires.split('-')[2] }} {{ monthDictionary[coupon.expires.split('-')[1] as keyof typeof monthDictionary] }} {{ coupon.expires.split('-')[0] }}
          </span>
        </div>
      </div>
      <div class="d-flex flex-column align-items-end">
        <span class="coupon__number">
          &#8470; {{ coupon._id }}
        </span>
        <CButton
          class="coupon__button"
          @click="(e:any) => {
            copyToClipbord(coupon.code);
            e.target.classList.add('button_success');
            e.target.textContent = 'Скопировано!';
          }"
          @focusout="(e: any) => {
            e.target.classList.remove('button_success');
            e.target.textContent = 'Скопировать код';
          }"
        >
          Скопировать код
        </CButton>
      </div>
    </CCol>
    <CCol v-else>
      // TODO: custom
      <NotFound />
    </CCol>
  </CRow>
</template>

<script lang="ts" setup>
import NotFound from '@/components/UI/NotFound.vue';
import Spinner from '@/components/UI/Spinner.vue';

import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const couponsList = ref<Coupon[]>([]);

userStore.userInfo.coupons.forEach(async (id: number) => {
  await $fetchApi<ServerResponseI<'coupon', Coupon>>(`/coupons/${id}`, {
    async onResponse({ response }) {
      couponsList.value.push(response._data.data.coupon);
    }
  });
});

const copyToClipbord = (code: string) => {
  navigator.clipboard.writeText(code);
};
</script>

<style lang="scss" scoped>
.coupon__active-mark{
  @include Roboto16();
  font-weight: bold;
  color: $green;
  display: block;
  margin-bottom: 16px;
  &.non-active {
    color: $red;
  }
}
.coupon__expires, .coupon__number{
  @include Roboto16();
  font-size: .85rem;
  font-weight: bold;
  color: $darkGrey;
}

.coupon__button{
  transition: none;
  border: 1px solid $black !important;
  border-radius: 6px;
  margin-top: 8px;
  &.button_success{
    padding: 6px 12px;
  }
}
</style>

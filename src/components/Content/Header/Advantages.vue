<template>
  <CRow
    class="advantages-list w-100 justify-content-between"
    :xs="{gutterX: 0, gutterY: 0}"
  >
    <template v-if="!highlighted">
      <CCol
        v-c-tooltip="{
          content: `
            Дарим бесплатную доставку в пределах России при
            заказе товара на сумму от 2500 руб.
          `,
          placement: 'bottom'
        }"
        xs="3"
        class="advantage"
      >
        <DeliverySvg />
        <p class="advantage__content">
          Бесплатная доставка
        </p>
      </CCol>
      <CCol
        v-c-tooltip="{
          content: `
            Дарим бесплатную доставку в пределах России при
            заказе товара на сумму от 2500 руб.
          `,
          placement: 'bottom'
        }"
        xs="5"
        class="advantage"
      >
        <CreditCardSvg />
        <p class="advantage__content">
          Скидка при оплате на сайте
        </p>
      </CCol>
      <CCol
        v-c-tooltip="{
          content: `
            Дарим бесплатную доставку в пределах России при
            заказе товара на сумму от 2500 руб.
          `,
          placement: 'bottom'
        }"
        xs="3"
        class="advantage"
      >
        <UserProtectionSvg />
        <p class="advantage__content">
          Защита покупателей
        </p>
      </CCol>
    </template>
    <template v-else>
      <CCol class="advantage">
        <DeliveryHighlightedSvg />
        <p class="advantage__content">
          Бесплатная доставка
        </p>
      </CCol>
      <CCol class="advantage">
        <CreditHighlightedCardSvg />
        <p class="advantage__content">
          Скидка при оплате на сайте
        </p>
      </CCol>
      <CCol class="advantage">
        <UserProtectionHighlightedSvg />
        <p class="advantage__content">
          Защита покупателей
        </p>
      </CCol>
    </template>
  </CRow>
</template>

<script lang="ts" setup>
import DeliverySvg from '@/assets/images/icons/delivery.svg?component';
import CreditCardSvg from '@/assets/images/icons/credit-card.svg?component';
import UserProtectionSvg from '@/assets/images/icons/user-protection.svg?component';
import DeliveryHighlightedSvg from '@/assets/images/icons/delivery-highlighted.svg?component';
import CreditHighlightedCardSvg from '@/assets/images/icons/credit-card-highlighted.svg?component';
import UserProtectionHighlightedSvg from '@/assets/images/icons/user-protection-highlighted.svg?component';

withDefaults(defineProps<{
  highlighted?: boolean,
}>(), {
  highlighted: false,
});
</script>

<style lang="scss" scoped>
.advantages-list .advantage{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg{
    flex: 1;
  }
  .advantage__content{
    flex: 2;
    margin: 0;
    color: $darkGrey;
    @include Roboto14();
    font-size: .8125rem;
  }
}

@media (max-width: 375px) {
  .advantages-list{
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

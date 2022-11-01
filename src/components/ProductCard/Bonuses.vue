<template>
  <p class="m-0 darkened">
    <span class="highlighted">
      +{{ bonuses }}
    </span>
    бонусных рублей
    <CPopover placement="right">
      <template #toggler="{ on }">
        <CButton
          class="p-0 d-inline-flex align-items-center
          justify-contnt-cener"
          v-on="on"
        >
          <QuestionMarkSvg />
        </CButton>
      </template>
      <template #content>
        <slot />
      </template>
    </CPopover>
  </p>
</template>

<script lang="ts" setup>
import QuestionMarkSvg from '@/assets/images/icons/question-mark.svg?component';

defineProps<{ bonuses: number }>();
</script>

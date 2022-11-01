<template>
  <span class="counter rounded-2 d-flex align-items-center">
    <CButton class="counter__button" @click="$emit('minus')">
      -
    </CButton>
    <span class="h-100 px-2 border-0 rounded-0">
      {{ value }}
    </span>
    <CButton
      class="counter__button"
      @click="() => {
        if (value < max) {
          $emit('plus');
        }
      }"
    >
      +
    </CButton>
  </span>
</template>

<script lang="ts" setup>
defineProps<{value: number, max: number}>();
</script>

<style lang="scss" scoped>
.counter{
  width: max-content;
  border: 1px solid rgba(128, 128, 128, 0.3);
  @include CirceRounded16();
  font-size: 1.125rem;
  .counter__button{
    border: none;
    border-radius: 0;
    padding: 4px 8px;
    &:first-of-type{
      border-right: 1px solid rgba(128, 128, 128, 0.3);
    }
    &:last-of-type{
      border-left: 1px solid rgba(128, 128, 128, 0.3);
    }
  }
}
</style>

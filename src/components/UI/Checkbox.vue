<template>
  <label class="custom-checkbox">
    <input
      :checked="modelValue"
      :disabled="disabled"
      class="custom-checkbox__input"
      type="checkbox"
      @change="updateValue($event.target as HTMLInputElement)"
    >
    <span class="custom-checkbox__content">
      <slot />
      <CPopover v-if="disabled && disabledMsg" placement="right">
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
          {{ disabledMsg }}
        </template>
      </CPopover>
    </span>
  </label>
</template>

<script lang="ts" setup>
import QuestionMarkSvg from '@/assets/images/icons/question-mark.svg?component';

const props = withDefaults(defineProps<{
  modelValue: boolean,
  disabled?: boolean,
  disabledMsg?: string
}>(), { disabled: false, disabledMsg: '' });

const { modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue']);

const updateValue = (el: HTMLInputElement) => emit('update:modelValue', el.checked);
</script>

<style lang="scss">
.custom-checkbox{
  display: flex;
  align-items: center;
  margin-top: 16px;
  cursor: pointer;
  .custom-checkbox__input {
    cursor: pointer;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    margin: 0;
    margin-right: 16px;
    width: 20px;
    height: 20px;
    border: 1px solid #CCCCCC;
    border-radius: 2px;
    transition: border-width .2s linear, outline-width .2s linear;
    &::before {
      content: '';
      width: 11.61px;
      height: 7.41px;
      position: absolute;
      top: 4px;
      left: 4px;
      border: 2px solid $orange;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
      transition: opacity .2s linear;
    }
    &:focus{
      outline: none;
    }
    &:checked{
      border: none;
      outline: 2px solid $orange;
      &::before {
       opacity: 1;
      }
    }
    &:disabled + .custom-checkbox__content {
      color: #c0c0c0;
    }
  }
  .custom-checkbox__content {
    max-width: 300px;
    @include CirceRounded16();
    color: #686868;
  }
}

@media (max-width: 768px){
  .custom-checkbox {
    flex-direction: column;
    align-items: center !important;
    .custom-checkbox__content{
      text-align: center;
    }
  }
}
</style>

<template>
  <label class="custom-radio">
    <CFormCheck
      :id="id"
      :model-value="modelValue"
      :disabled="disabled"
      :name="name"
      class="me-3 custom-radio__input"
      type="radio"
      @update:modelValue="(v: boolean) => updateValue(v)"
    />
    <span class="custom-radio__content">
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
  name: string
  id: string,
  disabled?: boolean,
  disabledMsg?: string
}>(), { disabled: false, disabledMsg: '' });

const { modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue']);

const updateValue = (v: boolean) => {
  emit('update:modelValue', v);
};
</script>

<style lang="scss">
.custom-radio{
  align-items: center;
  margin-top: 16px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  .custom-radio__input{
    position: relative;
    -webkit-appearance: none;
    appearance: none;
    background-color: $orange;
    margin: 0;
    display: grid;
    place-content: center;
    border-radius: 50%;
    &::before{
      position: absolute;
      left: 3px;
      bottom: -7.5px;
      content: "";
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em $orange;
    }
    &::after {
      position: absolute;
      left: 0;
      bottom: -10px;
      content: "";
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 2px solid $darkGrey;
    }
    &:checked{
      &::before{
       transform: scale(1);
      }
      &::after{
        border-color: $orange;
      }
    }
    &:disabled + .custom-radio__content {
      color: #c0c0c0;
    }
  }
  .custom-radio__content {
    max-width: 300px;
    @include CirceRounded16();
    color: #686868;
  }
}

@media (max-width: 768px){
  .custom-radio {
    flex-direction: column;
    align-items: center !important;
    .custom-radio__content{
      text-align: center;
    }
  }
}
</style>

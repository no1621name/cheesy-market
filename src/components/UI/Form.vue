<template>
  <section class="form">
    <header v-if="header" class="form__header">
      <slot name="header" />
    </header>
    <CForm class="form__main" @submit.prevent="$emit('submit')">
      <CRow :xs="{gutterX: 0, gutterY: 3}" class="justify-content-between">
        <slot name="default" />
      </CRow>
    </CForm>
  </section>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ header?: boolean }>(), { header: true });
defineEmits(['submit']);
</script>

<style lang="scss">
.form{
  .form__header .row{
    justify-content: space-between;
    margin: 0;
    width: 100%;
    .form__header-col {
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      .form__title{
        margin: 0;
        color: $brown;
        font-size: 1.25rem;
        line-height: 1.5rem;
        font-weight: 700;
        letter-spacing: 0.01rem;
      }
      .form__aditional-info{
        color: $darkGrey;
      }
      &:has(.form__button_close){
        justify-content: flex-end;
      }
    }
  }
  .form__main {
    .form__form-group .form__input {
      padding-right: 12px;
      border-radius: 6px;
      border: 1px solid #e6e6e6;
      &.is-valid, &.is-invalid{
        box-shadow:none;
        background: none;
      }
      &::placeholder{
        color: #BFBFBF;
      }
    }
    .form__select {
      width: 100%;
      border: 1px solid $black;
      border-radius: 6px;
      &.disabled {
        border: 1px solid $darkGrey;
        color: $darkGrey;
      }
      .dropdown-menu{
        width: 100%;
      }
    }
    .form__button_link{
      &:hover{
        color: $orange;
      }
      padding: 0;
      color: $orange;
    }
    .col-12 > .form__button_link{
      display: block;
      margin: 0 auto;
    }
    .form__warning{
      margin: 0;
      color: $red;
      text-align: center;
    }
    .form__change-form{
      display: flex;
      align-items: center;
      justify-content: center;
      color: $brown;
      .form__button_link{
        margin-left: 5px;
      }
    }
  }
}

</style>

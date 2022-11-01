<template>
  <Modal :show="show" @close="$emit('close')">
    <CCol
      class="auth__container py-3 px-4 rounded"
      xl="3"
      lg="5"
      sm="6"
      xs="8"
    >
      <LoginForm
        v-if="authModalContent === 'login'"
        @changeForm="changeFormContent"
      />
      <RecoverForm
        v-else-if="authModalContent === 'recover'"
        @changeForm="changeFormContent"
      />
      <RegistForm
        v-else-if="authModalContent === 'regist'"
        @changeForm="changeFormContent"
      />
    </CCol>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from '@/components/UI/Modal.vue';
import LoginForm from '@/components/Auth/LoginForm.vue';
import RecoverForm from '@/components/Auth/RecoverForm.vue';
import RegistForm from '@/components/Auth/RegistForm.vue';

const props = withDefaults(defineProps<{
  show: boolean,
  formType?: ModalContent,
}>(), {
  show: false,
  formType: 'login',
});

const { show, formType } = toRefs(props);
const authModalContent = ref<ModalContent>(formType.value);

watch(show, (newShowValue) => {
  if (newShowValue && document) {
    document.body.addEventListener('keydown', onEsc);
  } else {
    document.body.removeEventListener('keydown', onEsc);
  }
});

const emit = defineEmits(['close']);

const onEsc = (e: KeyboardEvent) => {
  if (e.keyCode === 27) {
    changeFormContent('close');
  }
};

const changeFormContent = (name: ModalContent) => {
  if (name === 'close') {
    emit('close');
    authModalContent.value = 'login';
    return;
  }
  authModalContent.value = name;
};

</script>

<style lang="scss">
.auth__container{
  z-index: 99;
  cursor:auto;
  box-sizing: border-box;
  background: $white;
}

// .auth__header .row{
//     justify-content: space-between;
//     margin: 0;
//     width: 100%;
//     .auth__header-col {
//       padding: 0 !important;
//       display: flex !important;
//       align-items: center !important;
//       .auth__title{
//         margin: 0;
//         color: $brown;
//         font-size: 1.25rem;
//         line-height: 1.5rem;
//         font-weight: 700;
//         letter-spacing: 0.01rem;
//       }
//       .auth__aditional-info{
//         color: $darkGrey;
//       }
//       &:has(.auth__button_close){
//         justify-content: flex-end;
//       }
//     }
//   }
//   .auth__form {
//     .auth__form-group .auth__input {
//       padding-right: 12px;
//       border-radius: 6px;
//       border: 1px solid #e6e6e6;
//       &.is-valid, &.is-invalid{
//         box-shadow:none;
//         background: none;
//       }
//       &::placeholder{
//         color: #BFBFBF;
//       }
//     }
//     .auth__button_submit {
//       @include Button(1);
//       font-weight: 700;
//       letter-spacing: .8px;
//     }
//     .auth__button_link{
//       padding: 0;
//       color: $orange;
//     }
//     .col-12 > .auth__button_link{
//       display: block;
//       margin: 0 auto;
//     }
//     .auth__warning{
//       margin: 0;
//       color: $red;
//       text-align: center;
//     }
//     .auth__change-form{
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: $brown;
//       .auth__button_link{
//         margin-left: 5px;
//       }
//     }
//   }

@media (max-width: 768px) {
  .auth__overlay .auth__container .auth__form .auth__change-form{
    margin-top: 24px;
  }
}
</style>

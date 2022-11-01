<template>
  <Teleport to="body">
    <Transition name="modal">
      <CContainer
        v-if="show"
        fluid
        class="modal__overlay h-100
        d-flex justify-content-center align-items-center"
        tabindex="0"
        @click.self="emit('close')"
      >
        <KeepAlive>
          <slot v-if="show" />
        </KeepAlive>
      </CContainer>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
  show: boolean,
}>(), {
  show: false,
});

const { show } = toRefs(props);

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
    emit('close');
  }
};

</script>

<style lang="scss">
.modal__overlay{
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  cursor: pointer;
  z-index: 98;
  background-color: rgba($color: $black, $alpha: .8);
  @include CirceRounded16();
  & > div {
    padding: 16px 24px !important;
    border-radius: 6px;
    background-color: $white !important;
    cursor: auto;
  }
}

.modal__button_close,
.modal__button_submit,
.modal__button_link{
  &:focus {
    box-shadow: none !important;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity .5s ease, transform .5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

// @media (max-width: 768px) {
//   .modal__overlay .modal__container .modal__form .modal__change-form{
//     margin-top: 24px;
//   }
// }
</style>

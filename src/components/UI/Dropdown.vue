<template>
  <div v-click-outside="() => {isVisible = false}" class="custom-dropdown">
    <CButton class="custom-dropdown__toggler" @click.stop="isVisible = !isVisible">
      <slot name="toggler" />
    </CButton>
    <Transition name="main-transition">
      <div v-if="isVisible" class="custom-dropdown__content">
        <KeepAlive>
          <slot name="content" />
        </KeepAlive>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const isVisible = ref(false);
</script>

<style lang="scss" scoped>
.custom-dropdown{
  position: relative;
  .custom-dropdown__toggler{
    @include CirceRounded16();
  }
  .custom-dropdown__content{
    width: 240px;
    position: absolute;
    z-index: 3;
    background: $white;
    border-radius: 6px;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.175);
  }
}
</style>

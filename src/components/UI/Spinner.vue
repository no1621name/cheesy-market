<template>
  <CSpinner :class="classes" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  large?: boolean,
  medium?: boolean,
  small?: boolean
}>();

const { large, medium, small } = toRefs(props);

const classes = computed(() => ({
  'main-spinner': true,
  'large-spinner': large?.value,
  'medium-spinner': medium?.value,
  'small-spinner': small?.value,
}));

</script>

<style lang="scss" scoped>
.main-spinner {
  color: $orange !important;
  border-width: 8px;
  width: 200px;
  height: 200px;
  &.large-spinner{
    width: 250px;
    height: 250px;
  }
  &.medium-spinner{
    width: 150px;
    height: 150px;
  }
  &.small-spinner{
    width: 100px;
    height: 100px;
    border-width: 6px;
  }
}
</style>

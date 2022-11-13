<template>
  <div class="info py-5 rounded w-75 mx-auto align-items-center text-center">
    <slot name="default" />
  </div>
</template>

<style lang="scss">
.info {
  @include CirceRounded16();
  background: #FDF2D8;
  h3 {
    color: $brown;
    display: block;
    margin-right: auto;
    margin-left: auto;
    font-weight: bold;
  }
  p {
    color: $darkGrey !important;
  }
  a {
    color: $orange !important;
  }
}
</style>

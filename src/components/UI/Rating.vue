<template>
  <div :class="inline ? 'd-inline-block' : 'd-block'">
    <ClientOnly>
      <StarRating
        :rating="modelValue"
        :read-only="readonly"
        :show-rating="false"
        :increment="increment"
        :star-size="15"
        :inline="inline"
        :rounded-corners="true"
        :padding="1"
        :border-width="3"
        border-color="#FBCC42"
        active-color="#FBCC42"
        inactive-color="#FFF"
        class="flex-wrap"
        @update:rating="(rating: number) => $emit('update:modelValue', rating)"
      />
      <template #placeholder>
        <StarSvg
          v-for="i in 5"
          :key="i"
          style="margin-right: 4px;"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import StarSvg from '@/assets/images/icons/star.svg?component';

withDefaults(defineProps<{
  increment?: number,
  inline?: boolean,
  readonly?: boolean,
  modelValue?: number,
}>(), {
  increment: 0.01,
  rating: 3,
  inline: true,
  readonly: true,
  modelValue: 0,
});

</script>

<style lang="scss">
.vue-star-rating{
  flex-wrap: wrap;
  justify-content: center;
}
</style>

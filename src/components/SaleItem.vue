<template>
  <BgCard
    :href="`/sales/${sale._id}`"
    :src="`${useRuntimeConfig().public.cloudinaryUrl}/sales/${sale.preview}.png`"
  >
    {{ sale.name }}
  </BgCard>
</template>

<script lang="ts" setup>
import BgCard from '@/components/UI/BgCard.vue';

defineProps<{ sale: Sale }>();
</script>

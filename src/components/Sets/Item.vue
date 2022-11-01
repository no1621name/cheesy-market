<template>
  <Card
    class="set-item p-3"
    :url="setUrl"
    :src="`/products/${set.images[0] || 'placeholder'}.png`"
  >
    <template #beforeMain>
      <CRow :xs="{ gutter: 0 }" class="justify-content-between">
        <CCol xs="3" class="d-flex align-items-center">
          <span class="set-item__top-chart d-inline-flex align-items-center">
            <span class="set-item__mark me-1" />
            Топ продаж
          </span>
        </CCol>
        <CCol xs="1">
          <FollowButton :id="set._id" :short="true" />
        </CCol>
      </CRow>
    </template>
    <CCardTitle>
      <NuxtLink :to="setUrl" class="text-decoration-none">
        {{ set.name }}
      </NuxtLink>
    </CCardTitle>
    <CRow :xs="{ gutter: 0 }" class="justify-content-between">
      <CCol xs="4" class="d-flex align-items-center justify-content-start">
        <span class="set-item__price">
          {{ set.price }}₽
        </span>
      </CCol>
      <CCol xs="5">
        <CButton class="button_success w-100" @click="$emit('add', set._id)">
          Добаить
        </CButton>
      </CCol>
    </CRow>
  </Card>
</template>

<script lang="ts" setup>
import Card from '@/components/UI/Card.vue';
import FollowButton from '@/components/UI/FollowButton.vue';

defineEmits(['add']);

const props = defineProps<{
  set: ShortProduct,
}>();

const { set } = toRefs(props);
const setUrl = `/products/${set.value._id}`;
</script>

<style lang="scss">
.set-item .card-link{
  display: flex;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
.set-item{
  @include CirceRounded16();
  .set-item__top-chart {
    font-size: .875rem;
    color: $orange;
    .set-item__mark {
      width: 7px;
      height: 7px;
      background: $orange;
      border-radius: 50%;
    }
  }
  .set-item__price{
    line-height: 2.125rem;
    font-size: 1.25rem;
  }
}
</style>

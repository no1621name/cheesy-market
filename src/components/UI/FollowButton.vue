<template>
  <span>
    <ClientOnly>
      <CButton
        :class="{ highlighted: favourited }"
        class="button_follow d-flex
                align-items-center justify-content-end w-100 p-0"
        @click="toggleFavourite(id)"
      >
        <FollowHighlightedSvg v-if="favourited" />
        <FollowSvg v-else />
        <span v-if="!short">В избранное</span>
      </CButton>
      <template #placeholder>
        <CButton
          class="button_follow d-flex
          align-items-center justify-content-end w-100 p-0"
        >
          <FollowSvg />
          <span v-if="!short">В избранное</span>
        </CButton>
      </template>
    </ClientOnly>
  </span>
</template>

<script lang="ts" setup>
import FollowSvg from '@/assets/images/icons/follow.svg?component';
import FollowHighlightedSvg from '@/assets/images/icons/follow-highlighted.svg?component';

import { useFavouritesStore } from '@/store/favourites';

const props = withDefaults(defineProps<{
  id: number,
  short?: boolean,
  followed?: boolean
}>(), {
  short: false,
  followed: false,
});

const favouritesStore = useFavouritesStore();

const { id, followed } = toRefs(props);
const favourited = ref(followed.value);

const { toggleFavourite, isInFavourites } = favouritesStore;

favouritesStore.$subscribe(async (_, { favouriteList }) => {
  if (Array.isArray(favouriteList)) {
    favourited.value = isInFavourites(id.value);
  }
});
</script>

<style lang="scss" scoped>
.button_follow{
  color: $darkGrey;
  transition: color .2s linear;
  &:hover {
    color: $darkGrey;
  }
  > svg{
    margin-right: 6px;
  }
}
</style>

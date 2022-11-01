<template>
  <div class="pagination">
    <CButton
      class="pagination__button"
      :disabled="isFirst"
      @click="navigatePrev()"
    >
      <DropdownArrow2Svg style="transform: rotate(180deg);" />
    </CButton>
    <template v-if="isFirst">
      <span class="pagination__point active">
        {{ activePage }}
      </span>
      <span
        v-if="activePage + 1 <= totalPages"
        class="pagination__point"
        @click="navigateNext()"
      >
        {{ activePage + 1 }}
      </span>
      <span
        v-if="activePage + 2 <= totalPages"
        class="pagination__point"
        @click="navigateNext(2)"
      >
        {{ activePage + 2 }}
      </span>
      <CDropdown v-if="totalPages > activePage + 2">
        <CDropdownToggle class="pagination__point">
          ...
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem
            v-for="i in totalPages - 3"
            :key="i"
            @click="navigateNext(i+2)"
          >
            {{ i + 3 }}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </template>
    <template v-else-if="isLast">
      <CDropdown v-if="activePage - 2 > 1">
        <CDropdownToggle class="pagination__point">
          ...
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem
            v-for="i in totalPages - 3"
            :key="i"
            @click="navigatePrev(totalPages - i)"
          >
            {{ i }}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <span
        v-if="activePage - 2 > 0"
        class="pagination__point"
        @click="navigatePrev(2)"
      >
        {{ activePage - 2 }}
      </span>
      <span class="pagination__point" @click="navigatePrev()">
        {{ activePage - 1 }}
      </span>
      <span class="pagination__point active">
        {{ activePage }}
      </span>
    </template>
    <template v-else>
      <CDropdown v-if="totalPages > activePage - 1 && activePage - 2 !== 0">
        <CDropdownToggle class="pagination__point">
          ...
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem
            v-for="i in 0 + (activePage - 2)"
            :key="i"
            @click="navigatePrev(activePage-i)"
          >
            {{ i }}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <span class="pagination__point" @click="navigatePrev()">
        {{ activePage - 1 }}
      </span>
      <span class="pagination__point active">
        {{ activePage }}
      </span>
      <span class="pagination__point" @click="navigateNext()">
        {{ activePage + 1 }}
      </span>
      <CDropdown v-if="totalPages > activePage + 1">
        <CDropdownToggle class="pagination__point">
          ...
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem
            v-for="i in totalPages - activePage - 1"
            :key="i"
            @click="navigateNext(((i + activePage) * perPage) / (activePage * perPage))"
          >
            {{ i + activePage + 1 }}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </template>
    <CButton
      class="pagination__button"
      :disabled="isLast"
      @click="navigateNext()"
    >
      <DropdownArrow2Svg />
    </CButton>
  </div>
</template>

<script lang="ts" setup>
import DropdownArrow2Svg from '@/assets/images/icons/dropdown-arrow-2.svg?component';

const props = defineProps<{
  totalPages: number,
  perPage: number,
  activePage: number,
}>();

const emit = defineEmits(['change']);

const { activePage, totalPages, perPage } = toRefs(props);

const isFirst = computed(() => activePage.value === 1);
const isLast = computed(() => activePage.value === totalPages.value);

const navigatePrev = (n = 1) => emit('change', ((activePage.value - 1) * perPage.value) - (perPage.value * n));
const navigateNext = (n = 1) => emit('change', (activePage.value * perPage.value) * n);
</script>

<style lang="scss" scoped>
.pagination{
  display: flex;
  align-items: center;
  width: max-content;
  .pagination__point{
    @include Roboto16();
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 0;
    border: 1px solid $darkGrey !important;
    &.active{
      color: $white;
      background: $orange;
    }
    &:hover{
      color: $white;
      background: $orange;
    }
  }
  .dropdown-item{
    @include Roboto16();
  }
  .pagination__button{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 11px 12px;
    border: 1px solid $darkGrey !important;
    border-radius: 0;

  }
}
</style>

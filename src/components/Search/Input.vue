<template>
  <CForm
    v-click-outside="() => clearInput()"
    class="search"
    @submit.prevent="routeToResults"
  >
    <fieldset class="search__search-field">
      <CButton type="submit" class="search__search-button">
        <SearchLoupeSvg />
      </CButton>
      <CFormInput
        id="searchInput"
        v-model.trim="searchQuery"
        class="search__search-input"
        autocomplete="off"
        placeholder="Введите название товара или артикул"
        @focus="isVisibleSearchList = true"
      />
    </fieldset>
    <Transition name="main-transition">
      <CContainer
        v-if="isVisibleSearchList && searchQuery"
        fluid
        class="search__modal"
      >
        <CRow v-if="isInvalidResponse" class="search__error-message">
          <p>
            Ошибка сервера... Попробуйте позже
          </p>
        </CRow>

        <Spinner v-if="responsePending" small />
        <CRow
          v-else-if="searchProducts.length"
          class="search__list"
          :xs="{gutterX: 0}"
        >
          <CCol xs="12">
            <SearchItem
              v-for="product in searchProducts"
              :key="product._id"
              :product="product"
            />
          </CCol>
          <CCol xs="12">
            <NuxtLink
              class="search__show-all"
              :external="true"
              :to="`/results?search_q=${searchQuery}`"
            >
              Показать все результаты
            </NuxtLink>
          </CCol>
        </CRow>
        <CRow
          v-else-if="searchProducts.length === 0 && !isInvalidResponse"
          class="search__not-found"
        >
          <NotFound />
        </CRow>
      </CContainer>
    </Transition>
  </CForm>
</template>

<script lang="ts" setup>
import SearchLoupeSvg from '@/assets/images/icons/search-loupe.svg?component';

import Spinner from '@/components/UI/Spinner.vue';
import NotFound from '@/components/UI/NotFound.vue';
import SearchItem from './Item.vue';

const props = withDefaults(defineProps<{
  debounce?: number
}>(), {
  debounce: 500,
});

const { debounce } = toRefs(props);

const searchQuery = ref('');
const searchProducts = ref<ShortProduct[]>([]);
const isVisibleSearchList = ref(false);
const responsePending = ref(false);
const isInvalidResponse = ref(false);

const timeOut = ref();

watch(searchQuery, (newSearchQuery) => {
  responsePending.value = true;

  clearTimeout(timeOut.value);

  if (newSearchQuery === '' || !newSearchQuery.matchAll(/\\/g).next().done) {
    searchProducts.value = [];
    responsePending.value = false;
    return;
  }

  timeOut.value = setTimeout(async () => {
    await $fetchApi<ServerResponseI<'products', ShortProduct[]>>('/products', {
      query: {
        limit: 10,
        type: 'all',
        sort: '_id.asc',
        search_q: newSearchQuery,
      },
      async onResponse({ response }) {
        if (response.ok) {
          searchProducts.value = response._data.data.products;
          responsePending.value = false;
        }
      },
      async onResponseError() {
        isInvalidResponse.value = true;
        responsePending.value = false;
      },
    });
  }, debounce.value);
});

const routeToResults = async () => {
  if (!searchQuery.value) { return; }
  return await navigateTo(`/results/${searchQuery.value}`, {
    external: true,
  });
};

const clearInput = () => {
  isVisibleSearchList.value = false;
};
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  position: relative;
  .search__search-field{
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 6px;
    .search__search-button{
      display: flex;
      padding: 0;
      justify-content: center;
      align-items: center;
      width: min-content;
      background: transparent;
      border: none;
      border-radius: 0;
      &:focus{
        box-shadow: none;
      }
    }
    .search__search-input{
      caret-color: $orange;
      padding: 0 0 0 8px;
      border: none;
      border-radius: 0;
      @include Roboto14();
      &::placeholder{
        color: $darkGrey;
      }
      &:focus{
        box-shadow: none;
      }
    }
    &:focus-within{
      outline: 1px solid rgba($color: $darkGrey, $alpha: .6);
    }
  }
  .search__modal{
    z-index: 3;
    overflow-y: auto;
    background: $white;
    position: absolute;
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: center;
    outline: 1px solid rgba($color: $darkGrey, $alpha: .6);
    border-radius: 6px;
    .main-spinner{
      margin: 20px 0;
    }
    .search__error-message,
    .search__not-found{
      display: flex;
      align-items: center;
      justify-content: center;
      & p{
        margin-top: 16px;
        @include Roboto16();
      }
    }
    .search__error-message p{
      color: $red;
    }
    .search__list{
      padding: 10px 20px;
      padding: 0;
      max-height: 340px;
      .search__item-wrapper:not(:first-child){
        margin-top: 20px;
      }
      .search__show-all{
        display: block;
        color: $orange;
        padding: 10px 0;
        text-align: center;
        @include CirceRounded16();
      }
    }

  }
}
</style>

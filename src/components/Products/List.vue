<template>
  <List :title="title" :not-found="error">
    <template #header>
      <CButton
        v-if="filtersToggler"
        :class="{
          products__toggler: true,
          active: isVisibleFilters
        }"
        @click="toggleVisibleFilters"
      >
        <FiltersSvg v-if="!isVisibleFilters" />
        <FiltersActiveSvg v-else />
        Фильтры
      </CButton>
    </template>
    <template #beforeMain>
      <Transition name="main-transition">
        <KeepAlive>
          <CCol v-if="isVisibleFilters" xs="12">
            <ProductsFilters
              :options="options"
              :filter-options="filtersOptions"
              :allow-subcategories="allowSubcategories"
              :allow-brands="allowBrands"
              @change="changeOptions"
              @delete="deleteFilter"
              @clear="filtersOptions = {}"
            />
          </CCol>
        </KeepAlive>
      </Transition>
    </template>
    <template #main>
      <template v-if="productsList.length">
        <CCol
          v-for="product in productsList"
          :key="product._id"
          xl="3"
          lg="4"
        >
          <ProductItem
            :product="product"
            :slider="slider"
            @add="(id: number) => {
              addProduct(id);
            }"
            @error="addServerError"
          />
        </CCol>
      </template>
      <template v-else>
        <NotFound />
      </template>
    </template>
    <template #afterMain>
      <CCol
        v-if="pagination"
        class="d-flex justify-content-center"
        xs="12"
      >
        <Pagination
          :active-page="activePage"
          :total-pages="totalPages"
          :per-page="pagination.limit"
          @change="getProducts"
        />
      </CCol>
    </template>
  </List>
</template>

<script lang="ts" setup>
import FiltersSvg from '@/assets/images/icons/filters.svg?component';
import FiltersActiveSvg from '@/assets/images/icons/filters-active.svg?component';

import ProductItem from './Item.vue';
import ProductsFilters from './Filters.vue';
import Pagination from '@/components/Pagination.vue';
import List from '@/components/UI/List.vue';
import NotFound from '@/components/UI/NotFound.vue';

import { useCartStore } from '@/store/cart';
import { useNotifierStore } from '@/store/notifier';

const { addProduct } = useCartStore();
const { addServerError } = useNotifierStore();

const defaultOptions: ProductsListOptions = {
  limit: 8,
  priceFrom: 0,
  priceTo: 9999,
  type: 'goods',
  category: [1, 2],
  brand: [0],
  isInStock: 0,
  discount: 0,
  sort: '_id.asc',
  search_q: '',
  ids: [],
  short: 0,
};

const props = withDefaults(defineProps<{
  title: string,
  options: Partial<ProductsListOptions>,
  slider?: boolean,
  filtersToggler?: boolean,
  pagination?: boolean,
  allowSubcategories?: boolean,
  allowBrands?: boolean
}>(), {
  slider: false,
  filtersToggler: false,
  pagination: true,
  allowSubcategories: true,
  allowBrands: true
});

const { options: providedOptions } = toRefs(props);

const options = ref<ProductsListOptions>({ ...defaultOptions, ...providedOptions.value });
const filtersOptions = ref<Partial<ProductsListOptions>>({});

const productsList = ref<ShortProduct[]>([]);
const error = ref(false);
const { bool: isVisibleFilters, toggleBool: toggleVisibleFilters } = useGetToggledBoolean();
const { pagination, activePage, totalPages } = usePagination();

const pricesUrl = `/products/prices?type=${providedOptions.value?.type || defaultOptions.type}`;
const pricesResponse = await useApiAsyncData<ServerResponseI<'min'|'max', number>>(
  'prices', pricesUrl
);

const { min, max } = useValidateResponse(pricesResponse)?.data ||
  (await $fetchApi<ServerResponseI<'min'|'max', number>>(pricesUrl))?.data ||
  {
    min: defaultOptions.priceFrom,
    max: defaultOptions.priceTo
  };
options.value.priceFrom = min || defaultOptions.priceFrom;
options.value.priceTo = max || defaultOptions.priceTo;

const getProducts = async (offset = 0) => {
  await $fetchApi<ServerResponseI<'products', ShortProduct[]>>('/products', {
    params: {
      ...options.value,
      ...filtersOptions.value,
      offset
    },
    async onResponse({ response }) {
      if (response.ok) {
        const { products, pagination: resPagination } = response._data.data;
        productsList.value = products;
        pagination.value = resPagination;
      }
    },
    async onResponseError() {
      error.value = true;
    }
  });
};

await getProducts();

watch(filtersOptions, async () => {
  await getProducts();
}, { deep: true });

watch(options, async () => {
  await getProducts();
});

const changeOptions = (key: keyof ProductsListOptions, value: ProductsListOptions[keyof ProductsListOptions]) => {
  if (key === 'category' && typeof value === 'object') {
    if (!value.length) {
      delete filtersOptions.value[key];
      return;
    }
    filtersOptions.value[key] = value;
  }
  filtersOptions.value[key] = value as never;
};

const deleteFilter = (key: keyof ProductsListOptions, id?: number) => {
  if ((key === 'category' || key === 'brand') && id) {
    const index = filtersOptions.value[key]?.findIndex(val => val === id);
    filtersOptions.value[key]!.splice((index || -1), 1);
    if (filtersOptions.value[key]?.length) { return; }
  } else if (key === 'priceFrom') {
    delete filtersOptions.value[key];
    delete filtersOptions.value.priceTo;
  }
  delete filtersOptions.value[key];
};

</script>

<style lang="scss" scoped>
.products__toggler{
    border: 1px solid $black !important;
    border-radius: 5px;
    padding: 8px 12px 10px 12px;
    transition: all .2s linear;
    svg{
      margin-right: 10px;
    }
    &.active{
      color: $white;
      background: $brown;
    }
  }
</style>

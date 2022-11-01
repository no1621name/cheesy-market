<template>
  <section class="products-filters rounded">
    <CRow :xs="{gutterX: 0}" class="products-filters__filters-inputs">
      <CCol xs="2">
        <CDropdown>
          <CDropdownToggle>
            <template v-if="isSortTypeSelected">
              {{ selectedSort }}
            </template>
            <template v-else>
              Сортировка
            </template>
            <DropdownArrow1Svg />
          </CDropdownToggle>
          <CDropdownMenu>
            <template v-for="(sortType, index) in sortTypes">
              <template v-if="filterOptions.sort === `${sortType.type}.${sortType.altMethod}` || !isSortTypeSelected">
                <CDropdownItem
                  :key="index"
                  @click="() => {
                    emit('change', 'sort', `${sortType.type}.${sortType.method}`);
                    selectedSort = sortType.name;
                  }"
                >
                  {{ sortType.name }}
                </CDropdownItem>
              </template>
            </template>
          </CDropdownMenu>
        </CDropdown>
      </CCol>
      <template v-for="(filterList, key) in filterLists">
        <template v-if="key === 'subCategories' ? allowSubcategories : allowBrands ">
          <CCol
            :key="key"
            xs="2"
          >
            <Dropdown>
              <template #toggler>
                <span
                  @click.once="async () => {
                    filterList.value = await getFilterList(key);
                  }"
                >
                  {{ filterList.name }}
                  <DropdownArrow1Svg />
                </span>
              </template>
              <template #content>
                <template v-if="filterList.value.length">
                  <h6 class="products-filters__dropdown-title">
                    Выберите фильтр
                  </h6>
                  <Checkbox
                    v-for="(valueListItem) in filterList.value"
                    :key="String(valueListItem.active)"
                    v-model="valueListItem.active"
                  >
                    {{ valueListItem.name }}
                  </Checkbox>
                  <CButton class="products-filters__dropdown-submit" @click="changeFilterList(key, filterList.keyFor)">
                    Применить
                  </CButton>
                </template>
                <template v-else>
                  Загрузка...
                </template>
              </template>
            </Dropdown>
          </CCol>
        </template>
      </template>

      <CCol xs="2">
        <Dropdown>
          <template #toggler>
            Цены
            <DropdownArrow1Svg />
          </template>
          <template #content>
            <div class="products-filters__price-content">
              <label class="products-filters__price-label">
                <input
                  v-model="prices[0]"
                  class="products-filters__price-input"
                  type="number"
                  :min="options.priceFrom"
                >
                <span class="products-filters__price-input_currency">руб.</span>
              </label>

              <label class="products-filters__price-label">
                <input
                  v-model="prices[1]"
                  class="products-filters__price-input"
                  type="number"
                  :max="options.priceTo"
                >
                <span class="products-filters__price-input_currency">руб.</span>
              </label>

              <Slider
                v-model="prices"
                class="range-slider"
                :min="options.priceFrom"
                :max="options.priceTo"
                :tooltips="false"
              />
              <Checkbox v-model="isWithDiscount">
                Товары со скидкой
              </Checkbox>
              <CButton class="products-filters__dropdown-submit" @click="changePrice">
                Применить
              </CButton>
            </div>
          </template>
        </Dropdown>
      </CCol>
      <CCol class="d-flex align-items-center justify-content-end" xs="4">
        <Checkbox v-model="isInStockValue" class="align-items-center">
          Показывать только товар в наличии
        </Checkbox>
      </CCol>
    </CRow>
    <div class="products-filters__tags">
      <template v-for="(filter, index) in filters">
        <template v-if="filter.keyFor === 'category' || filter.keyFor === 'brand'">
          <span :key="index" class="products-filters__tag">
            {{ filter.name }}
            <CCloseButton
              @click="deleteFilterListItem(filter, index)"
            />
          </span>
        </template>
        <template v-else>
          <span :key="index" class="products-filters__tag">
            {{ filter.name }}
            <CCloseButton
              @click="deleteFilter(filter.keyFor, index)"
            />
          </span>
        </template>
      </template>
      <CButton
        v-if="filters.length"
        class="products-filters__tag"
        @click="clearFilters"
      >
        Очистить фильтры
      </CButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import DropdownArrow1Svg from '@/assets/images/icons/dropdown-arrow-1.svg?component';

// eslint-disable-next-line import/default
import Slider from '@vueform/slider';
import Checkbox from '@/components/UI/Checkbox.vue';
import Dropdown from '@/components/UI/Dropdown.vue';

const emit = defineEmits(['change', 'delete', 'clear']);

const props = defineProps<{
  options: ProductsListOptions,
  filterOptions: Partial<ProductsListOptions>,
  allowSubcategories: boolean,
  allowBrands: boolean
}>();

const { options, filterOptions } = toRefs(props);

const filters = ref<Filter[]>([]);
const prices = ref([options.value.priceFrom, options.value.priceTo]);
const filterLists = ref<FilterLists>({
  subCategories: {
    value: [],
    name: 'Тип продукта',
    keyFor: 'category',
  },
  brands: {
    value: [],
    name: 'Производитель',
    keyFor: 'brand',
  }
});
const sortTypes = ref<SortType[]>([
  {
    name: 'От дешёвых к дорогим',
    type: 'price',
    method: 'asc',
    altMethod: 'desc',
  },
  {
    name: 'От дорогих к дешёвым',
    type: 'price',
    method: 'desc',
    altMethod: 'asc',
  }
]);

const selectedSort = ref('');
const isWithDiscount = ref(false);
const isInStockValue = ref(false);

const isSortTypeSelected = computed(() => filterOptions.value.sort?.startsWith('price'));

watch(isInStockValue, () => {
  emit('change', 'isInStock', isInStockValue.value ? 1 : 0);
}, { deep: true });

async function getFilterList <T>(key: keyof FilterLists): Promise<WithToggler<T>[]> {
  const urlName = key.toLowerCase();
  const response = await useApiAsyncData<ServerResponseI<typeof key, T[]>>(
    `${urlName}forCategory${options.value.category.join('_')}`, `/products/${urlName}`,
    {
      query: {
        parents_ids: urlName === 'subcategories' ? options.value.category : []
      }
    }
  );
  const responseData = useValidateResponse(response)?.data;
  const responseList: T[] = responseData?.[key] || [];

  return responseList.map<WithToggler<T>>((obj: any) => {
    obj.active = false;
    return obj;
  });
}

const addFilter = (keyFor: Filter['keyFor'], name: string) => {
  const index = filters.value.findIndex((filter: Filter) => filter.keyFor === keyFor);
  if (index > -1 && keyFor !== 'category' && keyFor !== 'brand') {
    return;
  }
  if (keyFor === 'priceFrom') {
    filters.value.splice(index, 1);
  }

  filters.value.push({ name, keyFor });
};

const clearFilters = () => {
  filters.value = [];
  Object.values(filterLists.value).forEach((filterList) => {
    filterList.value.map((item) => {
      item.active = false;
      return item;
    });
  });
  emit('clear');
};

const removeFiltersByKeyFor = (keyFor: Filter['keyFor']) => {
  filters.value = filters.value.filter((filter: Filter) => filter.keyFor !== keyFor);
};

const changeFilterList = (key: keyof FilterLists, keyFor: keyof ProductsListOptions) => {
  removeFiltersByKeyFor(keyFor);

  const selectedItems = filterLists.value[key].value
    .filter((item: { active: boolean }) => item.active)
    .map((item: { _id: number, name: string }) => {
      addFilter(keyFor, item.name);
      return item._id;
    });

  if (selectedItems.length === 0) {
    removeFiltersByKeyFor(keyFor);
  }

  emit('change', keyFor, selectedItems);
};

const changePrice = () => {
  const priceFrom = prices.value[0];
  const priceTo = prices.value[1];

  if ((priceFrom && priceFrom <= (options.value.priceFrom || 0)) &&
    (priceTo && priceTo >= (options.value.priceTo || 9999))) {
    return;
  }

  if (isWithDiscount.value) {
    addFilter('discount', 'Товары со скидкой');
    emit('change', 'discount', 1);
  } else {
    emit('delete', 'discount');
  }

  addFilter('priceFrom', `От ${priceFrom} руб. до ${priceTo} руб.`);

  emit('change', 'priceFrom', priceFrom);
  emit('change', 'priceTo', priceTo);
};

const deleteFilterListItem = ({ name, keyFor }: Filter, index: number) => {
  filters.value.splice(index, 1);

  const key = keyFor === 'category' ? 'subCategories' : 'brands';
  const item = filterLists.value[key].value.find((item: { name: string }) => item.name === name);
  item!.active = false;

  emit('delete', keyFor, item!._id);
};

const deleteFilter = (keyFor: Filter['keyFor'], index: number) => {
  filters.value.splice(index, 1);
  emit('delete', keyFor);
};
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss" scoped>
.products-filters {
  .row > div{
    display: flex;
    align-items: center;
    @include CirceRounded16();
  }
  .products-filters__filters-inputs{
    padding: 16px;
    background: rgba($color: $orange, $alpha: .1);
    border: 1px solid rgba($color: $orange, $alpha: .2);
    .custom-dropdown .custom-dropdown__content{
      .products-filters__dropdown-title{
        @include Roboto16Bold();
        margin-bottom: 15px;
      }
      .products-filters__dropdown-submit{
        margin-top: 15px;
        text-align: center;
        @include CirceRounded16();
        color: $brown;
        width: 100%;
        border-radius: 6px;
        border: 1px solid $brown !important;
      }
    }
    .products-filters__price-content{
      & > * {
        margin-bottom: 15px;
      }
      .products-filters__price-label{
        padding: 0 10px;
        border: 1px solid #CCCCCC;
        border-radius: 5px;
        width: 95px;
        height: 35px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        &:first-of-type{
          margin-right: 8px;
        }
        .products-filters__price-input_currency{
          @include CirceRounded16();
          font-size: .875rem;
          color: $darkGrey;
        }
        .products-filters__price-input{
          border: none;
          max-width: 55px;
          &:focus{
            outline: none;
          }
        }
      }
      .range-slider {
        --slider-connect-bg: #FD9339;
        --slider-handle-ring-color: #FD9339;
      }
      .custom-checkbox{
        align-items: center;
      }
      .products-filters__dropdown-submit{
        margin-bottom: 0;
      }
    }
    .custom-checkbox{
      margin: 0 !important;
    }
  }
  .products-filters__tags{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .products-filters__tag{
      @include CirceRounded16();
      font-size: .875rem;
      color: $brown;
      display: block;
      background: rgba($color: $orange, $alpha: .1);
      border: 1px solid rgba($color: $orange, $alpha: .2) !important;
      padding: 10px;
      border-radius: 6px;
      margin-top: 10px;
      &:not(:last-child){
        margin-right: 20px;
      }
    }
  }
}

</style>

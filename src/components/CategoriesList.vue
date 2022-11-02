<template>
  <section
    class="categories-lists d-flex align-items-center
    flex-column"
  >
    <CRow :xs="{gutterY: 3, gutterX: 0}">
      <CCol
        v-for="bigCategory in allCategories.bigCategories"
        :key="bigCategory._id"
        :xs="12"
        class="categories-lists__big-category"
      >
        <header
          class="categories-lists__header d-flex
            align-items-center rounded-top ps-3"
        >
          <CheeseSvg v-if="bigCategory._id === 1" />
          <EnquipmentSvg v-else />
          <h4 class="categories-lists__title">
            {{ bigCategory.name }}
          </h4>
        </header>
        <CRow class="categories-lists__list" :xs="{gutter: 0}">
          <CCol
            v-for="category in fiterCategories(bigCategory.children_ids)"
            :key="category._id"
            xs="12"
            class="categories-lists__category"
          >
            <CDropdown
              v-if="category.children_ids.length"
              v-click-outside="() => subCategories = []"
              direction="dropend"
              variant="btn-group"
              class="categories-lists__category-dropdown w-100"
            >
              <NuxtLink
                :to="`/products/categories/${category._id}`"
                class="dropdown-toggle dropdown-toggle-link w-100
                  d-flex justify-content-start text-decoration-none"
              >
                {{ category.name }}
              </NuxtLink>
              <CDropdownToggle
                class="d-flex align-items-center
                  justify-content-end rounded-0"
                @click="() => getSubCategories(category)"
              >
                <DropdownArrow2Svg />
              </CDropdownToggle>
              <CDropdownMenu class="p-0">
                <CDropdownItem v-if="!subCategories.length">
                  Загрузка...
                </CDropdownItem>
                <CDropdownItem
                  v-for="subCategory in subCategories"
                  v-else
                  :key="subCategory._id"
                  href="#"
                  class="py-2 px-3 rounded-1"
                >
                  <ClientOnly>
                    <NuxtLink
                      :to="`/products/categories/${subCategory._id}`"
                      class="categories-lists__category-link"
                    >
                      {{ subCategory.name }}
                    </NuxtLink>
                  </ClientOnly>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <NuxtLink
              v-else
              :to="`/products/categories/${category._id}`"
              class="categories-lists__category-link"
            >
              {{ category.name }}
            </NuxtLink>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </section>
</template>

<script lang="ts" setup>
import DropdownArrow2Svg from '@/assets/images/icons/dropdown-arrow-2.svg?component';
import CheeseSvg from '@/assets/images/icons/cheese.svg?component';
import EnquipmentSvg from '@/assets/images/icons/enquipment.svg?component';

const allCategories = ref<AllCategories>({
  bigCategories: [],
  categories: [],
});
const subCategories = ref<Category[]>([]);

const mainCategoriesResponse = await useApiAsyncData<{statusCode: StatusCodes, data: AllCategories}>(
  'allCategories', '/products/categories',
);

allCategories.value = await useValidateResponse(mainCategoriesResponse)?.data ||
  (await $fetchApi<{statusCode: StatusCodes, data: AllCategories}>('/products/categories')).data ||
  {
    bigCategories: [],
    categories: [],
  };

const fiterCategories = (bigCategoryChildrenIds: number[]) => {
  return allCategories.value.categories.filter((c: Category) =>
    bigCategoryChildrenIds.includes(c._id)
  );
};

const getSubCategories = async (category: Category) => {
  await $fetchApi<ServerResponseI<'categories', Category[]>>('/products/categories', {
    query: {
      ids: category.children_ids
    },
    async onResponse({ response }) {
      subCategories.value = response._data.data.categories;
    }
  });
};
</script>

<style lang="scss" scoped>
.categories-lists{
  max-width: 280px;
  .categories-lists__big-category{
    .categories-lists__header{
      background: #FBE8BB;
      height: 50px;
      svg{
        width: 20px;
        height: 20px;
      }
      .categories-lists__title{
        @include CirceRounded16();
        color: $brown;
        margin: 0;
        margin-left: 10px;
      }
    }
    .categories-lists__list{
      width: 100%;
      background: $white;
      .categories-lists__category{
        border: 1px solid $lightGrey;
        > .categories-lists__category-link, .dropdown-toggle{
          &:hover{
            background: #FFF1DB;
            color: $orange !important;
          }
        }
        .dropdown-toggle, > .categories-lists__category-link {
          padding: 10px 15px;
        }
        .categories-lists__category-dropdown{
          .dropdown-toggle{
            @include Roboto16();
            &.dropdown-toggle-link{
              border-right: 1px solid $lightGrey;
              color: $black;
            }
          }
          .dropdown-menu .dropdown-item {
            padding: 8px 16px;
            &:hover {
              background: #FFF1DB;
              .categories-lists__category-link {
                color: $orange;
              }
            }
            &:active .categories-lists__category-link {
              color: $white !important;
            }
            .categories-lists__category-link {
              border-radius: 6px;
            }
          }
        }
        .categories-lists__category-link{
          display: block;
          width: 100%;
          @include Roboto16();
          text-decoration: none;
          color: $black;
        }
      }
    }
    &:first-child{
      margin-top: 0px;
    }
  }
}
@media (max-width: 1199px) {
  .categories-lists .categories-lists__big-category .categories-lists__list .categories-lists__category{
    .categories-lists__category-link, .categories-lists__category-dropdown .dropdown-toggle{
      font-size: .8rem;
    }
  }
}
</style>

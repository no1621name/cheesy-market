/// <reference types="vite-svg-loader" />
/// <reference types="cheesy-api-types-package" />

declare global {
  type AuthContent = 'login' | 'regist' | 'recover' | 'close';

  interface CustomNotification {
    title: string,
    body: string
    variant?: 'danger' | 'success' | 'warning',
    autohide: boolean,
  }

  interface AllCategories {
    bigCategories: Category[],
    categories: Category[],
  }

  type UserStore = ReturnType<typeof useUserStore>;

  interface ProductsListOptions {
    limit: number,
    priceFrom: number,
    priceTo: number,
    type: 'all' | 'goods' | 'set',
    sort: `${'_id' | 'price' | 'views'}.${'asc' | 'desc'}`,
    discount: 0 | 1,
    isInStock: 0 | 1,
    category: number[],
    brand: number[],
    search_q: string;
    ids: number[],
    short: 0 | 1,
  }

  interface Filter {
    name: string,
    keyFor: keyof ProductsListOptions,
  }

  interface SortType {
    name: string,
    type: string,
    method: 'asc' | 'desc',
    altMethod: 'asc' | 'desc',
  }

  type WithToggler<T> = T & { active: boolean };

  type FilterList<T> = {
    name: string,
    value: WithToggler<T>[],
    keyFor: keyof ProductsListOptions,
  }

  interface FilterLists {
    subCategories: FilterList<{ _id: number, name: string, parents_ids?: number[], logo?: string }>,
    brands: FilterList<{ _id: number, name: string, parents_ids?: number[], logo?: string }>
  }

  interface BreadCrumb {
    name: string,
    href: string
  }

  interface BrandsList {
    [key: string]: Brand[]
  }
}

declare module 'vue-star-rating';

export { };

import { defineStore } from 'pinia';

export const useBreadCrumbsStore = defineStore('breadCrumbs', () => {
  const breadCrumbsList = ref<BreadCrumb[]>([
    {
      name: 'Главная',
      href: '/'
    }
  ]);

  const addBreadCrumb = (breadCrumb: BreadCrumb) => {
    if (!breadCrumbsList.value.some(val => val.name === breadCrumb.name)) {
      breadCrumbsList.value.push(breadCrumb);
    }
  };

  const addCategory = async (id: number) => {
    const categoryResponse = await useApiAsyncData<ServerResponseI<'category', Category>>(`productCategory${id}`, `/products/categories/${id}`);

    addBreadCrumb({
      name: useValidateResponse(categoryResponse)?.data.category.name || 'Категория',
      href: `/products/categories/${id}`
    });
  };

  const clearBreadCrumbs = () => {
    breadCrumbsList.value = breadCrumbsList.value.slice(0, 1);
  };

  return {
    breadCrumbsList,
    addBreadCrumb,
    addCategory,
    clearBreadCrumbs
  };
});

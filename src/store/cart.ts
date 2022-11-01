import { defineStore } from 'pinia';
import getFromUser from '@/store/getFromUser.service';
import useCalculateCostOfCart from '@/composables/useCalculateCostOfCart';
import { useNotifierStore } from '@/store/notifier';

export const useCartStore = defineStore('cart', () => {
  const cartList = getFromUser<WithAmount<ShortProduct>>('cart');
  const { addCartNotification } = useNotifierStore();

  const cost = computed(() => {
    if (!cartList.value) { return 0; }

    return useCalculateCostOfCart(cartList.value);
  });

  const amount = computed(() => {
    if (!cartList.value) { return 0; }

    return cartList.value.reduce((prev: number, curr: WithAmount<ShortProduct>) => {
      return prev + curr.amount;
    }, 0);
  });

  const getProductById = (id: number): WithAmount<ShortProduct> | undefined => cartList.value.find((product: ShortProduct) => product._id === id);

  const addProduct = async (id: number, amount?: number) => {
    const product = getProductById(id);

    if (product) {
      let currentAmount = product.amount;
      if (currentAmount++ <= product.quantityInStock) {
        product.amount++;
      }
      addCartNotification(product.name);
      return;
    }

    await $fetchApi<ServerResponseI<'product', ShortProduct>>(`/products/${id}?short=1`, {
      async onResponse({ response }) {
        if (response.ok) {
          cartList.value.push(Object.assign<ShortProduct, { amount: number }>(
            response._data.data.product,
            { amount: amount && amount > 0 ? amount : 1 }
          ));
          addCartNotification(response._data.data.product.name);
        }
      }
    });
  };

  const removeProduct = (id: number) => {
    cartList.value.splice(cartList.value.findIndex((product: ShortProduct) => product._id === id), 1);
  };

  const changeProductCount = async (id: number, changeValue: 1 | -1) => {
    const product = getProductById(id);

    if (!product && changeValue === 1) {
      await addProduct(id);
      return;
    }

    if (!(product && product.amount)) {
      return;
    }

    product.amount += changeValue;

    if (product.amount === 0) {
      removeProduct(id);
    }
  };

  return {
    cartList,
    cost,
    amount,
    addProduct,
    removeProduct,
    changeProductCount
  };
});

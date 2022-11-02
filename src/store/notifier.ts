import { defineStore } from 'pinia';
import { Ref } from 'vue';

export const useNotifierStore =  defineStore('notifier', () => {
  const stack: Ref<CustomNotification[]> = ref([]);

  const addNotification = (notificationInfo: CustomNotification) => {
    stack.value.push(notificationInfo);
  };

  const addServerError = () => {
    // eslint-disable-next-line no-console
    console.log('err');
    addNotification({ title: 'Ошибка!', body: 'Извините, на сервере произошла ошибка. Попробуйте позже.', variant: 'danger', autohide: false });
  };

  const clearNotifications = () => {
    stack.value = [];
  };

  const addCartNotification = (name: string) => {
    addNotification({
      title: 'Готово!',
      body: `Товар "${name}" добавлен в корзину покупок!`,
      autohide: true,
      variant: 'success'
    });
  };

  return {
    stack,
    addNotification,
    addServerError,
    addCartNotification,
    clearNotifications
  };
});

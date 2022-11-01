import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { useNotifierStore } from '@/store/notifier';

export const useUserStore = defineStore('user', () => {
  const notifierStore = useNotifierStore();
  const isAuth = ref(useCookie('checkToken'));
  const userInfo = <Ref<User>>ref();

  onMounted(async () => {
    const userLocal = JSON.parse(localStorage.getItem('user') || '{}');

    if (!isAuth.value) {
      userInfo.value = (Object.keys(userLocal).length && userLocal._id === 0)
        ? userLocal
        : {
            _id: 0,
            fullname: '',
            email: '',
            phoneNumber: '',
            password: '',
            cart: [],
            favourites: [],
            viewed: [],
            coupons: [],
            role: 'user',
            address: {
              city: 'Москва',
              city_id: 1,
              postcode: 0,
              subject_id: 1,
              subject: 'Московская область',
              apartment: ''
            },
          };

      return;
    }

    if (Object.keys(userLocal).length) {
      // with token and local
      userInfo.value = userLocal;
      return;
    }

    // with token and without local
    await updateUserInfo();
  });

  watch(userInfo, (newUserInfo) => {
    if (!newUserInfo || !Object.keys(newUserInfo).length) { return; }

    localStorage.setItem('user', JSON.stringify(newUserInfo));
  }, { deep: true });

  const updateUserInfo = async () => {
    await $fetchApi('/users', {
      method: 'get',
      async onResponse({ response }) {
        userInfo.value = response._data.data.user;
        isAuth.value = useCookie('checkToken').value;
      },
      async onResponseError() {
        notifierStore.addServerError();
      },
    });
  };

  const saveUserData = async (withNotification?: boolean) => {
    if (isAuth.value) {
      await $fetchApi('/users', {
        method: 'PATCH',
        body: {
          newUserData: userInfo.value,
        },
        async onResponse({ response }) {
          if (response.ok && withNotification) {
            notifierStore.addNotification({
              title: 'Успех!',
              body: 'Данные о пользователе успешно обновлены',
              autohide: true,
              variant: 'success'
            });
          }
        },
        async onResponseError() {
          notifierStore.addServerError();
        },
      });
    }
  };

  return {
    userInfo,
    isAuth,
    updateUserInfo,
    saveUserData
  };
});

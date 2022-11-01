import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { Ref } from 'vue';

export default <T = number>(name: keyof Pick<User, 'favourites' | 'viewed' | 'cart'>) => {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const list = ref<T[]>() as Ref<T[]>;

  onMounted(() => {
    if (userInfo.value) {
      list.value = userInfo.value[name] as T[];
    }
  });

  watch(list, (newList) => {
    if (newList.length) {
      userInfo.value[name] = newList as any[];
    }
  }, { deep: true });

  watch(userInfo, (newUserInfo) => {
    if (!Object.keys(newUserInfo).length) { return; }

    if (newUserInfo[name].length !== list.value?.length) {
      list.value = newUserInfo[name] as T[];
    }
  }, { deep: true });

  return list;
};

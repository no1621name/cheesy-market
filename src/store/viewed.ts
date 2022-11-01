import { defineStore } from 'pinia';
import getFromUser from '@/store/getFromUser.service';

export const useViewedStore = defineStore('viewed', () => {
  const viewedList = getFromUser('viewed');

  const viewProduct = (id: number): void => {
    const productIndex = viewedList.value.findIndex((procuctId: number) =>  id === procuctId);

    if (productIndex > -1) {
      const prooductId = viewedList.value.splice(productIndex, 1);
      viewedList.value.unshift(prooductId[0]);
    } else {
      viewedList.value.push(id);
    }
  };

  return {
    viewedList,
    viewProduct,
  };
});

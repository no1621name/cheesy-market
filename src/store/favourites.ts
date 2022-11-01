import { defineStore } from 'pinia';
import getFromUser from '@/store/getFromUser.service';

export const useFavouritesStore = defineStore('favourites', () => {
  const favouriteList = getFromUser('favourites');

  const toggleFavourite = (id: number) => {
    const productIndex = favouriteList.value.findIndex((procuctId: number) => id === procuctId);

    if (productIndex >  -1) {
      favouriteList.value.splice(productIndex, 1);
    } else {
      favouriteList.value.push(id);
    }
  };

  const isInFavourites = (id: number) => {
    return favouriteList.value.includes(id);
  };

  return {
    favouriteList,
    isInFavourites,
    toggleFavourite,
  };
});

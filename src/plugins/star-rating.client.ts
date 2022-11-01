// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import StarRating from 'vue-star-rating';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('StarRating', StarRating);
});

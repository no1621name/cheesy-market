import { useBreadCrumbsStore } from '@/store/breadCrumbs';

export default defineNuxtRouteMiddleware(() => {
  useBreadCrumbsStore().clearBreadCrumbs();
});

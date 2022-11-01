export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount: function (el, binding) {
      const ourClickEventHandler = (event: any) => {
        if (!el.contains(event.target) && el !== event.target && !event.composedPath().includes(el)) {
          binding.value(event);
        }
      };
      el.__vueClickEventHandler__ = ourClickEventHandler;

      document.addEventListener('click', ourClickEventHandler);
    },
    unmounted: function (el) {
      document.removeEventListener('click', el.__vueClickEventHandler__);
    }
  });
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount: function (el, binding) {
      const ourClickdefineEventHandler = (event: any) => {
        if (!el.contains(event.target) && el !== event.target && !event.composedPath().includes(el)) {
          binding.value(event);
        }
      };
      el.__vueClickdefineEventHandler__ = ourClickdefineEventHandler;

      document.addEventListener('click', ourClickdefineEventHandler);
    },
    unmounted: function (el) {
      document.removeEventListener('click', el.__vueClickdefineEventHandler__);
    }
  });
});

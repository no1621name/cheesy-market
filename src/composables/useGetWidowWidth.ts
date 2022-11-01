export default () => {
  const windowWidth = ref<number>(0);
  const isMobile = ref();
  const isTablet = ref();

  const onWidthResize = () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
    isTablet.value = window.innerWidth < 1024;
  };

  onMounted(() => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth < 768;
    isTablet.value = window.innerWidth < 1024;
    window.addEventListener('resize', onWidthResize);
  });

  onUnmounted(() => window.removeEventListener('resize', onWidthResize));

  return { width: windowWidth.value, isMobile, isTablet };
};

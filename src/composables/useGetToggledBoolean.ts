export default () => {
  const bool = ref(false);
  const toggleBool = () => { bool.value = !bool.value; };

  return { bool, toggleBool };
};

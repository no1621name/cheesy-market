export default () => {
  const pagination = ref<Pagination>({
    total: 1,
    next: 0,
    current: 0,
    prev: 0,
    limit: 1
  });

  const activePage = computed(() => {
    const { current, limit } = pagination.value;
    return current / limit + 1;
  });

  const totalPages = computed(() => {
    const { total, limit } = pagination.value;
    return Math.ceil(total / limit);
  });
  return { activePage, pagination, totalPages };
};

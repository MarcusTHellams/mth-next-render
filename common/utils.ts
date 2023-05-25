type ArgsType<T> = {
  count: number;
  skip?: number | undefined;
  limit?: number | undefined;
  items: T[];
};

export const getPaginatedResponse = <T>({
  count,
  items,
  limit = undefined,
  skip = undefined,
}: ArgsType<T>) => {
  let totalPages = 1;
  const itemCount = items.length;
  let hasPrevPage = false;
  let page = 1;

  if (limit && skip !== undefined) {
    page = skip / limit + 1;
    totalPages = Math.ceil(count / limit);
    hasPrevPage = page > 1 ?? limit < count;
  }

  return {
    items,
    totalPages,
    itemCount,
    totalCount: count,
    hasNextPage: page < totalPages,
    hasPrevPage,
    currentPage: page,
  };
};

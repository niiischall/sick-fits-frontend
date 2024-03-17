import { QUERY_PRODUCT_COUNT } from '../components/Pagination';

const paginationFields = () => ({
  keyArgs: false,
  read(existing = [], { args, cache }) {
    const data = cache.readQuery({
      query: QUERY_PRODUCT_COUNT,
    });
    const { first, skip } = args;
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);

    const items = existing.slice(skip, skip + first).filter((item) => item);

    if (items.length && items.length !== first && page === pages) {
      return false;
    }

    if (items.length) {
      return items;
    }

    return false;
  },
  merge(existing, incoming, { args }) {
    const { skip } = args;
    const merged = existing ? existing.slice(0) : [];
    for (let i = skip; i < skip + incoming; ++i) {
      merged[i] = incoming[i - skip];
    }
    return merged;
  },
});

export default paginationFields;

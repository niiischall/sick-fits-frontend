import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export const SEARCH_ALL_PRODUCTS_QUERY = gql`
  query SEARCH_ALL_PRODUCTS($searchInput: String!) {
    searchedItems: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchInput }
          { description_contains_i: $searchInput }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const Search = () => {
  resetIdCounter();
  const router = useRouter();

  const [searchforProducts, { data, loading }] = useLazyQuery(
    SEARCH_ALL_PRODUCTS_QUERY
  );
  const items = data?.searchedItems ?? [];

  const handleSearch = debounce(searchforProducts, 350);

  const {
    inputValue,
    highlightedIndex,
    isOpen,
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items,
    onInputValueChange() {
      handleSearch({
        variables: {
          searchInput: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem?.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
        <DropDown {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <DropDownItem
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                  width="50"
                />
                {item.name}
              </DropDownItem>
            ))}
          {isOpen && !items.length && !loading && (
            <DropDownItem>
              {`Sorry. We couldn't find similar results to ${inputValue}`}
            </DropDownItem>
          )}
        </DropDown>
      </div>
    </SearchStyles>
  );
};

export default Search;

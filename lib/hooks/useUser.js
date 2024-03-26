import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const USER_AUTHENTICATED_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          quantity
          product {
            name
            description
            price
            photo {
              image {
                publicUrlTransformed
              }
              altText
            }
          }
        }
      }
    }
  }
`;

export const useUser = () => {
  const { data } = useQuery(USER_AUTHENTICATED_QUERY);
  return data;
};

export default useUser;

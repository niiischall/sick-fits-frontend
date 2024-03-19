import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const USER_AUTHENTICATED_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;

export const useUser = () => {
  const { data } = useQuery(USER_AUTHENTICATED_QUERY);

  return data;
};

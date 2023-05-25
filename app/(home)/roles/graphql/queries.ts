import { gql } from 'graphql-request';

export const GET_USER_AND_ROLES = gql`
  query getUserAndRoles {
    usersPaginated {
      items {
        id
        firstName
        lastName
        email
        username
        roles {
          role {
            id
            name
          }
        }
      }
    }

    roles {
      id
      name
    }
  }
`;

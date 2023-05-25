import { gql } from 'graphql-request';

export const MANAGE_USER_ROLES = gql`
  mutation manageUserRoles($input: ManageUserRolesInput!) {
    manageUserRoles(input: $input)
  }
`;

import { GraphQLClient } from 'graphql-request';


export const client = new GraphQLClient(
  `http://localhost:5500/graphql`
);

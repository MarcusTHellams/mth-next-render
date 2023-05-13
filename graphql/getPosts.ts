import { gql } from 'graphql-request';
import { client } from './client';

interface Post {
  id: string;
  title: string;
  body: string;
}

interface Response {
  posts: {
    data: Post[];
  };
  meta: number | null;
}

const GET_POSTS = gql`
  query getPosts {
    posts {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

export const getPosts = async () => {
  return client.request<Response>(GET_POSTS).then(({ posts }) => {
    return posts;
  });
};

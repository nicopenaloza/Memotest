import { gql } from "@apollo/client";

export const PAGINATED_GAMES = gql`
  query games($page: Int!) {
    retrieveMemoTests(page: $page) {
      data {
        id
        name
        image
      }
      paginatorInfo {
        total
      }
    }
  }
`;

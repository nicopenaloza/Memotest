import { gql } from "@apollo/client";

export const CREATE_GAME_SESSION = gql`
  mutation createGameSession($id: ID!) {
    createGameSession(input: { game_id: $id }) {
      id
    }
  }
`;

export const PAGINATED_GAME_SESSIONS = gql`
  query paginatedGameSessions($page: Int!) {
    gameSessions(page: $page) {
      data {
        id
        points
        updated_at
        game {
          id
          name
          image
        }
      }
      paginatorInfo {
        total
      }
    }
  }
`;

export const GET_GAME_SESSION = gql`
  query retrieveGameSession($id: ID!) {
    gameSession(id: $id) {
      id
      username
      points
      game {
        name
        gameCards {
          id
          image
        }
      }
    }
  }
`;

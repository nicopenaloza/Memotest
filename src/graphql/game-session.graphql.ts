import { gql } from "@apollo/client";

export const CREATE_GAME_SESSION = gql`
  mutation createGameSession($id: ID!) {
    createGameSession(game_id: $id) {
      id
    }
  }
`;

export const PAGINATED_GAME_SESSIONS = gql`
  query paginatedGameSessions($page: Int!) {
    retrieveGameSessions(page: $page) {
      data {
        id
        points
        updated_at
        state {
          id
        }
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

export const END_GAME_SESSION = gql`
  mutation endGameSession($id: ID!) {
    endGameSession(id: $id) {
      id
      state {
        id
      }
      points
      numberOfPairs
      game {
        name
      }
      cards {
        id
        active
        hidden
        card {
          id
          image
        }
      }
    }
  }
`;

export const GET_GAME_SESSION = gql`
  query retrieveGameSession($id: ID!) {
    retrieveGameSession(id: $id) {
      id
      state {
        id
      }
      points
      numberOfPairs
      game {
        name
      }
      cards {
        id
        active
        hidden
        card {
          id
          image
        }
      }
    }
  }
`;

export const MAKE_AN_ATTEMPT = gql`
  mutation updateAttempts($id: ID!) {
    updateAttempts(id: $id) {
      id
    }
  }
`;

export const MATCH_CARD = gql`
  mutation matchPair($session_id: ID!, $card_id: ID!) {
    matchPair(session_id: $session_id, card_id: $card_id) {
      id
    }
  }
`;

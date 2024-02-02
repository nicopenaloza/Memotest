export interface Game {
  id: string;
  name: string;
  image: string;
  gameCards?: GameCard[];
  gameSessions?: GameSession[];
}

export interface GameSession {
  id: string;
  game: Game;
  game_id: number;
  cards: GameCardSession[];
  points: number;
  username: string;
  state: GameState;
  numberOfPairs: number;
  created_at: string;
  updated_at: string;
}

export interface GameCardSession {
  id: number;
  card: GameCard;
  session: GameSession;
  active: boolean;
  hidden: boolean;
  previousState?: boolean;
}

export interface GameCard {
  id: number;
  image: string;
}

export interface PaginatorInfo {
  total: number;
}

export interface PaginatedGamesData {
  games: {
    data: Game[];
    paginatorInfo: PaginatorInfo;
  };
}

export interface GameState {
  id: string;
  name: string;
}

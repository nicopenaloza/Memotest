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
    points: number;
    username: string;
    state: any;
    deleted: boolean;
    created_at: string;
    updated_at: string;
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

export type GameCardSession = Partial<GameCard> & { hidden: boolean; active: boolean };

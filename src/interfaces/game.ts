export interface Game {
  id: string;
  name: string;
  image: string;
  gameCards?: any[];
  gameSessions?: any[];
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

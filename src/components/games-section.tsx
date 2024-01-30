import { Game, PaginatedGamesData } from "@/interfaces/game";
import HomeSection from "./home-section";
import { useQuery } from "@apollo/client";
import { PAGINATED_GAMES } from "@/graphql/game.graphql";
import { GameCard } from "./game-card";
import client from "@/graphql/apollo-client";
import { useEffect, useState } from "react";

export default function GamesSection() {
  const [games, setCurrentGames] = useState<Game[]>([]);
  const [loading, setLoadState] = useState<boolean>(true);

  useEffect(() => {
    const retrieveGames = async () => {
      const { data } = await client.query({
        query: PAGINATED_GAMES,
        variables: { page: 1 },
      });

      const games = data?.games.data;
      setCurrentGames(games);
    };
    retrieveGames();
  }, []);

  useEffect(() => setLoadState(false), [games]);

  return (
    <HomeSection title="Create a new game" loading={loading}>
      {games?.map((game: Game, index: number) => (
        <GameCard key={index} game={game} />
      ))}
    </HomeSection>
  );
}

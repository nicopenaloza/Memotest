import client from "@/graphql/apollo-client";
import { PAGINATED_GAMES } from "@/graphql/game.graphql";
import { Game } from "@/interfaces/game";
import { useEffect, useState } from "react";
import { ListItem } from "./game-list-item";
import HomeSection from "./home-section";
import PrimaryButton from "./primary-button";

export default function GamesSection() {
  const [total, setTotal] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);
  const [games, setCurrentGames] = useState<Game[]>([]);
  const [loading, setLoadState] = useState<boolean>(true);

  useEffect(() => {
    retrieveGames();
  }, []);

  useEffect(() => setLoadState(false), [games]);

  const retrieveGames = async () => {
    const { data } = await client.query({
      query: PAGINATED_GAMES,
      variables: { page: lastPage },
    });

    const games = data?.games?.data;
    setTotal(data?.games?.paginatorInfo?.total);
    setCurrentGames(games);
    setLastPage(lastPage + 1);
  };

  return (
    <HomeSection title="Create a new game" loading={loading}>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 sm:grid-cols-2 gap-6">
        {games?.map((game: Game, index: number) => (
          <ListItem key={index} game={game} />
        ))}
      </div>
      {total > games?.length && (
        <PrimaryButton label="Show more" onClick={retrieveGames} />
      )}
    </HomeSection>
  );
}

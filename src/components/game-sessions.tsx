import client from "@/graphql/apollo-client";
import { PAGINATED_GAME_SESSIONS } from "@/graphql/game-session.graphql";
import { GameSession } from "@/interfaces/game";
import { useEffect, useRef, useState } from "react";
import { ListItem } from "./game-list-item";
import HomeSection from "./home-section";
import PrimaryButton from "./primary-button";

export default function GameSessionsSection() {
  const [total, setTotal] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);
  const [sessions, setCurrentSessions] = useState<GameSession[]>([]);
  const [loading, setLoadState] = useState<boolean>(true);

  useEffect(() => {
    retrieveGames();
  }, []);

  useEffect(() => setLoadState(false), [sessions]);

  const retrieveGames = async () => {
    setLoadState(true);
    const { data } = await client.query({
      query: PAGINATED_GAME_SESSIONS,
      variables: { page: lastPage },
    });

    const games: GameSession[] = data?.retrieveGameSessions?.data;
    setLastPage(lastPage + 1);
    setTotal(data?.retrieveGameSessions?.paginatorInfo?.total);
    setCurrentSessions((current) => {
      return [
        ...current,
        ...games.filter(
          (session) =>
            current.find((storedSession) => storedSession.id == session.id) ==
            null
        ),
      ];
    });
  };

  return (
    <HomeSection title="Resume a previous game" loading={loading}>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 sm:grid-cols-2 gap-6">
        {sessions?.map((session: any, index: number) => (
          <ListItem key={index} session={session} />
        ))}
      </div>
      {total > sessions.length && (
        <PrimaryButton label="Show more" onClick={retrieveGames} />
      )}
    </HomeSection>
  );
}

import client from "@/graphql/apollo-client";
import { PAGINATED_GAME_SESSIONS } from "@/graphql/game-session.graphql";
import { Game } from "@/interfaces/game";
import { useEffect, useState } from "react";
import { GameCard } from "./game-card";
import HomeSection from "./home-section";

export default function GameSessionsSection() {
  const [sessions, setCurrentSessions] = useState<Game[]>([]);
  const [loading, setLoadState] = useState<boolean>(true);

  useEffect(() => {
    const retrieveGames = async () => {
      const { data } = await client.query({
        query: PAGINATED_GAME_SESSIONS,
        variables: { page: 1 },
      });

      const games = data?.gameSessions?.data;
      setCurrentSessions(games);
    };
    retrieveGames();
  }, []);

  useEffect(() => setLoadState(false), [sessions]);

  return (
    <HomeSection title="Resume a previous game" loading={loading}>
      {sessions?.map((session: any, index: number) => (
        <GameCard key={index} game={session.game} />
      ))}
    </HomeSection>
  );
}

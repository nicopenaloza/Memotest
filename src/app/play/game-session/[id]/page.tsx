"use client";

import { carLogo } from "@/assets/images";
import GameCard from "@/components/game-card";
import YouWinModal from "@/components/you-win-modal";
import client from "@/graphql/apollo-client";
import { GET_GAME_SESSION } from "@/graphql/game-session.graphql";
import {
  GameCard as IGameCard,
  GameSession,
  GameCardSession,
} from "@/interfaces/game";
import "@/styles/cards.css";
import { CardToCardSession, RandomizeCards, turnCard } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGameSessionProps {
  id: string;
  [key: string]: any;
}

export default function GameSession() {
  const { id } = useParams();

  const [username, setUsername] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameSession, setGameSession] = useState<GameSession>();
  const [currentCards, setCurrentCards] = useState<GameCardSession[]>([]);
  const [sessionState, setSessionState] = useState<boolean>(true);
  const [actionsBlocked, setActionBlock] = useState<boolean>(true);
  const [pairsMatched, setPairsMatched] = useState<number>(0);

  const retrieveSessionInfo = async () => {
    const { data }: { data: { gameSession: GameSession } } = await client.query(
      {
        query: GET_GAME_SESSION,
        variables: { id: id },
      }
    );

    const cards = RandomizeCards(data?.gameSession?.game?.gameCards);

    setCurrentCards(CardToCardSession(cards, true));

    setTimeout(() => {
      setActionBlock(false);
      setCurrentCards(CardToCardSession(cards));
    }, 5000);
    setGameSession(data?.gameSession);
  };

  useEffect(() => {
    retrieveSessionInfo();
  }, []);

  useEffect(() => {
    if (currentCards.length > 0 && pairsMatched >= currentCards.length / 2) setSessionState(false);
  }, [pairsMatched]);

  const submitSession = () => {};

  const flipCard = (index: number) =>
    turnCard(
      actionsBlocked,
      currentCards,
      setAttempts,
      setCurrentCards,
      setPairsMatched,
      pairsMatched,
      attempts,
      index
    );

  return (
    <main className="w-full h-screen">
      <div className="relative bg-gray-950 w-full min-h-96 flex flex-col justify-center items-center p-4">
        <div
          className={`w-full h-full flex md:flex-row flex-col items-center md:items-start md:justify-start flex-wrap ${
            !sessionState ? "invisible" : ""
          }`}
        >
          {currentCards?.map((card: GameCardSession, index: number) => (
            <GameCard
              card={card}
              index={index}
              key={index}
              onClick={flipCard}
            />
          ))}
        </div>

        {!sessionState && (
          <YouWinModal onChange={setUsername} onSubmit={submitSession} />
        )}
      </div>
      <h1 className="text-2xl font-bold px-8 py-5 font-bold">
        {gameSession?.game?.name}
      </h1>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Rules</h2>
        <p className="text-gray-700">
          You have 5 seconds to memorize the card positions. After this period,
          your task is to match all identical pairs by clicking on them. Points
          will be calculated at the end of the match based on the number of
          attempts you make.
        </p>
      </div>
    </main>
  );
}

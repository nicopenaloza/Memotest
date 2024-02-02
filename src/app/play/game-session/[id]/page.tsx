"use client";

import GameCard from "@/components/game-card";
import Spinner from "@/components/spinner";
import YouWinModal from "@/components/you-win-modal";
import { GameCardSession, GameSession } from "@/interfaces/game";
import "@/styles/cards.css";
import { State } from "@/utils/constants";
import {
  endSession,
  makeAttempt,
  retrieveSessionInfo,
  turnCard,
} from "@/utils/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GameSession() {
  const { id } = useParams();
  const router = useRouter();

  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameSession, setGameSession] = useState<GameSession>();
  const [currentCards, setCurrentCards] = useState<GameCardSession[]>([]);
  const [gameState, setGameState] = useState<boolean>(true);
  const [actionsBlocked, setActionBlock] = useState<boolean>(true);

  useEffect(() => {
    retrieveSessionInfo(id, (session: GameSession) => {
      if (session) {
        const cards = session?.cards?.map((card) => ({
          ...card,
          previousState: card.hidden,
          hidden: true,
        }));
        setCurrentCards(cards ?? []);

        setTimeout(() => {
          setActionBlock(false);
          setCurrentCards(
            cards?.map((card) => ({
              ...card,
              hidden: Boolean(card?.previousState),
            })) ?? []
          );
        }, 5000);
      }
      if (session?.state?.id == State.COMPLETED) setGameState(false);
      setScore(session?.points);
      setGameSession(session);
    });
  }, []);

  useEffect(() => {
    if (!gameState)
      endSession(id, (session) => {
        setScore(session?.points);
      });
  }, [gameState]);

  const validateState = () => {
    const validPairs = currentCards.filter((card) => card.hidden).length / 2;
    if (gameSession && validPairs >= gameSession?.numberOfPairs) {
      setGameState(false);
    }
  };

  const flipCard = (index: number): void =>
    turnCard(
      actionsBlocked,
      currentCards,
      setAttempts,
      setCurrentCards,
      attempts,
      () => makeAttempt(id),
      validateState,
      id,
      index
    );

  return (
    <main className="w-full h-screen">
      <div className="relative bg-gray-950 w-full min-h-96 flex flex-col justify-center items-center p-4">
        <div
          className={`w-full h-full flex md:flex-row flex-col items-center md:items-start md:justify-start flex-wrap ${
            !gameState ? "invisible" : ""
          }`}
        >
          {currentCards?.map((card: GameCardSession, index: number) => (
            <GameCard
              content={card}
              index={index}
              key={index}
              onClick={flipCard}
            />
          ))}
        </div>

        {currentCards?.length <= 0 && <Spinner white />}

        {!gameState && (
          <YouWinModal score={score} onSubmit={() => router.push("/")} />
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

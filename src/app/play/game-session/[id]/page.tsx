"use client";

import { carLogo } from "@/assets/images";
import GameCard from "@/components/game-card";
import "@/styles/cards.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGameSessionProps {
  id: string;
  [key: string]: any;
}

export default function GameSession() {
  const { id } = useParams();

  const [attempts, setAttempts] = useState<number>(0);
  const [currentCards, setCurrentCards] = useState<any>([]);

  const cards = [
    {
      id: "asd1",
      image: carLogo.src,
    },
    {
      id: "asd1",
      image: carLogo.src,
    },
    {
      id: "asd2",
      image: carLogo.src,
    },
    {
      id: "asd2",
      image: carLogo.src,
    },
  ];

  useEffect(() => {
    setCurrentCards(
      cards.map((card) => ({ active: false, hidden: false, ...card }))
    );
  }, []);

  useEffect(() => {
    if (
      currentCards.length > 0 &&
      currentCards.filter((card: any) => !card.hidden) <= 0
    )
      console.log("WIN");
  }, [currentCards]);

  const turnCard = (index: number) => {
    let newCards = [...currentCards];
    const currentCard = newCards[index];

    let previousCardIndex = -1;
    const previousCard = newCards.find((card: any, index: number) => {
      if (card.active) {
        previousCardIndex = index;
        return true;
      }
    });

    if (previousCard && previousCardIndex != index) {
      if (previousCard.id === currentCard.id) {
        newCards[index].hidden = true;
        newCards[previousCardIndex].hidden = true;
        newCards[index].active = false;
        newCards[previousCardIndex].active = false;

        setAttempts(attempts + 1);
      } else {
        newCards = newCards.map((card: any) => ({ ...card, active: false }));
        newCards[index].active = true; // Voltear la carta actual
        setAttempts(attempts + 1);
      }
    } else {
      newCards[index].active = !newCards[index].active;
    }

    setCurrentCards(newCards);
  };

  return (
    <main className="w-full h-screen">
      <div
        className=" 
      bg-gray-950 
      w-full 
      min-h-2/3 
      flex 
      md:flex-row 
      flex-col 
      items-center 
      md:items-start
      md:justify-start
      flex-wrap 
      p-4
      "
      >
        {currentCards.map((card: any, index: number) => (
          <GameCard card={card} index={index} key={index} onClick={turnCard} />
        ))}
      </div>
      <h1>{attempts}</h1>
      <h1 className="text-2xl font-bold px-10 py-5 text-white font-bold"></h1>
    </main>
  );
}

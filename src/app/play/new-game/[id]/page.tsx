"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { carLogo } from "@/assets/images";
import "./styles.css";

export default function NewGame() {
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
        // Si las cartas son iguales, desaparecerlas del array
        newCards[index].hidden = true;
        newCards[previousCardIndex].hidden = true;
        setAttempts(attempts + 1);
      } else {
        // Si las cartas son diferentes, voltear todas las cartas
        newCards = newCards.map((card: any) => ({ ...card, active: false }));
        newCards[index].active = true; // Voltear la carta actual
        setAttempts(attempts + 1);
      }
    } else {
      // Si no hay ninguna carta dada vuelta, voltear la carta actual
      newCards[index].active = !newCards[index].active;
    }

    setCurrentCards(newCards);
  };

  const hideCard = "invisible";

  return (
    <main className="w-full h-screen overflow-hidden">
      <div className="bg-custom-color w-full h-2/3 flex flex-row p-4">
        {currentCards.map((card: any, index: number) => (
          <div
            key={index}
            className={`flip-card ${card.active && "active-card"} ${
              card.hidden && hideCard
            } mx-5`}
            onClick={() => {
              if (!card.hidden) turnCard(index);
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h1 className="text-xl font-semibold">Kitchen Item</h1>
                <p>Details about the item</p>
              </div>
              <div className="flip-card-back bg-custom-secondary-color text-white">
                <img
                  src={card.image}
                  alt="Card Front"
                  className="w-full h-full object-cover"
                />
                {card.id}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1>{attempts}</h1>
      <h1 className="text-2xl font-bold px-10 py-5">
        Kitchen Memotest id {id}
      </h1>
    </main>
  );
}

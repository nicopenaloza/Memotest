import { GameCard, GameCardSession } from "@/interfaces/game";

export const turnCard = (
  actionsBlocked: boolean,
  currentCards: GameCardSession[],
  setAttempts: (args: number) => void,
  setCurrentCards: (args: GameCardSession[]) => void,
  setPairsMatched: (args: number) => void,
  pairsMatched: number,
  attempts: number,
  index: number
) => {
  if (!actionsBlocked) {
    let newCards = [...currentCards];
    const currentCard = newCards[index];

    let previousCardIndex = -1;
    const previousCard = newCards.find((card: any, idx: number) => {
      if (card.active) {
        previousCardIndex = idx;
        return true;
      }
    });

    if (previousCard && previousCardIndex !== index) {
      if (previousCard.id === currentCard.id) {
        newCards[index].hidden = true;
        newCards[previousCardIndex].hidden = true;
        newCards[index].active = false;
        newCards[previousCardIndex].active = false;
        setPairsMatched(pairsMatched + 1);
      } else {
        newCards = newCards.map((card: any) => ({ ...card, active: false }));
        newCards[index].active = true;
      }

      setAttempts(attempts + 1);
    } else {
      newCards[index].active = !newCards[index].active;
    }

    setCurrentCards(newCards);
  }
};

export const CardToCardSession = (
  cards?: GameCard[],
  active: boolean = false
): GameCardSession[] => {
  return (
    cards?.map((card: GameCard) => ({
      ...card,
      hidden: false,
      active: active,
    })) ?? []
  );
};

export const RandomizeCards = (cards?: GameCard[]): GameCard[] => {
  const duplicatedCards = cards?.flatMap((card) => [card, { ...card }]) ?? [];
  const orderedCards = duplicatedCards.sort(() => Math.random() - 0.5);
  return orderedCards;
};
